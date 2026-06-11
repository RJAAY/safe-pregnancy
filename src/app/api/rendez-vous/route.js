// src/app/api/rendez-vous/route.js
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

//  Récupère tous les RDV de l'utilisatrice
export async function GET(request) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Récupère les RDV à venir (date >= aujourd'hui)
    const aVenir = await prisma.rendezVous.findMany({
      where: {
        userId: payload.id,
        dateRdv: { gte: today },
      },
      orderBy: { dateRdv: "asc" },
    });

    // Récupère les RDV passés (date < aujourd'hui)
    const passes = await prisma.rendezVous.findMany({
      where: {
        userId: payload.id,
        dateRdv: { lt: today },
      },
      orderBy: { dateRdv: "desc" },
    });

    return NextResponse.json({ aVenir, passes });
  } catch (error) {
    console.error("Erreur GET /api/rendez-vous:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}

//  Ajoute un nouveau RDV
export async function POST(request) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { type, date, heure, medecin, lieu } = await request.json();

    // Vérifie les champs obligatoires
    if (!type || !date || !heure) {
      return NextResponse.json(
        { error: "Type, date et heure sont obligatoires." },
        { status: 400 },
      );
    }

    // Crée la date sans problème de fuseau horaire
    const [year, month, day] = date.split("-").map(Number);
    const dateRdv = new Date(Date.UTC(year, month - 1, day));

    const rdv = await prisma.rendezVous.create({
      data: {
        userId: payload.id,
        type,
        dateRdv,
        heure,
        medecin: medecin || null,
        lieu: lieu || null,
      },
    });

    return NextResponse.json({ success: true, rdv }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/rendez-vous:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
