// src/app/api/user/password/route.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";
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

// ── PUT /api/user/password ── Change le mot de passe
export async function PUT(request) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { actuel, nouveau } = await request.json();

    if (!actuel || !nouveau) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 },
      );
    }

    if (nouveau.length < 8) {
      return NextResponse.json(
        { error: "Le nouveau mot de passe doit faire au moins 8 caractères." },
        { status: 400 },
      );
    }

    // Récupère le mot de passe actuel hashé
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { password: true },
    });

    // Vérifie que l'ancien mot de passe est correct
    const match = await bcrypt.compare(actuel, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Le mot de passe actuel est incorrect." },
        { status: 400 },
      );
    }

    // Hash le nouveau mot de passe et met à jour
    const hashed = await bcrypt.hash(nouveau, 10);
    await prisma.user.update({
      where: { id: payload.id },
      data: { password: hashed },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur PUT /api/user/password:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
