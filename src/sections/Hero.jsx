"use client";
import { useEffect, useState } from "react";
import {
  Heart,
  ArrowRight,
  Play,
  Sparkles,
  Baby,
  Calendar,
} from "lucide-react";
import Link from "next/link";

/* ── Blob décoratif ── */
function Blob({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-[60px] opacity-45 pointer-events-none ${className}`}
    />
  );
}

/* ── Badge flottant ── */
function WeekBadge({ week, label, icon: Icon, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="flex items-center gap-2.5 bg-white rounded-2xl px-4 py-2.5 border border-sand transition-all duration-600"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        boxShadow: "0 4px 20px rgba(180,110,110,0.12)",
      }}
    >
      <span className="w-9 h-9 bg-blush rounded-full flex items-center justify-center shrink-0">
        <Icon size={16} color="var(--color-rose)" />
      </span>
      <div>
        <div className="text-[0.75rem] text-text-light font-medium">
          {label}
        </div>
        <div className="text-[0.92rem] text-text-dark font-semibold">
          {week}
        </div>
      </div>
    </div>
  );
}

/* ── Ring de progression SVG ── */
function ProgressRing({ percent }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <circle
        cx="65"
        cy="65"
        r={r}
        fill="none"
        stroke="var(--color-cream-warm)"
        strokeWidth="10"
      />
      <circle
        cx="65"
        cy="65"
        r={r}
        fill="none"
        stroke="var(--color-rose)"
        strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 65 65)"
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
      <text
        x="65"
        y="62"
        textAnchor="middle"
        fill="var(--color-text-dark)"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        S24
      </text>
      <text
        x="65"
        y="80"
        textAnchor="middle"
        fill="var(--color-text-light)"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
      >
        semaine
      </text>
    </svg>
  );
}

const metrics = [
  { label: "Poids", value: "63 kg", icon: "⚖️", bg: "bg-blush" },
  { label: "Tension", value: "11/7", icon: "❤️", bg: "bg-[#E8F5E9]" },
  { label: "DPA", value: "Oct 2025", icon: "📅", bg: "bg-cream-warm" },
  { label: "Humeur", value: "Heureuse", icon: "😊", bg: "bg-sage-light" },
];

const avatars = [
  { emoji: "👩", bg: "#F9C8C8" },
  { emoji: "🤰", bg: "#F2B3B3" },
  { emoji: "👶", bg: "#E8A5A5" },
  { emoji: "💕", bg: "#D4787A" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const fadeUp = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(20px)",
    transition: `all 0.6s ease ${delay}s`,
  });

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-22.5"
      style={{
        background:
          "linear-gradient(160deg, var(--color-cream) 0%, var(--color-cream-warm) 50%, var(--color-blush) 100%)",
      }}
    >
      {/* Blobs */}
      <Blob className="w-125 h-125 bg-blush-mid -top-30 -right-25" />
      <Blob className="w-[320px] h-80 bg-sage-light bottom-0 -left-20" />
      <Blob className="w-50 h-50 bg-gold-light bottom-25 right-50" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-sand) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Grid principal */}
      <div className="relative z-10 w-full max-w-280 mx-auto px-8 py-20 grid grid-cols-2 gap-16 items-center">
        {/* ── GAUCHE ── */}
        <div>
          {/* Tag */}
          <div style={fadeUp(0.1)}>
            <span className="section-tag">
              <Sparkles size={12} /> Suivi de grossesse personnalisé
            </span>
          </div>

          {/* Titre */}
          <h1
            className="font-serif text-text-dark font-bold leading-[1.15] mb-6"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", ...fadeUp(0.2) }}
          >
            Chaque semaine,{" "}
            <span className="text-rose italic">
              un nouveau
              <br />
              souffle de vie
            </span>{" "}
            ✨
          </h1>

          {/* Sous-titre */}
          <p
            className="text-text-mid leading-[1.7] max-w-115 mb-10"
            style={{ fontSize: "1.08rem", ...fadeUp(0.35) }}
          >
            Safe Pregnancy t'accompagne semaine après semaine — suivi de santé,
            conseils adaptés, rappels de rendez-vous — tout ce dont tu as besoin
            pour vivre cette aventure sereinement.
          </p>

          {/* Boutons */}
          <div className="flex gap-4 flex-wrap" style={fadeUp(0.5)}>
            <Link
              href="/register"
              className="btn-primary text-base! px-8! py-4!"
            >
              Commencer gratuitement <ArrowRight size={18} />
            </Link>
            <button
              className="btn-outline text-base! px-8! py-4!"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Play
                size={16}
                fill="var(--color-rose)"
                color="var(--color-rose)"
              />
              Voir comment ça marche
            </button>
          </div>

          {/* Social proof */}
          <div
            className="flex items-center gap-4 mt-12"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "all 0.6s ease 0.65s",
            }}
          >
            <div className="flex">
              {avatars.map((a, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[0.8rem]"
                  style={{ background: a.bg, marginLeft: i > 0 ? -10 : 0 }}
                >
                  {a.emoji}
                </div>
              ))}
            </div>
            <div>
              <div className="text-[0.88rem] font-semibold text-text-dark">
                +2 000 mamans
              </div>
              <div className="text-[0.8rem] text-text-light">
                font confiance à Safe Pregnancy
              </div>
            </div>
          </div>
        </div>

        {/* ── DROITE — dashboard card ── */}
        <div
          className="relative flex justify-center items-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateX(30px)",
            transition: "all 0.8s ease 0.3s",
          }}
        >
          {/* Card principale */}
          <div
            className="bg-white rounded-[32px] p-9 border border-sand w-full max-w-95 relative"
            style={{ boxShadow: "0 20px 60px rgba(180,110,110,0.15)" }}
          >
            {/* Header card */}
            <div className="flex items-center justify-between mb-7">
              <div>
                <div className="text-[0.78rem] text-text-light font-medium mb-0.5">
                  Bonjour, Sofia 👋
                </div>
                <div className="font-serif text-[1.15rem] text-text-dark font-semibold">
                  Ta grossesse aujourd'hui
                </div>
              </div>
              <div className="w-10.5 h-10.5 bg-blush rounded-full flex items-center justify-center">
                <Heart
                  size={20}
                  color="var(--color-rose)"
                  fill="var(--color-rose)"
                />
              </div>
            </div>

            {/* Progress ring */}
            <div className="flex justify-center mb-7">
              <div className="relative">
                <ProgressRing percent={60} />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rose text-white text-[0.72rem] font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                  60% complété
                </div>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {metrics.map((m) => (
                <div key={m.label} className={`${m.bg} rounded-[14px] p-3`}>
                  <div className="text-[1.2rem] mb-1">{m.icon}</div>
                  <div className="text-[0.72rem] text-text-light font-medium">
                    {m.label}
                  </div>
                  <div className="text-[0.92rem] text-text-dark font-bold">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges flottants */}
          <div className="absolute -top-5 -left-7.5">
            <WeekBadge
              week="Semaine 24"
              label="En cours"
              icon={Baby}
              delay={800}
            />
          </div>
          <div className="absolute bottom-5 -left-10">
            <WeekBadge
              week="Demain 14h"
              label="Prochain RDV"
              icon={Calendar}
              delay={1100}
            />
          </div>
        </div>
      </div>

      {/* Wave bas */}
      <div className="absolute bottom-0 left-0 right-0 leading-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 32C840 40 960 48 1080 44C1200 40 1320 24 1380 16L1440 8V80H0Z"
            fill="var(--color-cream)"
          />
        </svg>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
