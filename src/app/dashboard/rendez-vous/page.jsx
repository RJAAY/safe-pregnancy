"use client";
import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Plus,
  Check,
  Trash2,
  X,
  Stethoscope,
} from "lucide-react";

const typesRdv = [
  "Consultation obstétrique",
  "Échographie",
  "Prise de sang",
  "Consultation sage-femme",
  "Amniocentèse",
  "Autre",
];

const emojiParType = {
  "Consultation obstétrique": "👩‍⚕️",
  Échographie: "🔬",
  "Prise de sang": "🩸",
  "Consultation sage-femme": "👶",
  Amniocentèse: "🧬",
  Autre: "📅",
};

const couleurParType = {
  "Consultation obstétrique": {
    bg: "var(--color-blush)",
    accent: "var(--color-rose)",
  },
  Échographie: { bg: "var(--color-blush)", accent: "var(--color-rose)" },
  "Prise de sang": {
    bg: "var(--color-gold-light)",
    accent: "var(--color-gold)",
  },
  "Consultation sage-femme": {
    bg: "#E8F5E9",
    accent: "var(--color-sage-dark)",
  },
  Amniocentèse: {
    bg: "var(--color-blush-mid)",
    accent: "var(--color-rose-dark)",
  },
  Autre: { bg: "var(--color-cream-warm)", accent: "var(--color-text-mid)" },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function daysUntil(dateStr) {
  const diff = Math.ceil(
    (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24),
  );
  if (diff === 0) return "Aujourd'hui";
  if (diff === 1) return "Demain";
  if (diff < 0) return "Passé";
  return `Dans ${diff} jours`;
}

/* ── Carte RDV à venir ── */
function RdvCard({ rdv, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const countdown = daysUntil(rdv.dateRdv);
  const isUrgent = countdown !== "Passé" && parseInt(countdown) <= 7;
  const couleurs = couleurParType[rdv.type] || couleurParType["Autre"];
  const emoji = emojiParType[rdv.type] || "📅";

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(rdv.id);
    setDeleting(false);
  };

  return (
    <div
      className="bg-white rounded-3xl border border-sand p-5 transition-all duration-200"
      style={{ boxShadow: "0 2px 16px rgba(180,110,110,0.08)" }}
    >
      <div className="flex items-start gap-4">
        {/* Icône */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: couleurs.bg }}
        >
          {emoji}
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-base font-semibold text-text-dark leading-tight">
              {rdv.type}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                style={{
                  background: isUrgent ? "var(--color-rose)" : couleurs.bg,
                  color: isUrgent ? "white" : couleurs.accent,
                }}
              >
                {countdown}
              </span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-7 h-7 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all duration-200"
                style={{
                  background: "var(--color-cream)",
                  color: "var(--color-text-light)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fde8e8";
                  e.currentTarget.style.color = "var(--color-rose-dark)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-cream)";
                  e.currentTarget.style.color = "var(--color-text-light)";
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-text-mid">
              <CalendarDays size={12} color="var(--color-rose)" />
              <span className="capitalize">{formatDate(rdv.dateRdv)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-mid">
              <Clock size={12} color="var(--color-rose)" />
              <span>{rdv.heure}</span>
            </div>
            {rdv.medecin && (
              <div className="flex items-center gap-2 text-xs text-text-mid">
                <User size={12} color="var(--color-rose)" />
                <span>{rdv.medecin}</span>
              </div>
            )}
            {rdv.lieu && (
              <div className="flex items-center gap-2 text-xs text-text-light">
                <MapPin size={12} color="var(--color-text-light)" />
                <span className="truncate">{rdv.lieu}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Carte RDV passé ── */
function RdvPasseCard({ rdv }) {
  const emoji = emojiParType[rdv.type] || "📅";
  return (
    <div
      className="bg-white rounded-2xl border border-sand p-4 flex items-center gap-4 opacity-60"
      style={{ boxShadow: "0 1px 8px rgba(180,110,110,0.05)" }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 bg-cream">
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-text-dark truncate">
          {rdv.type}
        </div>
        <div className="text-xs text-text-light mt-0.5">
          {formatDate(rdv.dateRdv)} · {rdv.heure}
          {rdv.medecin && ` · ${rdv.medecin}`}
        </div>
      </div>
      <span
        className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0"
        style={{
          background: "var(--color-cream-warm)",
          color: "var(--color-text-light)",
        }}
      >
        Passé
      </span>
    </div>
  );
}

/* ── Modal ajout RDV ── */
function AddRdvModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    type: "",
    date: "",
    heure: "",
    medecin: "",
    lieu: "",
  });
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputStyle = (field) => ({
    borderColor: focused === field ? "var(--color-rose)" : "var(--color-sand)",
    background: focused === field ? "var(--color-blush)" : "var(--color-cream)",
    boxShadow: focused === field ? "0 0 0 3px rgba(212,120,122,0.12)" : "none",
  });

  const handleAdd = async () => {
    if (!form.type || !form.date || !form.heure) {
      setError("Type, date et heure sont obligatoires.");
      return;
    }
    setLoading(true);
    setError("");
    await onAdd(form);
    setLoading(false);
  };

  const fields = [
    { key: "date", label: "Date", icon: CalendarDays, type: "date" },
    { key: "heure", label: "Heure", icon: Clock, type: "time" },
    {
      key: "medecin",
      label: "Médecin / Praticien",
      icon: User,
      type: "text",
      placeholder: "Dr. Martin",
    },
    {
      key: "lieu",
      label: "Lieu",
      icon: MapPin,
      type: "text",
      placeholder: "Clinique, cabinet...",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(61,44,44,0.4)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-[32px] border border-sand w-full max-w-md p-7 relative"
        style={{ boxShadow: "0 24px 64px rgba(180,110,110,0.18)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "var(--color-blush)" }}
            >
              <Stethoscope size={18} color="var(--color-rose)" />
            </div>
            <h2 className="font-serif text-xl font-bold text-text-dark">
              Nouveau RDV
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center border-none cursor-pointer"
            style={{
              background: "var(--color-cream)",
              color: "var(--color-text-light)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-text-mid uppercase tracking-widest mb-2 block">
            Type de rendez-vous
          </label>
          <div className="flex flex-wrap gap-2">
            {typesRdv.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, type: t })}
                className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 cursor-pointer"
                style={{
                  borderColor:
                    form.type === t ? "var(--color-rose)" : "var(--color-sand)",
                  background: form.type === t ? "var(--color-blush)" : "white",
                  color:
                    form.type === t
                      ? "var(--color-rose-dark)"
                      : "var(--color-text-mid)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Autres champs */}
        <div className="flex flex-col gap-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-text-mid uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <f.icon size={11} color="var(--color-rose)" /> {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder || ""}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                onFocus={() => setFocused(f.key)}
                onBlur={() => setFocused("")}
                className="w-full rounded-2xl border px-4 py-3 text-sm text-text-dark font-sans outline-none transition-all duration-200 placeholder:text-text-light"
                style={inputStyle(f.key)}
              />
            </div>
          ))}
        </div>

        {error && (
          <p
            className="text-xs font-medium text-center py-2 px-4 rounded-xl mt-3"
            style={{ background: "#fde8e8", color: "#c0392b" }}
          >
            {error}
          </p>
        )}

        {/* Boutons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="btn-outline flex-1 justify-center py-3!"
          >
            Annuler
          </button>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="btn-primary flex-1 justify-center py-3!"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              "Ajout..."
            ) : (
              <>
                <Check size={16} /> Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page principale ── */
export default function RendezVousPage() {
  const [aVenir, setAVenir] = useState([]);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Charge les RDV au chargement
  const chargerRdvs = () => {
    fetch("/api/rendez-vous")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          setAVenir(data.aVenir || []);
          setPasses(data.passes || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    chargerRdvs();
  }, []);

  // Supprime un RDV
  const handleDelete = async (id) => {
    const response = await fetch(`/api/rendez-vous/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setAVenir((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Ajoute un RDV
  const handleAdd = async (form) => {
    const response = await fetch("/api/rendez-vous", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setShowModal(false);
      chargerRdvs(); // Recharge pour avoir les données triées
    }
  };

  const prochainRdv = aVenir[0] || null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4">📅</div>
          <p className="font-serif text-lg text-text-mid">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-text-dark">
            Rendez-vous
          </h1>
          <p className="text-text-light mt-1">
            Suis et gère tous tes rendez-vous médicaux
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary gap-2"
        >
          <Plus size={18} /> Ajouter un RDV
        </button>
      </div>

      {/* Prochain RDV mis en avant */}
      {prochainRdv && (
        <div
          className="rounded-3xl p-6 mb-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--color-rose) 0%, var(--color-rose-dark) 100%)",
            boxShadow: "0 8px 32px rgba(212,120,122,0.3)",
          }}
        >
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-20 -bottom-10 w-28 h-28 rounded-full bg-white/6 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">
              ⏰ Prochain rendez-vous
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-4">
              {prochainRdv.type}
            </h2>
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {[
                { icon: CalendarDays, text: formatDate(prochainRdv.dateRdv) },
                { icon: Clock, text: prochainRdv.heure },
                ...(prochainRdv.medecin
                  ? [{ icon: User, text: prochainRdv.medecin }]
                  : []),
                ...(prochainRdv.lieu
                  ? [{ icon: MapPin, text: prochainRdv.lieu }]
                  : []),
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-white/85"
                >
                  <item.icon size={14} color="rgba(255,255,255,0.7)" />
                  <span className="capitalize truncate">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm">
              {daysUntil(prochainRdv.dateRdv)}
            </div>
          </div>
        </div>
      )}

      {/* RDV à venir */}
      <div className="mb-8">
        <h2 className="font-serif text-xl font-semibold text-text-dark mb-4 flex items-center gap-2">
          À venir
          <span
            className="text-sm font-sans font-normal px-2.5 py-0.5 rounded-full"
            style={{
              background: "var(--color-blush)",
              color: "var(--color-rose)",
            }}
          >
            {aVenir.length}
          </span>
        </h2>

        {aVenir.length === 0 ? (
          <div
            className="bg-white rounded-3xl border border-sand p-10 text-center"
            style={{ boxShadow: "0 2px 16px rgba(180,110,110,0.06)" }}
          >
            <div className="text-4xl mb-3">📅</div>
            <p className="font-serif text-lg text-text-mid mb-1">
              Aucun rendez-vous prévu
            </p>
            <p className="text-sm text-text-light mb-4">
              Ajoute ton prochain rendez-vous médical
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary mx-auto"
            >
              <Plus size={16} /> Ajouter un RDV
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {aVenir.map((rdv) => (
              <RdvCard key={rdv.id} rdv={rdv} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {/* RDV passés */}
      {passes.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-text-dark mb-4">
            Historique
          </h2>
          <div className="flex flex-col gap-3">
            {passes.map((rdv) => (
              <RdvPasseCard key={rdv.id} rdv={rdv} />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <AddRdvModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  );
}
