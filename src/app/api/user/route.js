// src/app/api/user/route.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

// Fonction utilitaire — vérifie le token et retourne le user
async function getUserFromRequest(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

// Calcule la semaine depuis la DPA
function calculerSemaine(dpa) {
  const dateDpa = new Date(dpa);
  const ddr = new Date(dateDpa);
  ddr.setDate(ddr.getDate() - 280);
  const diffJours = Math.floor((new Date() - ddr) / (1000 * 60 * 60 * 24));
  const semaine = Math.floor(diffJours / 7);
  return Math.min(Math.max(semaine, 1), 40);
}

// Calcule les jours restants avant la DPA
function joursAvantDpa(dpa) {
  const diff = Math.ceil((new Date(dpa) - new Date()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 0);
}

// ── GET /api/user ── Récupère les infos de l'utilisatrice connectée
export async function GET(request) {
  try {
    // 1. Vérifie que l'utilisatrice est connectée
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    // 2. Récupère l'utilisatrice depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        prenom: true,
        email: true,
        dpa: true,
        createdAt: true,
        // Ne retourne JAMAIS le mot de passe
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisatrice introuvable." },
        { status: 404 },
      );
    }

    // 3. Calcule semaine et jours restants à partir de la DPA
    const semaine = calculerSemaine(user.dpa);
    const trimestre = semaine <= 13 ? 1 : semaine <= 26 ? 2 : 3;
    const daysLeft = joursAvantDpa(user.dpa);

    // 4. Retourne les données enrichies
    return NextResponse.json({
      id: user.id,
      prenom: user.prenom,
      email: user.email,
      dpa: user.dpa,
      createdAt: user.createdAt,
      semaine,
      trimestre,
      daysLeft,
    });
  } catch (error) {
    console.error("Erreur GET /api/user:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}

// ── PUT /api/user ── Modifie les infos de l'utilisatrice
export async function PUT(request) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { prenom, email, dpa } = await request.json();

    // Vérifie si le nouvel email est déjà pris par quelqu'un d'autre
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== payload.id) {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé." },
          { status: 400 },
        );
      }
    }

    // Met à jour les champs fournis
    const updatedUser = await prisma.user.update({
      where: { id: payload.id },
      data: {
        ...(prenom && { prenom }),
        ...(email && { email }),
        ...(dpa && { dpa: new Date(dpa) }),
      },
      select: {
        id: true,
        prenom: true,
        email: true,
        dpa: true,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Erreur PUT /api/user:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}

// ── DELETE /api/user ── Supprime le compte
export async function DELETE(request) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    // Supprime l'utilisatrice — Prisma supprime aussi les saisies
    // et rendez-vous grâce au onDelete: Cascade dans le schéma
    await prisma.user.delete({
      where: { id: payload.id },
    });

    // Supprime le cookie de session
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", "", { maxAge: 0, path: "/" });

    return response;
  } catch (error) {
    console.error("Erreur DELETE /api/user:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
