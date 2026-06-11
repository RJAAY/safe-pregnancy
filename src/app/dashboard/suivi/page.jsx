"use client";
import { useState, useEffect } from "react";
import {
  Scale,
  Activity,
  Smile,
  Plus,
  Check,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const humeurs = [
  { label: "Très bien", emoji: "😄" },
  { label: "Heureuse", emoji: "😊" },
  { label: "Neutre", emoji: "😐" },
  { label: "Fatiguée", emoji: "😴" },
  { label: "Anxieuse", emoji: "😟" },
];

const symptomesList = [
  "Nausées",
  "Fatigue légère",
  "Mal de dos",
  "Maux de tête",
  "Reflux",
  "Gonflement",
  "Insomnies",
  "Aucun",
];

const humeurColor = {
  "Très bien": "var(--color-sage-dark)",
  Heureuse: "var(--color-rose)",
  Neutre: "var(--color-gold)",
  Fatiguée: "var(--color-text-light)",
  Anxieuse: "var(--color-rose-dark)",
};

/* ── Mini graphique poids SVG ── */
function WeightChart({ data }) {
  if (!data || data.length < 2) {
    return (
      <div className="flex items-center justify-center h-28 text-sm text-text-light">
        Pas encore assez de données
      </div>
    );
  }

  // Ne garde que les saisies avec un poids
  const avecPoids = [...data].filter((d) => d.poids !== null).reverse();
  if (avecPoids.length < 2) {
    return (
      <div className="flex items-center justify-center h-28 text-sm text-text-light">
        Ajoute plus de saisies pour voir le graphique
      </div>
    );
  }

  const poids = avecPoids.map((d) => d.poids);
  const semaines = avecPoids.map((d) => `S${d.semaine}`);
  const min = Math.min(...poids) - 1;
  const max = Math.max(...poids) + 1;
  const w = 100 / (poids.length - 1);
  const h = (val) => ((max - val) / (max - min)) * 100;
  const points = poids.map((p, i) => `${i * w},${h(p)}`).join(" ");

  return (
    <div className="w-full">
      <svg viewBox="0 0 100 60" className="w-full" style={{ height: 120 }}>
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y * 0.6}
            x2="100"
            y2={y * 0.6}
            stroke="var(--color-sand)"
            strokeWidth="0.3"
          />
        ))}
        <polygon
          points={`0,${h(poids[0])} ${points} ${(poids.length - 1) * w},60 0,60`}
          fill="var(--color-rose)"
          opacity="0.08"
        />
        <polyline
          points={points}
          fill="none"
          stroke="var(--color-rose)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {poids.map((p, i) => (
          <circle
            key={i}
            cx={i * w}
            cy={h(p)}
            r="2"
            fill="white"
            stroke="var(--color-rose)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {semaines.map((s, i) => (
          <span key={i} className="text-xs text-text-light">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Ligne historique accordéon ── */
function HistoriqueRow({ entry }) {
  const [open, setOpen] = useState(false);
  const symptomes = Array.isArray(entry.symptomes) ? entry.symptomes : [];

  return (
    <div className="border border-sand rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 border-none cursor-pointer text-left transition-colors duration-200"
        style={{ background: open ? "var(--color-blush)" : "white" }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "var(--color-blush)" }}
        >
          <span className="font-serif text-sm font-bold text-rose">
            S{entry.semaine}
          </span>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-text-light">Poids</div>
            <div className="font-semibold text-sm text-text-dark">
              {entry.poids ? `${entry.poids} kg` : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-light">Tension</div>
            <div className="font-semibold text-sm text-text-dark">
              {entry.tension || "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-light">Humeur</div>
            <div
              className="font-semibold text-sm"
              style={{
                color: humeurColor[entry.humeur] || "var(--color-text-dark)",
              }}
            >
              {entry.humeur || "—"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-text-light hidden sm:block">
            {new Date(entry.dateSaisie).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
          </span>
          {open ? (
            <ChevronUp size={16} color="var(--color-text-light)" />
          ) : (
            <ChevronDown size={16} color="var(--color-text-light)" />
          )}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 bg-white border-t border-sand">
          <div className="text-xs text-text-light font-semibold uppercase tracking-widest mb-2">
            Symptômes
          </div>
          <div className="flex flex-wrap gap-2">
            {symptomes.length > 0 ? (
              symptomes.map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    background: "var(--color-blush)",
                    color: "var(--color-rose-dark)",
                  }}
                >
                  {s}
                </span>
              ))
            ) : (
              <span className="text-xs text-text-light">
                Aucun symptôme renseigné
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Page principale ── */
export default function SuiviPage() {
  // État formulaire
  const [poids, setPoids] = useState("");
  const [tension, setTension] = useState("");
  const [humeur, setHumeur] = useState("");
  const [symptomes, setSymptomes] = useState([]);
  const [focused, setFocused] = useState("");

  // État chargement / sauvegarde
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Données réelles
  const [historique, setHistorique] = useState([]);
  const [semaine, setSemaine] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupère les données au chargement
  useEffect(() => {
    Promise.all([
      fetch("/api/user").then((r) => r.json()),
      fetch("/api/saisies").then((r) => r.json()),
    ])
      .then(([userData, saisiesData]) => {
        if (!userData.error) setSemaine(userData.semaine);
        if (!saisiesData.error && Array.isArray(saisiesData)) {
          setHistorique(saisiesData);

          // Pré-remplit le formulaire si une saisie existe déjà cette semaine
          const saisieActuelle = saisiesData.find(
            (s) => s.semaine === userData.semaine,
          );
          if (saisieActuelle) {
            if (saisieActuelle.poids) setPoids(String(saisieActuelle.poids));
            if (saisieActuelle.tension) setTension(saisieActuelle.tension);
            if (saisieActuelle.humeur) setHumeur(saisieActuelle.humeur);
            if (saisieActuelle.symptomes)
              setSymptomes(saisieActuelle.symptomes);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleSymptome = (s) => {
    setSymptomes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const inputStyle = (field) => ({
    borderColor: focused === field ? "var(--color-rose)" : "var(--color-sand)",
    background: focused === field ? "var(--color-blush)" : "var(--color-cream)",
    boxShadow: focused === field ? "0 0 0 3px rgba(212,120,122,0.12)" : "none",
  });

  const handleSave = async () => {
    if (!poids && !tension && !humeur) {
      setSaveError("Remplis au moins un champ.");
      return;
    }

    setSaving(true);
    setSaveError("");

    try {
      const response = await fetch("/api/saisies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poids, tension, humeur, symptomes }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSaveError(result.error || "Une erreur est survenue.");
        setSaving(false);
        return;
      }

      // Succès
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      // Réinitialise le formulaire
      setPoids("");
      setTension("");
      setHumeur("");
      setSymptomes([]);

      // Recharge l'historique
      const saisiesData = await fetch("/api/saisies").then((r) => r.json());
      if (Array.isArray(saisiesData)) setHistorique(saisiesData);
    } catch {
      setSaveError("Impossible de sauvegarder. Réessaie.");
    } finally {
      setSaving(false);
    }
  };

  // Dernière saisie pour les stats
  const derniereSaisie = historique[0] || null;

  // Calcul prise de poids
  const poidsDebut =
    historique.length > 0 ? historique[historique.length - 1]?.poids : null;
  const poidsActuel = historique.find((s) => s.poids !== null)?.poids || null;
  const prisesPoids =
    poidsDebut && poidsActuel ? (poidsActuel - poidsDebut).toFixed(1) : null;

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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">
          Mon suivi
        </h1>
        <p className="text-text-light mt-1">
          Enregistre tes données de santé semaine après semaine
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
        {/* ── Formulaire ── */}
        <div className="col-span-2 flex flex-col gap-5">
          <div
            className="bg-white rounded-3xl border border-sand p-6"
            style={{ boxShadow: "0 4px 24px rgba(180,110,110,0.10)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--color-blush)" }}
              >
                <Plus size={20} color="var(--color-rose)" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-text-dark">
                  Saisie — Semaine {semaine}
                </h2>
                <p className="text-xs text-text-light">
                  Aujourd'hui ·{" "}
                  {new Date().toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>

            {/* Poids */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-text-mid uppercase tracking-widest mb-2 flex items-center gap-2">
                <Scale size={13} color="var(--color-rose)" /> Poids (kg)
              </label>
              <div
                className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200"
                style={inputStyle("poids")}
              >
                <input
                  type="number"
                  step="0.1"
                  placeholder="63.0"
                  value={poids}
                  onChange={(e) => setPoids(e.target.value)}
                  onFocus={() => setFocused("poids")}
                  onBlur={() => setFocused("")}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
                />
                <span className="text-sm text-text-light font-medium">kg</span>
              </div>
            </div>

            {/* Tension */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-text-mid uppercase tracking-widest mb-2 flex items-center gap-2">
                <Activity size={13} color="var(--color-rose)" /> Tension
                artérielle
              </label>
              <div
                className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200"
                style={inputStyle("tension")}
              >
                <input
                  type="text"
                  placeholder="11/7"
                  value={tension}
                  onChange={(e) => setTension(e.target.value)}
                  onFocus={() => setFocused("tension")}
                  onBlur={() => setFocused("")}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
                />
                <span className="text-sm text-text-light font-medium">
                  mmHg
                </span>
              </div>
            </div>

            {/* Humeur */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-text-mid uppercase tracking-widest mb-2 flex items-center gap-2">
                <Smile size={13} color="var(--color-rose)" /> Humeur du jour
              </label>
              <div className="grid grid-cols-5 gap-2">
                {humeurs.map((h) => (
                  <button
                    key={h.label}
                    type="button"
                    onClick={() => setHumeur(h.label)}
                    className="flex flex-col items-center gap-1 p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer"
                    style={{
                      borderColor:
                        humeur === h.label
                          ? "var(--color-rose)"
                          : "var(--color-sand)",
                      background:
                        humeur === h.label
                          ? "var(--color-blush)"
                          : "var(--color-cream)",
                      boxShadow:
                        humeur === h.label
                          ? "0 0 0 3px rgba(212,120,122,0.12)"
                          : "none",
                    }}
                  >
                    <span className="text-xl">{h.emoji}</span>
                    <span className="text-[0.65rem] text-text-light font-medium leading-tight text-center">
                      {h.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Symptômes */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-text-mid uppercase tracking-widest mb-2 block">
                Symptômes (optionnel)
              </label>
              <div className="flex flex-wrap gap-2">
                {symptomesList.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSymptome(s)}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 cursor-pointer flex items-center gap-1"
                    style={{
                      borderColor: symptomes.includes(s)
                        ? "var(--color-rose)"
                        : "var(--color-sand)",
                      background: symptomes.includes(s)
                        ? "var(--color-blush)"
                        : "white",
                      color: symptomes.includes(s)
                        ? "var(--color-rose-dark)"
                        : "var(--color-text-mid)",
                    }}
                  >
                    {symptomes.includes(s) && <Check size={11} />}
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Erreur */}
            {saveError && (
              <p
                className="text-xs font-medium text-center py-2 px-4 rounded-xl mb-4"
                style={{ background: "#fde8e8", color: "#c0392b" }}
              >
                {saveError}
              </p>
            )}

            {/* Bouton */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary justify-center w-full py-4! text-base!"
              style={{
                background: saved ? "var(--color-sage-dark)" : undefined,
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saved ? (
                <>
                  <Check size={18} /> Données enregistrées !
                </>
              ) : saving ? (
                "Enregistrement..."
              ) : (
                <>
                  <Plus size={18} /> Enregistrer cette semaine
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Colonne droite ── */}
        <div className="col-span-1 flex flex-col gap-5">
          {/* Graphique */}
          <div
            className="bg-white rounded-3xl border border-sand p-5"
            style={{ boxShadow: "0 4px 24px rgba(180,110,110,0.10)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} color="var(--color-rose)" />
              <h3 className="font-serif text-base font-semibold text-text-dark">
                Évolution du poids
              </h3>
            </div>
            <WeightChart data={historique} />

            {poidsDebut && poidsActuel && (
              <div className="flex justify-between mt-3 pt-3 border-t border-sand">
                <div className="text-center">
                  <div className="font-serif text-lg font-bold text-rose">
                    {poidsDebut} kg
                  </div>
                  <div className="text-xs text-text-light">Départ</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-lg font-bold text-rose">
                    {prisesPoids > 0 ? `+${prisesPoids}` : prisesPoids} kg
                  </div>
                  <div className="text-xs text-text-light">Pris</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-lg font-bold text-rose">
                    {poidsActuel} kg
                  </div>
                  <div className="text-xs text-text-light">Actuel</div>
                </div>
              </div>
            )}
          </div>

          {/* Dernière saisie */}
          {derniereSaisie && (
            <div
              className="bg-white rounded-3xl border border-sand p-5"
              style={{ boxShadow: "0 4px 24px rgba(180,110,110,0.10)" }}
            >
              <h3 className="font-serif text-base font-semibold text-text-dark mb-4">
                Dernière saisie
              </h3>
              {[
                {
                  label: "Poids",
                  value: derniereSaisie.poids
                    ? `${derniereSaisie.poids} kg`
                    : "—",
                  icon: "⚖️",
                  bg: "var(--color-blush)",
                },
                {
                  label: "Tension",
                  value: derniereSaisie.tension || "—",
                  icon: "❤️",
                  bg: "#E8F5E9",
                },
                {
                  label: "Humeur",
                  value: derniereSaisie.humeur || "—",
                  icon: "😊",
                  bg: "var(--color-gold-light)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 mb-3 last:mb-0"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                    style={{ background: item.bg }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-xs text-text-light">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-text-dark">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Historique */}
      <div className="mt-6">
        <h2 className="font-serif text-xl font-semibold text-text-dark mb-4">
          Historique
          <span className="text-sm font-sans font-normal text-text-light ml-2">
            ({historique.length} saisie{historique.length > 1 ? "s" : ""})
          </span>
        </h2>

        {historique.length === 0 ? (
          <div
            className="bg-white rounded-3xl border border-sand p-10 text-center"
            style={{ boxShadow: "0 2px 16px rgba(180,110,110,0.06)" }}
          >
            <div className="text-4xl mb-3">📊</div>
            <p className="font-serif text-lg text-text-mid mb-1">
              Aucune saisie pour l'instant
            </p>
            <p className="text-sm text-text-light">
              Commence par remplir le formulaire ci-dessus
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {historique.map((entry, i) => (
              <HistoriqueRow key={entry.id || i} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
