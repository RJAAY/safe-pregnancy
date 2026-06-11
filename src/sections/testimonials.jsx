"use client";
import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amira B.",
    week: "Semaine 32",
    avatar: "🤰",
    barBg: "bg-blush",
    iconBg: "bg-blush",
    avatarBg: "bg-blush",
    tagBg: "bg-blush",
    stars: 5,
    text: "Safe Pregnancy m'a vraiment aidée à suivre ma grossesse sereinement. Les conseils adaptés à chaque semaine sont précieux, et les rappels de rendez-vous me sauvent la mise !",
    tag: "Suivi santé",
  },
  {
    name: "Sofia M.",
    week: "Semaine 18",
    avatar: "👩",
    barBg: "bg-sage-light",
    iconBg: "bg-sage-light",
    avatarBg: "bg-sage-light",
    tagBg: "bg-sage-light",
    stars: 5,
    text: "J'adore le dashboard — tout est clair, intuitif et tellement joli. Je me sens accompagnée à chaque étape. C'est comme avoir une sage-femme dans ma poche.",
    tag: "Dashboard",
  },
  {
    name: "Lina K.",
    week: "Semaine 40 ✨",
    avatar: "💕",
    barBg: "bg-gold-light",
    iconBg: "bg-gold-light",
    avatarBg: "bg-gold-light",
    tagBg: "bg-gold-light",
    stars: 5,
    text: "J'ai utilisé Safe Pregnancy du début jusqu'à l'accouchement. Le calcul de la DPA était parfait, et tenir un journal de mes données m'a permis d'avoir de vraies discussions avec mon médecin.",
    tag: "Journal de grossesse",
  },
];

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill="var(--color-gold)"
          color="var(--color-gold)"
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
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
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative bg-white rounded-[28px] border border-sand flex flex-col overflow-hidden"
      style={{
        padding: "36px 32px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.65s ease ${index * 0.15}s`,
        boxShadow: "0 2px 16px rgba(180,110,110,0.08)",
      }}
    >
      {/* Barre colorée top */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${t.barBg} rounded-t-[28px]`}
      />

      {/* Icône quote */}
      <div
        className={`w-11 h-11 ${t.iconBg} rounded-[14px] flex items-center justify-center mb-5 mt-2`}
      >
        <Quote size={20} color="var(--color-rose)" strokeWidth={2} />
      </div>

      <StarRow count={t.stars} />

      {/* Texte */}
      <p className="text-sm leading-[1.75] text-text-mid mb-7 flex-1 italic">
        "{t.text}"
      </p>

      {/* Auteur */}
      <div className="flex items-center gap-3.5">
        <div
          className={`w-12 h-12 ${t.avatarBg} rounded-full flex items-center justify-center text-2xl border-[3px] border-white shrink-0`}
          style={{ boxShadow: "0 2px 12px rgba(180,110,110,0.12)" }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="font-serif text-base font-semibold text-text-dark">
            {t.name}
          </div>
          <div className="text-xs text-text-light font-medium mt-0.5">
            {t.week}
          </div>
        </div>
        <div className="ml-auto">
          <span
            className={`${t.tagBg} text-text-mid text-xs font-semibold px-3 py-1 rounded-full`}
          >
            {t.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
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
      id="testimonials"
      className="relative py-24 px-8 bg-cream-warm overflow-hidden"
    >
      {/* Cercles décoratifs */}
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-96 h-96 rounded-full border-60 border-blush opacity-35 pointer-events-none" />
      <div className="absolute -bottom-14 -left-14 w-60 h-60 rounded-full border-40 border-sage-light opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span className="section-tag">💬 Témoignages</span>
          <h2
            className="font-serif font-bold text-text-dark leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
          >
            Elles nous font <span className="text-rose italic">confiance</span>
          </h2>
          <p className="text-base text-text-light max-w-sm mx-auto leading-relaxed">
            Des milliers de futures mamans vivent leur grossesse avec Safe
            Pregnancy chaque jour.
          </p>

          {/* Note agrégée */}
          <div
            className="inline-flex items-center gap-2.5 bg-white rounded-full px-6 py-2.5 mt-6 border border-sand"
            style={{ boxShadow: "0 2px 16px rgba(180,110,110,0.08)" }}
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={16}
                  fill="var(--color-gold)"
                  color="var(--color-gold)"
                />
              ))}
            </div>
            <span className="font-bold text-text-dark text-sm">4.9/5</span>
            <span className="text-text-light text-xs">· +2 000 avis</span>
          </div>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
