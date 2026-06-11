"use client";
import { useEffect, useRef, useState } from "react";
import {
  Baby,
  Calendar,
  HeartPulse,
  Bell,
  Lightbulb,
  Activity,
} from "lucide-react";

const features = [
  {
    icon: Baby,
    title: "Suivi semaine par semaine",
    description:
      "Visualise l'évolution de ton bébé et ta grossesse semaine après semaine avec une progression claire et détaillée.",
    iconBg: "bg-blush",
    accentColor: "var(--color-rose)",
    lineColor: "bg-rose",
    emoji: "🤰",
  },
  {
    icon: HeartPulse,
    title: "Données de santé",
    description:
      "Enregistre ton poids, ta tension artérielle, tes symptômes et ton humeur pour garder un historique complet.",
    iconBg: "bg-[#E8F5E9]",
    accentColor: "var(--color-sage-dark)",
    lineColor: "bg-sage-dark",
    emoji: "💚",
  },
  {
    icon: Activity,
    title: "Dashboard personnalisé",
    description:
      "Visualise tes données sous forme de graphiques clairs et accède à tous tes suivis d'un seul coup d'œil.",
    iconBg: "bg-cream-warm",
    accentColor: "var(--color-gold)",
    lineColor: "bg-gold",
    emoji: "📊",
  },
  {
    icon: Bell,
    title: "Rappels & rendez-vous",
    description:
      "Ne rate plus aucun rendez-vous médical. Crée des rappels personnalisés et reçois des notifications adaptées.",
    iconBg: "bg-blush-mid",
    accentColor: "var(--color-rose-dark)",
    lineColor: "bg-rose-dark",
    emoji: "🔔",
  },
  {
    icon: Lightbulb,
    title: "Conseils adaptés",
    description:
      "Des conseils nutrition, bien-être et santé automatiquement adaptés à ta semaine de grossesse actuelle.",
    iconBg: "bg-sage-light",
    accentColor: "var(--color-sage-dark)",
    lineColor: "bg-sage-dark",
    emoji: "💡",
  },
  {
    icon: Calendar,
    title: "Calcul automatique de la DPA",
    description:
      "Renseigne ta date de début et l'application calcule instantanément ta date prévue d'accouchement.",
    iconBg: "bg-gold-light",
    accentColor: "var(--color-gold)",
    lineColor: "bg-gold",
    emoji: "📅",
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white rounded-3xl p-8 border border-sand overflow-hidden cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? "0 12px 40px rgba(180,110,110,0.16)"
          : "0 2px 16px rgba(180,110,110,0.08)",
      }}
    >
      {/* Emoji watermark */}
      <div className="absolute right-4 top-4 text-[3.5rem] opacity-[0.06] select-none leading-none">
        {feature.emoji}
      </div>

      {/* Icône */}
      <div
        className={`w-14 h-14 ${feature.iconBg} rounded-[18px] flex items-center justify-center mb-5`}
      >
        <Icon size={26} color={feature.accentColor} strokeWidth={1.8} />
      </div>

      {/* Ligne accent */}
      <div
        className={`w-8 h-0.75 ${feature.lineColor} rounded-full mb-4 opacity-60`}
      />

      <h3 className="font-serif text-[1.15rem] font-semibold text-text-dark mb-2.5 leading-[1.3]">
        {feature.title}
      </h3>

      <p className="text-[0.9rem] leading-[1.65] text-text-light m-0">
        {feature.description}
      </p>
    </div>
  );
}

export default function Features() {
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
      id="features"
      className="relative py-25 px-8 bg-cream overflow-hidden"
    >
      {/* Fond radial doux */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 pointer-events-none opacity-30 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--color-blush) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-280 mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-16 transition-all duration-600"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span className="section-tag">✨ Fonctionnalités</span>
          <h2
            className="font-serif font-bold text-text-dark leading-[1.2] mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
          >
            Tout ce dont tu as besoin,{" "}
            <span className="text-rose italic">au même endroit</span>
          </h2>
          <p className="text-[1.05rem] text-text-light max-w-130 mx-auto leading-[1.7]">
            Safe Pregnancy réunit tous les outils essentiels pour un suivi de
            grossesse simple, serein et personnalisé.
          </p>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* CTA bas */}
        <div className="text-center mt-14">
          <p className="text-[0.95rem] text-text-light mb-5">
            Prête à commencer ton suivi personnalisé ?
          </p>
          <a href="/register" className="btn-primary">
            Créer mon compte gratuitement
          </a>
        </div>
      </div>
    </section>
  );
}
