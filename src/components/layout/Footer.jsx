"use client";
import { useState } from "react";
import { Heart, Globe, Send } from "lucide-react";
import Link from "next/link";

const links = {
  Produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Comment ça marche", href: "#how-it-works" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "FAQ", href: "/faq" },
  ],
  Ressources: [
    { label: "Conseils grossesse", href: "/conseils" },
    { label: "Calculateur DPA", href: "/dpa" },
    { label: "Semaine par semaine", href: "/semaines" },
    { label: "Blog", href: "/blog" },
  ],
  Légal: [
    { label: "Mentions légales", href: "/mentions" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "CGU", href: "/cgu" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: Globe, href: "#", label: "Site" },
  { icon: Send, href: "#", label: "Contact" },
];

function SocialIcon({ s }) {
  const [hovered, setHovered] = useState(false);
  const Icon = s.icon;
  return (
    <a
      href={s.href}
      aria-label={s.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-10 h-10 rounded-[10px] flex items-center justify-center no-underline transition-all duration-200 border"
      style={{
        background: hovered ? "var(--color-rose)" : "rgba(255,255,255,0.08)",
        color: hovered ? "white" : "rgba(255,255,255,0.6)",
        borderColor: hovered ? "var(--color-rose)" : "rgba(255,255,255,0.08)",
      }}
    >
      <Icon size={16} />
    </a>
  );
}

function FooterLink({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <Link
        href={item.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="text-sm no-underline font-sans transition-colors duration-200"
        style={{
          color: hovered ? "var(--color-rose)" : "rgba(255,255,255,0.55)",
        }}
      >
        {item.label}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background: "var(--color-text-dark)",
        padding: "72px 32px 32px",
      }}
    >
      {/* Bordure dégradée top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--color-blush-deep), var(--color-rose), var(--color-sage), var(--color-gold))",
        }}
      />

      {/* Cercle décoratif */}
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "rgba(212,120,122,0.06)" }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Grille principale */}
        <div
          className="grid gap-12 mb-16 max-md:grid-cols-2 max-sm:grid-cols-1"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
        >
          {/* Colonne marque */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 no-underline mb-5"
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-rose), var(--color-blush-deep))",
                  boxShadow: "0 4px 16px rgba(212,120,122,0.4)",
                }}
              >
                <Heart size={18} fill="white" color="white" />
              </span>
              <span className="font-serif text-xl font-semibold text-white">
                Safe
                <span style={{ color: "var(--color-rose)" }}>Pregnancy</span>
              </span>
            </Link>

            <p
              className="text-sm leading-[1.75] max-w-xs mb-7"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Ton compagnon de grossesse — suivi santé, conseils personnalisés
              et rappels de rendez-vous, semaine après semaine.
            </p>

            <div className="flex gap-2.5">
              {socials.map((s) => (
                <SocialIcon key={s.label} s={s} />
              ))}
            </div>
          </div>

          {/* Colonnes de liens */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4
                className="font-sans text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {title}
              </h4>
              <ul className="list-none flex flex-col gap-3">
                {items.map((item) => (
                  <FooterLink key={item.label} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Séparateur */}
        <div
          className="h-px mb-7"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Bas de page */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} SafePregnancy. Tous droits réservés.
          </p>
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Fait avec{" "}
            <Heart
              size={12}
              fill="var(--color-rose)"
              color="var(--color-rose)"
            />{" "}
            pour chaque future maman
          </p>
        </div>
      </div>
    </footer>
  );
}
