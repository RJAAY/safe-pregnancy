"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputStyle = (field) => ({
    borderColor: focused === field ? "var(--color-rose)" : "var(--color-sand)",
    background: focused === field ? "var(--color-blush)" : "var(--color-cream)",
    boxShadow: focused === field ? "0 0 0 3px rgba(212,120,122,0.12)" : "none",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Envoie les données à l'API Route login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
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
      {/* Blobs décoratifs */}
      <div className="absolute w-96 h-96 rounded-full blur-[80px] opacity-40 pointer-events-none -top-24 -right-24 bg-blush-mid" />
      <div className="absolute w-64 h-64 rounded-full blur-[60px] opacity-35 pointer-events-none -bottom-16 -left-16 bg-sage-light" />
      <div className="absolute w-48 h-48 rounded-full blur-[60px] opacity-30 pointer-events-none bottom-24 right-32 bg-gold-light" />

      {/* Motif de points */}
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
            className="inline-flex items-center gap-2.5 no-underline mb-6"
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

          <h1 className="font-serif text-3xl font-bold text-text-dark mb-2">
            Bon retour 👋
          </h1>
          <p className="text-sm text-text-light leading-relaxed">
            Connecte-toi pour continuer ton suivi de grossesse
          </p>
        </div>

        {/* Card formulaire */}
        <div
          className="bg-white rounded-[32px] border border-sand p-8"
          style={{ boxShadow: "0 20px 60px rgba(180,110,110,0.12)" }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-text-mid uppercase tracking-widest">
                  Mot de passe
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium no-underline transition-colors duration-200 text-rose hover:text-rose-dark"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
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
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="border-none bg-transparent cursor-pointer p-0 flex items-center"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <p
                className="text-xs font-medium text-center py-2.5 px-4 rounded-xl"
                style={{ background: "#fde8e8", color: "#c0392b" }}
              >
                {error}
              </p>
            )}

            {/* Bouton connexion */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary justify-center mt-2 py-4! text-base!"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                "Connexion en cours..."
              ) : (
                <>
                  Se connecter <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Séparateur */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-sand" />
            <span className="text-xs text-text-light font-medium">ou</span>
            <div className="flex-1 h-px bg-sand" />
          </div>

          {/* Lien inscription */}
          <p className="text-center text-sm text-text-light">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="font-semibold no-underline text-rose hover:text-rose-dark transition-colors duration-200"
            >
              Créer un compte gratuitement
            </Link>
          </p>
        </div>

        {/* Mention légale */}
        <p className="text-center text-xs text-text-light mt-6 leading-relaxed">
          En te connectant, tu acceptes nos{" "}
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
