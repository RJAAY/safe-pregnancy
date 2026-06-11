"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const perks = [
  { icon: "🆓", label: "100% gratuit" },
  { icon: "🔒", label: "Données sécurisées" },
  { icon: "📱", label: "Accessible partout" },
  { icon: "💌", label: "Aucune pub" },
];

const blobs = [
  { size: "w-72 h-72", pos: "-top-20 -left-20", opacity: "opacity-[0.12]" },
  { size: "w-48 h-48", pos: "-bottom-14 right-14", opacity: "opacity-10" },
  { size: "w-36 h-36", pos: "top-5 -right-10", opacity: "opacity-[0.08]" },
];

export default function CTA() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-24 px-8 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div
          ref={ref}
          className="relative rounded-[40px] text-center overflow-hidden"
          style={{
            padding: "80px 64px",
            background:
              "linear-gradient(135deg, #E8797B 0%, var(--color-rose-dark) 50%, #8B4A6B 100%)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.7s ease",
          }}
        >
          {/* Blobs décoratifs */}
          {blobs.map((b, i) => (
            <div
              key={i}
              className={`absolute ${b.size} ${b.pos} ${b.opacity} rounded-full bg-white pointer-events-none`}
            />
          ))}

          {/* Motif de points */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Contenu */}
          <div className="relative z-10">
            {/* Icône cœur */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-7 border-2 border-white/30"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Heart size={32} fill="white" color="white" />
            </div>

            {/* Badge */}
            <span
              className="inline-flex items-center gap-1.5 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-white/25"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles size={12} /> Rejoins-nous
            </span>

            {/* Titre */}
            <h2
              className="font-serif font-bold text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Commence ton suivi{" "}
              <span className="italic opacity-90">aujourd'hui</span>
            </h2>

            {/* Sous-titre */}
            <p
              className="text-white/80 max-w-sm mx-auto leading-relaxed mb-12"
              style={{ fontSize: "1.05rem" }}
            >
              Crée ton compte gratuitement et rejoins des milliers de futures
              mamans qui vivent leur grossesse en toute sérénité.
            </p>

            {/* Boutons */}
            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <Link
                href="/register"
                onMouseEnter={() => setBtn1Hovered(true)}
                onMouseLeave={() => setBtn1Hovered(false)}
                className="inline-flex items-center gap-2 bg-white font-sans font-bold text-base px-9 py-4 rounded-full no-underline transition-all duration-200"
                style={{
                  color: "var(--color-rose-dark)",
                  boxShadow: btn1Hovered
                    ? "0 16px 40px rgba(0,0,0,0.2)"
                    : "0 8px 32px rgba(0,0,0,0.15)",
                  transform: btn1Hovered ? "translateY(-3px)" : "none",
                }}
              >
                Commencer gratuitement <ArrowRight size={18} />
              </Link>

              <Link
                href="/login"
                onMouseEnter={() => setBtn2Hovered(true)}
                onMouseLeave={() => setBtn2Hovered(false)}
                className="inline-flex items-center gap-2 font-sans font-semibold text-base px-9 py-4 rounded-full no-underline text-white transition-all duration-200"
                style={{
                  background: btn2Hovered
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                  border: `2px solid ${btn2Hovered ? "white" : "rgba(255,255,255,0.5)"}`,
                }}
              >
                J'ai déjà un compte
              </Link>
            </div>

            {/* Perks */}
            <div className="flex gap-6 justify-center flex-wrap">
              {perks.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-2 text-white/85 text-sm font-medium"
                >
                  <span className="text-base">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
