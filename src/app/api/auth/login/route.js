// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    // 1. Récupère email et mot de passe envoyés depuis le formulaire
    const { email, password } = await request.json();

    // 2. Vérifie que les champs sont présents
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe sont obligatoires." },
        { status: 400 },
      );
    }

    // 3. Cherche l'utilisatrice dans la base de données
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 4. Si l'email n'existe pas → erreur générique
    // On dit pas "email introuvable" pour des raisons de sécurité
    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 },
      );
    }

    // 5. Compare le mot de passe entré avec le hash en base
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 },
      );
    }

    // 6. Crée le token JWT
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

    // 7. Stocke le token dans un cookie sécurisé
    const response = NextResponse.json(
      { success: true, message: "Connexion réussie !" },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Erreur login:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessaie." },
      { status: 500 },
    );
  }
}
