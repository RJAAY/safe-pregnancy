// src/app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  // Crée la réponse et supprime le cookie token
  const response = NextResponse.json({ success: true }, { status: 200 });

  // Supprime le cookie en mettant maxAge à 0
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
