// src/app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    // 1. Récupère les données envoyées depuis le formulaire
    const { prenom, email, password, dpa } = await request.json();

    // 2. Vérifie que tous les champs sont présents
    if (!prenom || !email || !password || !dpa) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 },
      );
    }

    // 3. Vérifie que l'email n'est pas déjà utilisé
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé." },
        { status: 400 },
      );
    }

    // 4. Hash le mot de passe — on ne stocke JAMAIS le mot de passe en clair
    // Le "10" = nombre de rounds de hashage (plus c'est élevé, plus c'est sécurisé)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Crée l'utilisatrice dans la base de données
    const user = await prisma.user.create({
      data: {
        prenom,
        email,
        password: hashedPassword,
        dpa: new Date(dpa), // convertit la string en Date
      },
    });

    // 6. Crée un token JWT pour connecter automatiquement après inscription
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      prenom: user.prenom,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .setIssuedAt()
      .sign(secret);

    // 7. Crée la réponse et stocke le token dans un cookie sécurisé
    const response = NextResponse.json(
      { success: true, message: "Compte créé avec succès !" },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true, // JavaScript côté client ne peut pas lire ce cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours en secondes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Erreur register:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessaie." },
      { status: 500 },
    );
  }
}
