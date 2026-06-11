"use client";
import { useState, useEffect } from "react";
import { Apple, Heart, Baby, Moon, Sparkles } from "lucide-react";
import { getConseilsSemaine } from "@/data/conseils";

const iconeParCategorie = {
  nutrition: Apple,
  bienetre: Heart,
  bebe: Baby,
  sommeil: Moon,
};

const couleurParCategorie = {
  nutrition: { bg: "#E8F5E9", accent: "var(--color-sage-dark)" },
  bienetre: { bg: "var(--color-blush)", accent: "var(--color-rose)" },
  bebe: { bg: "var(--color-gold-light)", accent: "var(--color-gold)" },
  sommeil: { bg: "var(--color-blush-mid)", accent: "var(--color-rose-dark)" },
};

function ConseilCard({ conseil, accent }) {
  return (
    <div
      className="bg-white rounded-2xl border border-sand p-5 transition-all duration-200"
      style={{ boxShadow: "0 2px 12px rgba(180,110,110,0.06)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(180,110,110,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(180,110,110,0.06)";
      }}
    >
      <div
        className="w-8 h-1 rounded-full mb-3"
        style={{ background: accent }}
      />
      <h3 className="font-serif text-base font-semibold text-text-dark mb-2 leading-snug">
        {conseil.titre}
      </h3>
      <p className="text-sm text-text-light leading-relaxed">{conseil.texte}</p>
    </div>
  );
}

export default function ConseilsPage() {
  const [semaine, setSemaine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategorie, setActiveCategorie] = useState("all");

  // Récupère la vraie semaine de l'utilisatrice
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setSemaine(data.semaine);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Pendant le chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4">🌸</div>
          <p className="font-serif text-lg text-text-mid">Chargement...</p>
        </div>
      </div>
    );
  }

  // Récupère les conseils de la semaine actuelle
  const data = getConseilsSemaine(semaine || 1);

  // Filtre les catégories selon l'onglet actif
  const categoriesFiltrees =
    activeCategorie === "all"
      ? data.categories
      : data.categories.filter((c) => c.id === activeCategorie);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">
          Conseils
        </h1>
        <p className="text-text-light mt-1">
          Conseils personnalisés pour ta{" "}
          <span className="font-semibold text-rose">semaine {semaine}</span>
        </p>
      </div>

      {/* Carte semaine */}
      <div
        className="rounded-3xl p-6 mb-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-rose) 0%, var(--color-rose-dark) 100%)",
          boxShadow: "0 8px 32px rgba(212,120,122,0.25)",
        }}
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-16 -bottom-10 w-28 h-28 rounded-full bg-white/6 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Sparkles size={26} color="white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
              Cette semaine
            </div>
            <h2 className="font-serif text-xl font-bold text-white leading-snug">
              {data.titre}
            </h2>
            <p className="text-sm text-white/80 mt-1">{data.sousTitre}</p>
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setActiveCategorie("all")}
          className="text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer"
          style={{
            borderColor:
              activeCategorie === "all"
                ? "var(--color-rose)"
                : "var(--color-sand)",
            background:
              activeCategorie === "all" ? "var(--color-rose)" : "white",
            color:
              activeCategorie === "all" ? "white" : "var(--color-text-mid)",
          }}
        >
          Tous
        </button>

        {data.categories.map((cat) => {
          const isActive = activeCategorie === cat.id;
          const couleurs = couleurParCategorie[cat.id] || {
            bg: "var(--color-blush)",
            accent: "var(--color-rose)",
          };
          const Icon = iconeParCategorie[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategorie(cat.id)}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer"
              style={{
                borderColor: isActive ? couleurs.accent : "var(--color-sand)",
                background: isActive ? couleurs.bg : "white",
                color: isActive ? couleurs.accent : "var(--color-text-mid)",
              }}
            >
              {Icon && <Icon size={14} />}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sections de conseils */}
      <div className="flex flex-col gap-8">
        {categoriesFiltrees.map((cat) => {
          const couleurs = couleurParCategorie[cat.id] || {
            bg: "var(--color-blush)",
            accent: "var(--color-rose)",
          };
          const Icon = iconeParCategorie[cat.id];

          return (
            <div key={cat.id}>
              {/* Titre de catégorie */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: couleurs.bg }}
                >
                  {Icon && (
                    <Icon size={20} color={couleurs.accent} strokeWidth={1.8} />
                  )}
                  {!Icon && <span>{cat.emoji}</span>}
                </div>
                <h2 className="font-serif text-xl font-semibold text-text-dark">
                  {cat.label}
                </h2>
                <div className="flex-1 h-px bg-sand ml-2" />
              </div>

              {/* Grille de conseils */}
              <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {cat.conseils.map((conseil, i) => (
                  <ConseilCard
                    key={i}
                    conseil={conseil}
                    accent={couleurs.accent}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
