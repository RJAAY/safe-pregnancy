"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

/* ── Calcul semaine et trimestre depuis la DPA ── */
function calcFromDPA(dpaStr) {
  if (!dpaStr) return null;
  const dpa = new Date(dpaStr);
  const today = new Date();
  const ddr = new Date(dpa);
  ddr.setDate(ddr.getDate() - 280);
  const diffMs = today - ddr;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7);
  if (week < 1 || week > 42) return null;
  const trimestre = week <= 13 ? 1 : week <= 26 ? 2 : 3;
  return { week, trimestre };
}

/* ── Indicateur d'étape ── */
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {[1, 2].map((s) => (
        <div key={s} className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
            style={{
              background:
                s <= current ? "var(--color-rose)" : "var(--color-sand)",
              color: s <= current ? "white" : "var(--color-text-light)",
            }}
          >
            {s < current ? <CheckCircle size={16} /> : s}
          </div>
          {s === 1 && (
            <div
              className="w-16 h-0.5 rounded-full transition-all duration-300"
              style={{
                background:
                  current >= 2 ? "var(--color-rose)" : "var(--color-sand)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Étape 1 — Compte ── */
function Step1({ data, setData, onNext }) {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const inputStyle = (field) => ({
    borderColor: focused === field ? "var(--color-rose)" : "var(--color-sand)",
    background: focused === field ? "var(--color-blush)" : "var(--color-cream)",
    boxShadow: focused === field ? "0 0 0 3px rgba(212,120,122,0.12)" : "none",
  });

  const handleNext = () => {
    if (!data.prenom || !data.email || !data.password || !data.confirm) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (data.password !== data.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (data.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center mb-2">
        <span className="section-tag">👤 Étape 1 sur 2</span>
        <h2 className="font-serif text-2xl font-bold text-text-dark mb-1">
          Crée ton compte
        </h2>
        <p className="text-sm text-text-light">
          Quelques informations pour commencer
        </p>
      </div>

      {/* Prénom */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-mid uppercase tracking-widest">
          Prénom
        </label>
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200"
          style={inputStyle("prenom")}
        >
          <User
            size={16}
            color={
              focused === "prenom"
                ? "var(--color-rose)"
                : "var(--color-text-light)"
            }
          />
          <input
            type="text"
            placeholder="Sofia"
            value={data.prenom}
            onChange={(e) => setData({ ...data, prenom: e.target.value })}
            onFocus={() => setFocused("prenom")}
            onBlur={() => setFocused("")}
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-mid uppercase tracking-widest">
          Adresse e-mail
        </label>
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200"
          style={inputStyle("email")}
        >
          <Mail
            size={16}
            color={
              focused === "email"
                ? "var(--color-rose)"
                : "var(--color-text-light)"
            }
          />
          <input
            type="email"
            placeholder="sofia@example.com"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused("")}
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
          />
        </div>
      </div>

      {/* Mot de passe */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-mid uppercase tracking-widest">
          Mot de passe
        </label>
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200"
          style={inputStyle("password")}
        >
          <Lock
            size={16}
            color={
              focused === "password"
                ? "var(--color-rose)"
                : "var(--color-text-light)"
            }
          />
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Min. 8 caractères"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused("")}
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="border-none bg-transparent cursor-pointer p-0 flex items-center"
            style={{ color: "var(--color-text-light)" }}
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {data.password && (
          <div className="flex gap-1 mt-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full transition-all duration-300"
                style={{
                  background:
                    data.password.length >= i * 4
                      ? i === 1
                        ? "var(--color-rose)"
                        : i === 2
                          ? "var(--color-gold)"
                          : "var(--color-sage-dark)"
                      : "var(--color-sand)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirmation */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-mid uppercase tracking-widest">
          Confirmer le mot de passe
        </label>
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200"
          style={{
            borderColor:
              data.confirm && data.confirm !== data.password
                ? "#e57373"
                : focused === "confirm"
                  ? "var(--color-rose)"
                  : "var(--color-sand)",
            background:
              focused === "confirm"
                ? "var(--color-blush)"
                : "var(--color-cream)",
          }}
        >
          <Lock size={16} color="var(--color-text-light)" />
          <input
            type={showPwd2 ? "text" : "password"}
            placeholder="Répète ton mot de passe"
            value={data.confirm}
            onChange={(e) => setData({ ...data, confirm: e.target.value })}
            onFocus={() => setFocused("confirm")}
            onBlur={() => setFocused("")}
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
          />
          <button
            type="button"
            onClick={() => setShowPwd2(!showPwd2)}
            className="border-none bg-transparent cursor-pointer p-0 flex items-center"
            style={{ color: "var(--color-text-light)" }}
          >
            {showPwd2 ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {data.confirm && data.confirm === data.password && (
          <p
            className="text-xs flex items-center gap-1 mt-0.5"
            style={{ color: "var(--color-sage-dark)" }}
          >
            <CheckCircle size={12} /> Les mots de passe correspondent
          </p>
        )}
      </div>

      {error && (
        <p
          className="text-xs font-medium text-center py-2 px-4 rounded-xl"
          style={{ background: "#fde8e8", color: "#c0392b" }}
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleNext}
        className="btn-primary justify-center mt-2 py-4! text-base!"
      >
        Continuer <ArrowRight size={18} />
      </button>
    </div>
  );
}

/* ── Étape 2 — Grossesse ── */
function Step2({ data, setData, onBack, onSubmit, loading, error }) {
  const info = calcFromDPA(data.dpa);
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 7);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 294);

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center mb-2">
        <span className="section-tag">🤰 Étape 2 sur 2</span>
        <h2 className="font-serif text-2xl font-bold text-text-dark mb-1">
          Ta grossesse
        </h2>
        <p className="text-sm text-text-light">
          La date que ton médecin t'a donnée
        </p>
      </div>

      {/* DPA */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-mid uppercase tracking-widest">
          Date Prévue d'Accouchement (DPA)
        </label>
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200"
          style={{
            borderColor: data.dpa ? "var(--color-rose)" : "var(--color-sand)",
            background: data.dpa ? "var(--color-blush)" : "var(--color-cream)",
            boxShadow: data.dpa ? "0 0 0 3px rgba(212,120,122,0.12)" : "none",
          }}
        >
          <Calendar
            size={16}
            color={data.dpa ? "var(--color-rose)" : "var(--color-text-light)"}
          />
          <input
            type="date"
            value={data.dpa}
            min={minDate.toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
            onChange={(e) => setData({ ...data, dpa: e.target.value })}
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans"
          />
        </div>
        <p className="text-xs text-text-light mt-0.5">
          Tu trouveras cette date sur ton ordonnance ou carnet de santé.
        </p>
      </div>

      {/* Résultat live */}
      {info && (
        <div
          className="rounded-2xl p-5 border border-sand"
          style={{
            background:
              "linear-gradient(135deg, var(--color-blush) 0%, var(--color-cream-warm) 100%)",
          }}
        >
          <p className="text-xs font-semibold text-text-light uppercase tracking-widest mb-3">
            📊 Ton suivi calculé automatiquement
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Semaine", value: `S${info.week}`, sub: "en cours" },
              {
                label: "Trimestre",
                value: `T${info.trimestre}`,
                sub: ["", "1er", "2ème", "3ème"][info.trimestre],
              },
              {
                label: "DPA",
                value: new Date(data.dpa).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                }),
                sub: "accouchement",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-3 text-center border border-sand"
              >
                <div className="font-serif text-lg font-bold text-rose">
                  {item.value}
                </div>
                <div className="text-xs text-text-light mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-text-light mb-1.5">
              <span>Semaine 1</span>
              <span className="font-semibold text-rose">
                Semaine {info.week} / 40
              </span>
              <span>Semaine 40</span>
            </div>
            <div className="w-full h-2 bg-sand rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((info.week / 40) * 100, 100)}%`,
                  background:
                    "linear-gradient(90deg, var(--color-rose), var(--color-rose-dark))",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <p
          className="text-xs font-medium text-center py-2 px-4 rounded-xl"
          style={{ background: "#fde8e8", color: "#c0392b" }}
        >
          {error}
        </p>
      )}

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="btn-outline py-4! flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Retour
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || !data.dpa || !info}
          className="btn-primary flex-1 justify-center py-4! text-base!"
          style={{ opacity: loading || !data.dpa || !info ? 0.6 : 1 }}
        >
          {loading ? (
            "Création en cours..."
          ) : (
            <>
              Créer mon compte <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Page principale ── */
export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    prenom: "",
    email: "",
    password: "",
    confirm: "",
    dpa: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // Envoie les données à l'API Route
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: data.prenom,
          email: data.email,
          password: data.password,
          dpa: data.dpa,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // L'API a retourné une erreur
        setError(result.error || "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      // Succès → redirige vers le dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Impossible de se connecter au serveur. Réessaie.");
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-16"
      style={{
        background:
          "linear-gradient(160deg, var(--color-cream) 0%, var(--color-cream-warm) 60%, var(--color-blush) 100%)",
      }}
    >
      {/* Blobs */}
      <div className="absolute w-96 h-96 rounded-full blur-[80px] opacity-40 pointer-events-none -top-24 -right-24 bg-blush-mid" />
      <div className="absolute w-64 h-64 rounded-full blur-[60px] opacity-35 pointer-events-none -bottom-16 -left-16 bg-sage-light" />
      <div className="absolute w-48 h-48 rounded-full blur-[60px] opacity-30 pointer-events-none bottom-24 right-32 bg-gold-light" />

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-sand) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 no-underline mb-5"
          >
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-rose), var(--color-blush-deep))",
                boxShadow: "0 4px 12px rgba(212,120,122,0.3)",
              }}
            >
              <Heart size={18} fill="white" color="white" />
            </span>
            <span className="font-serif text-xl font-semibold text-text-dark">
              Safe<span className="text-rose">Pregnancy</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-[32px] border border-sand p-8"
          style={{ boxShadow: "0 20px 60px rgba(180,110,110,0.12)" }}
        >
          <StepIndicator current={step} />

          {step === 1 && (
            <Step1 data={data} setData={setData} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <Step2
              data={data}
              setData={setData}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          )}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-sand" />
            <span className="text-xs text-text-light font-medium">ou</span>
            <div className="flex-1 h-px bg-sand" />
          </div>
          <p className="text-center text-sm text-text-light">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="font-semibold no-underline text-rose hover:text-rose-dark transition-colors duration-200"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-text-light mt-6 leading-relaxed">
          En t'inscrivant, tu acceptes nos{" "}
          <Link href="/cgu" className="text-rose no-underline hover:underline">
            CGU
          </Link>{" "}
          et notre{" "}
          <Link
            href="/confidentialite"
            className="text-rose no-underline hover:underline"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
