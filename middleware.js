// middleware.js  ← à la RACINE du projet (pas dans src/)
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith("/dashboard");
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const token = request.cookies.get("token")?.value;

  let user = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      user = payload;
    } catch {
      user = null;
    }
  }

  // Pas connectée → redirige vers login
  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Déjà connectée → redirige vers dashboard
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
