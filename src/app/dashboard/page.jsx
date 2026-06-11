"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  CalendarDays,
  Lightbulb,
  ArrowRight,
  Scale,
  Activity,
  Smile,
  ChevronRight,
} from "lucide-react";
import PregnancyRing from "@/components/dashboard/PregnancyRing";

function QuickStatCard({ icon: Icon, label, value, bg, accent }) {
  return (
    <div
      className="bg-white rounded-2xl p-4 border border-sand flex items-center gap-3"
      style={{ boxShadow: "0 2px 12px rgba(180,110,110,0.07)" }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: bg }}
      >
        <Icon size={20} color={accent} strokeWidth={1.8} />
      </div>
      <div>
        <div className="text-xs text-text-light font-medium mb-0.5">
          {label}
        </div>
        <div className="font-serif text-base font-bold text-text-dark">
          {value}
        </div>
      </div>
    </div>
  );
}

function QuickAccessCard({ href, icon: Icon, label, description, bg, accent }) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl p-5 border border-sand no-underline flex items-center gap-4 transition-all duration-200"
      style={{ boxShadow: "0 2px 12px rgba(180,110,110,0.07)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(180,110,110,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(180,110,110,0.07)";
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: bg }}
      >
        <Icon size={22} color={accent} strokeWidth={1.8} />
      </div>
      <div className="flex-1">
        <div className="font-serif text-base font-semibold text-text-dark mb-0.5">
          {label}
        </div>
        <div className="text-xs text-text-light">{description}</div>
      </div>
      <ChevronRight size={18} color="var(--color-text-light)" />
    </Link>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupère les  données utilisateur
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Pendant le chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🌸</div>
          <p className="font-serif text-lg text-text-mid">Chargement...</p>
        </div>
      </div>
    );
  }

  // Données réelles ou fallback
  const prenom = user?.prenom || "Sofia";
  const semaine = user?.semaine || 1;
  const daysLeft = user?.daysLeft || 0;
  const dpa = user?.dpa ? new Date(user.dpa) : null;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-text-light font-medium mb-1">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
        <h1 className="font-serif text-3xl font-bold text-text-dark">
          Bonjour, {prenom} 👋
        </h1>
        <p className="text-text-light mt-1">
          Tu es à la{" "}
          <span className="font-semibold text-rose">semaine {semaine}</span> —
          encore{" "}
          <span className="font-semibold text-rose">{daysLeft} jours</span>{" "}
          avant ta DPA 🌸
        </p>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
        {/* Colonne gauche — PregnancyRing */}
        <div className="col-span-1">
          <div
            className="bg-white rounded-3xl border border-sand p-6 flex flex-col items-center"
            style={{ boxShadow: "0 4px 24px rgba(180,110,110,0.10)" }}
          >
            <h2 className="font-serif text-lg font-semibold text-text-dark mb-5 self-start">
              Ta grossesse
            </h2>
            <PregnancyRing semaine={semaine} size={240} />

            {/* Jours restants */}
            <div
              className="w-full mt-5 rounded-2xl p-4 text-center border border-sand"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-blush) 0%, var(--color-cream-warm) 100%)",
              }}
            >
              <div className="font-serif text-3xl font-bold text-rose">
                {daysLeft}
              </div>
              <div className="text-xs text-text-light font-medium mt-0.5">
                jours avant la DPA
              </div>
              {dpa && (
                <div className="text-xs text-text-light mt-1">
                  {dpa.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Dernières saisies */}
          <div
            className="bg-white rounded-3xl border border-sand p-6"
            style={{ boxShadow: "0 4px 24px rgba(180,110,110,0.10)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-semibold text-text-dark">
                Cette semaine
              </h2>
              <Link
                href="/dashboard/suivi"
                className="text-xs font-semibold text-rose no-underline flex items-center gap-1 hover:text-rose-dark transition-colors"
              >
                Voir tout <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <QuickStatCard
                icon={Scale}
                label="Poids"
                value="— kg"
                bg="var(--color-blush)"
                accent="var(--color-rose)"
              />
              <QuickStatCard
                icon={Activity}
                label="Tension"
                value="—"
                bg="#E8F5E9"
                accent="var(--color-sage-dark)"
              />
              <QuickStatCard
                icon={Smile}
                label="Humeur"
                value="—"
                bg="var(--color-gold-light)"
                accent="var(--color-gold)"
              />
            </div>
            <Link
              href="/dashboard/suivi"
              className="btn-primary justify-center w-full mt-4 py-3!"
            >
              Saisir mes données de la semaine <ArrowRight size={16} />
            </Link>
          </div>

          {/* Prochain RDV */}
          <div
            className="bg-white rounded-3xl border border-sand p-6"
            style={{ boxShadow: "0 4px 24px rgba(180,110,110,0.10)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-semibold text-text-dark">
                Prochain rendez-vous
              </h2>
              <Link
                href="/dashboard/rendez-vous"
                className="text-xs font-semibold text-rose no-underline flex items-center gap-1 hover:text-rose-dark transition-colors"
              >
                Gérer <ArrowRight size={12} />
              </Link>
            </div>
            <div
              className="flex items-center gap-4 rounded-2xl p-4 border border-sand"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-blush) 0%, var(--color-cream-warm) 100%)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: "var(--color-rose)",
                  boxShadow: "0 4px 12px rgba(212,120,122,0.3)",
                }}
              >
                <CalendarDays size={24} color="white" />
              </div>
              <div className="flex-1">
                <div className="font-serif text-base font-semibold text-text-dark mb-0.5">
                  Aucun rendez-vous prévu
                </div>
                <div className="text-sm text-text-light">
                  Ajoute ton prochain rendez-vous médical
                </div>
              </div>
              <Link
                href="/dashboard/rendez-vous"
                className="text-xs font-semibold px-3 py-1.5 rounded-full no-underline"
                style={{ background: "var(--color-rose)", color: "white" }}
              >
                Ajouter
              </Link>
            </div>
          </div>

          {/* Conseil de la semaine */}
          <div
            className="rounded-3xl border border-sand p-6 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, var(--color-rose) 0%, var(--color-rose-dark) 100%)",
              boxShadow: "0 4px 24px rgba(212,120,122,0.25)",
            }}
          >
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -left-4 -bottom-8 w-28 h-28 rounded-full bg-white/6 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">👂</span>
                <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
                  Conseil · Semaine {semaine}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Le bébé peut entendre ta voix !
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                À la semaine {semaine}, ton bébé perçoit les sons. Parle-lui,
                lis-lui des histoires — il te reconnaîtra à la naissance.
              </p>
              <Link
                href="/dashboard/conseils"
                className="inline-flex items-center gap-2 bg-white font-semibold text-sm px-5 py-2.5 rounded-full no-underline transition-all duration-200"
                style={{ color: "var(--color-rose-dark)" }}
              >
                Voir tous les conseils <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Accès rapide */}
      <div className="mt-6">
        <h2 className="font-serif text-xl font-semibold text-text-dark mb-4">
          Accès rapide
        </h2>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <QuickAccessCard
            href="/dashboard/suivi"
            icon={TrendingUp}
            label="Mon suivi"
            description="Poids, tension, humeur, graphiques"
            bg="var(--color-blush)"
            accent="var(--color-rose)"
          />
          <QuickAccessCard
            href="/dashboard/rendez-vous"
            icon={CalendarDays}
            label="Rendez-vous"
            description="Gérer tes RDV médicaux"
            bg="#E8F5E9"
            accent="var(--color-sage-dark)"
          />
          <QuickAccessCard
            href="/dashboard/conseils"
            icon={Lightbulb}
            label="Conseils"
            description="Nutrition, bien-être, sommeil"
            bg="var(--color-gold-light)"
            accent="var(--color-gold)"
          />
        </div>
      </div>
    </div>
  );
}
