// src/app/api/saisies/route.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

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

// ── GET /api/saisies ──
export async function GET(request) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const saisies = await prisma.saisie.findMany({
      where: { userId: payload.id },
      orderBy: { dateSaisie: "desc" },
    });

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { dpa: true },
    });

    const saisiesEnrichies = saisies.map((saisie) => {
      const dateDpa = new Date(user.dpa);
      const ddr = new Date(dateDpa);
      ddr.setDate(ddr.getDate() - 280);
      const dateSaisie = new Date(saisie.dateSaisie);
      const diffJours = Math.floor((dateSaisie - ddr) / (1000 * 60 * 60 * 24));
      const semaine = Math.min(Math.max(Math.floor(diffJours / 7), 1), 40);

      return {
        id: saisie.id,
        semaine,
        poids: saisie.poids ? Number(saisie.poids) : null,
        tension: saisie.tension,
        humeur: saisie.humeur,
        symptomes: saisie.symptomes || [],
        dateSaisie: saisie.dateSaisie,
      };
    });

    return NextResponse.json(saisiesEnrichies);
  } catch (error) {
    console.error("Erreur GET /api/saisies:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}

// ── POST /api/saisies ──
export async function POST(request) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { poids, tension, humeur, symptomes } = await request.json();

    if (!poids && !tension && !humeur) {
      return NextResponse.json(
        { error: "Remplis au moins un champ." },
        { status: 400 },
      );
    }

    // Date aujourd'hui au format YYYY-MM-DD sans heure
    // pour éviter les problèmes de fuseau horaire
    const now = new Date();
    const today = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
    );

    // Cherche d'abord si une saisie existe déjà aujourd'hui
    const existante = await prisma.saisie.findFirst({
      where: {
        userId: payload.id,
        dateSaisie: today,
      },
    });

    let saisie;

    if (existante) {
      // Met à jour la saisie existante
      saisie = await prisma.saisie.update({
        where: { id: existante.id },
        data: {
          ...(poids && { poids: parseFloat(poids) }),
          ...(tension && { tension }),
          ...(humeur && { humeur }),
          ...(symptomes !== undefined && { symptomes }),
        },
      });
    } else {
      // Crée une nouvelle saisie
      saisie = await prisma.saisie.create({
        data: {
          userId: payload.id,
          dateSaisie: today,
          poids: poids ? parseFloat(poids) : null,
          tension: tension || null,
          humeur: humeur || null,
          symptomes: symptomes || [],
        },
      });
    }

    return NextResponse.json({ success: true, saisie }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/saisies:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
