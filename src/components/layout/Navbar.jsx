"use client";
import { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Comment ça marche", href: "#how-it-works" },
    { label: "Témoignages", href: "#testimonials" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
          scrolled
            ? "py-3 bg-cream/92 backdrop-blur-md shadow-[0_2px_24px_rgba(180,110,110,0.08)] border-b border-sand"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-280 mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span
              className="w-9.5 h-9.5 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(212,120,122,0.3)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-rose), var(--color-blush-deep))",
              }}
            >
              <Heart size={18} fill="white" color="white" />
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight text-text-dark">
              Safe<span className="text-rose">Pregnancy</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[0.92rem] font-medium text-text-mid no-underline transition-colors duration-200 hover:text-rose pb-0.5"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="btn-outline py-2.5! px-5! text-sm!">
              Connexion
            </Link>
            <Link
              href="/register"
              className="btn-primary py-2.5! px-5! text-sm!"
            >
              Commencer
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-[10px] cursor-pointer border-none"
            style={{
              backgroundColor: "var(--color-blush)",
              color: "var(--color-rose-dark)",
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed top-17.5 left-0 right-0 z-40 flex flex-col gap-4 px-8 py-6 border-b border-sand shadow-[0_8px_32px_rgba(180,110,110,0.10)]"
          style={{ backgroundColor: "var(--color-cream)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium no-underline py-2 border-b"
              style={{
                color: "var(--color-text-mid)",
                borderColor: "var(--color-cream-warm)",
              }}
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 mt-2">
            <Link href="/login" className="btn-outline flex-1 justify-center">
              Connexion
            </Link>
            <Link
              href="/register"
              className="btn-primary flex-1 justify-center"
            >
              Commencer
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
