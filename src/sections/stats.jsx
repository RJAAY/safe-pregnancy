"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 40,
    suffix: "",
    label: "semaines de suivi",
    description: "Du 1er jour jusqu'à l'accouchement",
    emoji: "🗓️",
    topBar: "bg-blush",
    emojiBg: "bg-blush",
    accentColor: "var(--color-rose)",
  },
  {
    value: 2000,
    suffix: "+",
    label: "mamans accompagnées",
    description: "Et ce nombre grandit chaque jour",
    emoji: "🤰",
    topBar: "bg-sage-light",
    emojiBg: "bg-sage-light",
    accentColor: "var(--color-sage-dark)",
  },
  {
    value: 100,
    suffix: "%",
    label: "données sécurisées",
    description: "Vie privée protégée, zéro pub",
    emoji: "🔒",
    topBar: "bg-gold-light",
    emojiBg: "bg-gold-light",
    accentColor: "var(--color-gold)",
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "note moyenne",
    description: "Par nos utilisatrices satisfaites",
    emoji: "⭐",
    topBar: "bg-cream-warm",
    emojiBg: "bg-cream-warm",
    accentColor: "var(--color-rose-dark)",
  },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(
          isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current),
        );
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat.value, 1800, visible);

  return (
    <div
      ref={ref}
      className="relative bg-white rounded-3xl border border-sand text-center overflow-hidden"
      style={{
        padding: "36px 28px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s ease ${index * 0.12}s`,
        boxShadow: "0 2px 16px rgba(180,110,110,0.08)",
      }}
    >
      {/* Barre colorée en haut */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${stat.topBar} rounded-t-3xl`}
      />

      {/* Emoji */}
      <div
        className={`w-14 h-14 ${stat.emojiBg} rounded-full flex items-center justify-center text-2xl mx-auto mb-5`}
      >
        {stat.emoji}
      </div>

      {/* Nombre animé */}
      <div
        className="font-serif text-5xl font-bold leading-none mb-2"
        style={{ color: stat.accentColor }}
      >
        {count}
        {stat.suffix}
      </div>

      {/* Label */}
      <div className="font-serif text-base font-semibold text-text-dark mb-2">
        {stat.label}
      </div>

      {/* Description */}
      <div className="text-xs text-text-light leading-relaxed">
        {stat.description}
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stats"
      className="relative py-24 px-8 bg-cream overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span className="section-tag">📊 En chiffres</span>
          <h2
            className="font-serif font-bold text-text-dark leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            Safe Pregnancy,{" "}
            <span className="text-rose italic">en quelques chiffres</span>
          </h2>
          <p className="text-base text-text-light max-w-sm mx-auto leading-relaxed">
            Des données qui parlent d'elles-mêmes, pour une grossesse en toute
            confiance.
          </p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
