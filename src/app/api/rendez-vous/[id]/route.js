// src/app/api/rendez-vous/[id]/route.js
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

//  Supprime un RDV - [id]
export async function DELETE(request, { params }) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const rdvId = parseInt(params.id);

    // Vérifie que le RDV appartient bien à cette utilisatrice
    const rdv = await prisma.rendezVous.findUnique({
      where: { id: rdvId },
    });

    if (!rdv) {
      return NextResponse.json({ error: "RDV introuvable." }, { status: 404 });
    }

    if (rdv.userId !== payload.id) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    // Supprime le RDV
    await prisma.rendezVous.delete({
      where: { id: rdvId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE /api/rendez-vous/[id]:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
