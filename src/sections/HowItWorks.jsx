"use client";
import { useEffect, useRef, useState } from "react";
import { UserPlus, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Crée ton compte",
    description:
      "Inscris-toi en quelques secondes, renseigne ta date de début de grossesse et laisse Safe Pregnancy faire le calcul pour toi.",
    details: [
      "Inscription simple et rapide",
      "Date de début de grossesse",
      "Calcul automatique de la DPA",
    ],
    iconBg: "bg-blush",
    accentColor: "var(--color-rose)",
    accentBg: "bg-rose",
    numberColor: "text-blush",
    chipBg: "bg-blush",
    chipText: "text-text-mid",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Suis semaine par semaine",
    description:
      "Chaque semaine, enregistre tes données de santé — poids, tension, humeur, symptômes — et vois ton évolution en graphiques.",
    details: [
      "Poids & tension artérielle",
      "Humeur & symptômes",
      "Graphiques d'évolution",
    ],
    iconBg: "bg-[#E8F5E9]",
    accentColor: "var(--color-sage-dark)",
    accentBg: "bg-sage-dark",
    numberColor: "text-[#E8F5E9]",
    chipBg: "bg-[#E8F5E9]",
    chipText: "text-text-mid",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Reçois conseils & rappels",
    description:
      "Des conseils adaptés à ta semaine actuelle et des rappels pour tes rendez-vous — tout est pensé pour ton bien-être.",
    details: [
      "Conseils nutrition & bien-être",
      "Rappels personnalisés",
      "Notifications de rendez-vous",
    ],
    iconBg: "bg-gold-light",
    accentColor: "var(--color-gold)",
    accentBg: "bg-gold",
    numberColor: "text-gold-light",
    chipBg: "bg-gold-light",
    chipText: "text-text-mid",
  },
];

function StepCard({ step, index, isLast }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Icon = step.icon;

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
    <div
      ref={ref}
      className="flex flex-col items-center relative flex-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `all 0.7s ease ${index * 0.2}s`,
      }}
    >
      {/* Ligne connecteur */}
      {!isLast && (
        <div
          className="absolute top-13 z-0 h-0.5"
          style={{
            left: "calc(50% + 68px)",
            right: "calc(-50% + 68px)",
            background:
              "linear-gradient(90deg, var(--color-blush-deep), var(--color-sand))",
          }}
        >
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blush-deep border-[3px] border-white" />
        </div>
      )}

      {/* Cercle icône */}
      <div
        className={`relative z-10 w-26 h-26 ${step.iconBg} rounded-full flex items-center justify-center mb-6 border-4 border-white`}
        style={{ boxShadow: "0 8px 32px rgba(180,110,110,0.12)" }}
      >
        <Icon size={38} color={step.accentColor} strokeWidth={1.6} />

        {/* Badge numéro */}
        <div
          className={`absolute -top-1 -right-1 w-7 h-7 ${step.accentBg} rounded-full flex items-center justify-center border-2 border-white`}
        >
          <span className="font-sans text-[0.7rem] font-extrabold text-white">
            {index + 1}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div
        className="bg-white rounded-3xl p-7 border border-sand w-full text-center"
        style={{ boxShadow: "0 2px 16px rgba(180,110,110,0.08)" }}
      >
        {/* Numéro décoratif */}
        <div
          className={`font-serif text-5xl font-bold ${step.numberColor} leading-none mb-2 tracking-[-0.03em]`}
        >
          {step.number}
        </div>

        <h3 className="font-serif text-xl font-semibold text-text-dark mb-3">
          {step.title}
        </h3>

        <p className="text-[0.88rem] leading-[1.65] text-text-light mb-5">
          {step.description}
        </p>

        {/* Chips détails */}
        <div className="flex flex-col gap-2">
          {step.details.map((d) => (
            <div
              key={d}
              className={`flex items-center gap-2 ${step.chipBg} rounded-[10px] px-3 py-1.75 text-[0.8rem] ${step.chipText} font-medium`}
            >
              <span
                className={`w-4.5 h-4.5 ${step.accentBg} rounded-full flex items-center justify-center shrink-0`}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5l2 2 4-4"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

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
      id="how-it-works"
      className="relative py-25 px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-cream-warm) 0%, var(--color-cream) 100%)",
      }}
    >
      {/* Cercles décoratifs */}
      <div className="absolute -top-15 -left-15 w-60 h-60 rounded-full border-40 border-blush opacity-40 pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-45 h-45 rounded-full border-30 border-sage-light opacity-40 pointer-events-none" />

      <div className="relative max-w-280 mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-18"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span className="section-tag">🌿 Simple & intuitif</span>
          <h2
            className="font-serif font-bold text-text-dark leading-[1.2] mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
          >
            Commencer en{" "}
            <span className="text-rose italic">3 étapes simples</span>
          </h2>
          <p className="text-[1.05rem] text-text-light max-w-120 mx-auto leading-[1.7]">
            Pas de complication — juste ce qu'il te faut pour démarrer ton suivi
            en toute sérénité.
          </p>
        </div>

        {/* Étapes */}
        <div className="flex gap-8 items-start relative max-md:flex-col">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        {/* Banner CTA */}
        <div
          className="mt-18 rounded-[28px] px-12 py-11 flex items-center justify-between gap-6 flex-wrap relative overflow-hidden max-md:flex-col max-md:px-6 max-md:py-8"
          style={{
            background:
              "linear-gradient(135deg, var(--color-rose) 0%, var(--color-rose-dark) 100%)",
            boxShadow: "0 16px 48px rgba(212,120,122,0.3)",
          }}
        >
          {/* Formes décoratives */}
          <div className="absolute -right-10 -top-10 w-50 h-50 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-20 -bottom-15 w-40 h-40 rounded-full bg-white/6 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-2xl mb-1.5">🌸</div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Prête à commencer ton suivi ?
            </h3>
            <p className="text-[0.95rem] text-white/80 max-w-100">
              Rejoins des milliers de mamans qui suivent leur grossesse avec
              Safe Pregnancy.
            </p>
          </div>

          <a
            href="/register"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            className="relative z-10 inline-flex items-center gap-2 bg-white text-rose-dark font-sans text-[0.95rem] font-bold px-8 py-4 rounded-full no-underline shrink-0 transition-all duration-200"
            style={{
              color: "var(--color-rose-dark)",
              boxShadow: ctaHovered
                ? "0 8px 24px rgba(0,0,0,0.16)"
                : "0 4px 16px rgba(0,0,0,0.12)",
              transform: ctaHovered ? "translateY(-2px)" : "none",
            }}
          >
            Créer mon compte gratuitement ✨
          </a>
        </div>
      </div>
    </section>
  );
}
