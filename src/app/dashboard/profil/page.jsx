"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Pencil,
  X,
  Trash2,
} from "lucide-react";

/* ── Champ éditable ── */
function EditableField({
  label,
  icon: Icon,
  value,
  type = "text",
  onSave,
  hint,
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const [focused, setFocused] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Met à jour val si value change depuis le parent
  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const err = await onSave(val);
    if (err) {
      setError(err);
    } else {
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setVal(value);
    setEditing(false);
    setError("");
  };

  return (
    <div
      className="bg-white rounded-2xl border border-sand p-5"
      style={{ boxShadow: "0 2px 12px rgba(180,110,110,0.06)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold text-text-mid uppercase tracking-widest flex items-center gap-1.5">
          <Icon size={12} color="var(--color-rose)" /> {label}
        </label>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border-none cursor-pointer"
            style={{
              background: "var(--color-blush)",
              color: "var(--color-rose)",
            }}
          >
            <Pencil size={11} /> Modifier
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="w-7 h-7 rounded-lg flex items-center justify-center border-none cursor-pointer"
            style={{
              background: "var(--color-cream)",
              color: "var(--color-text-light)",
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {editing ? (
        <div className="flex flex-col gap-3">
          <div
            className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200"
            style={{
              borderColor: focused ? "var(--color-rose)" : "var(--color-sand)",
              background: focused ? "var(--color-blush)" : "var(--color-cream)",
              boxShadow: focused ? "0 0 0 3px rgba(212,120,122,0.12)" : "none",
            }}
          >
            <input
              type={type}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans"
              autoFocus
            />
          </div>
          {hint && <p className="text-xs text-text-light">{hint}</p>}
          {error && (
            <p
              className="text-xs font-medium py-2 px-3 rounded-xl"
              style={{ background: "#fde8e8", color: "#c0392b" }}
            >
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="btn-outline py-2! px-4! text-xs! flex-1 justify-center"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary py-2! px-4! text-xs! flex-1 justify-center"
              style={{ opacity: saving ? 0.7 : 1 }}
            >
              {saving ? (
                "..."
              ) : (
                <>
                  <Check size={13} /> Sauvegarder
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-text-dark">
            {type === "date" && value
              ? new Date(value).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : value || "—"}
          </span>
          {saved && (
            <span
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "var(--color-sage-dark)" }}
            >
              <Check size={12} /> Sauvegardé
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Section mot de passe ── */
function PasswordSection() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ actuel: "", nouveau: "", confirm: "" });
  const [show, setShow] = useState({
    actuel: false,
    nouveau: false,
    confirm: false,
  });
  const [focused, setFocused] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!form.actuel || !form.nouveau || !form.confirm) {
      setError("Remplis tous les champs.");
      return;
    }
    if (form.nouveau.length < 8) {
      setError("Le nouveau mot de passe doit faire au moins 8 caractères.");
      return;
    }
    if (form.nouveau !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSaving(true);
    setError("");

    const response = await fetch("/api/user/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actuel: form.actuel, nouveau: form.nouveau }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Une erreur est survenue.");
    } else {
      setSuccess(true);
      setOpen(false);
      setForm({ actuel: "", nouveau: "", confirm: "" });
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  };

  const pwFields = [
    { key: "actuel", label: "Mot de passe actuel" },
    { key: "nouveau", label: "Nouveau mot de passe" },
    { key: "confirm", label: "Confirmer le nouveau" },
  ];

  return (
    <div
      className="bg-white rounded-2xl border border-sand p-5"
      style={{ boxShadow: "0 2px 12px rgba(180,110,110,0.06)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold text-text-mid uppercase tracking-widest flex items-center gap-1.5">
          <Lock size={12} color="var(--color-rose)" /> Mot de passe
        </label>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border-none cursor-pointer"
          style={{
            background: "var(--color-blush)",
            color: "var(--color-rose)",
          }}
        >
          <Pencil size={11} /> Modifier
        </button>
      </div>

      {!open ? (
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-text-dark tracking-widest">
            ••••••••
          </span>
          {success && (
            <span
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "var(--color-sage-dark)" }}
            >
              <Check size={12} /> Modifié avec succès
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-2">
          {pwFields.map((f) => (
            <div key={f.key}>
              <label className="text-xs text-text-light mb-1 block">
                {f.label}
              </label>
              <div
                className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200"
                style={{
                  borderColor:
                    focused === f.key
                      ? "var(--color-rose)"
                      : "var(--color-sand)",
                  background:
                    focused === f.key
                      ? "var(--color-blush)"
                      : "var(--color-cream)",
                  boxShadow:
                    focused === f.key
                      ? "0 0 0 3px rgba(212,120,122,0.12)"
                      : "none",
                }}
              >
                <input
                  type={show[f.key] ? "text" : "password"}
                  placeholder="••••••••"
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                  onFocus={() => setFocused(f.key)}
                  onBlur={() => setFocused("")}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-text-dark font-sans placeholder:text-text-light"
                />
                <button
                  type="button"
                  onClick={() => setShow({ ...show, [f.key]: !show[f.key] })}
                  className="border-none bg-transparent cursor-pointer p-0 flex items-center"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {show[f.key] ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}

          {error && (
            <p
              className="text-xs font-medium px-3 py-2 rounded-xl"
              style={{ background: "#fde8e8", color: "#c0392b" }}
            >
              {error}
            </p>
          )}

          <div className="flex gap-2 mt-1">
            <button
              onClick={() => {
                setOpen(false);
                setError("");
                setForm({ actuel: "", nouveau: "", confirm: "" });
              }}
              className="btn-outline py-2! px-4! text-xs! flex-1 justify-center"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary py-2! px-4! text-xs! flex-1 justify-center"
              style={{ opacity: saving ? 0.7 : 1 }}
            >
              {saving ? (
                "Mise à jour..."
              ) : (
                <>
                  <Check size={13} /> Mettre à jour
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Suppression du compte ── */
function DeleteSection({ onDelete }) {
  const [confirm, setConfirm] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
  };

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "#fff8f8",
        borderColor: "#f5c6c6",
        boxShadow: "0 2px 12px rgba(180,110,110,0.06)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "#fde8e8" }}
        >
          <Trash2 size={16} color="#c0392b" />
        </div>
        <div>
          <h3
            className="font-serif text-base font-semibold"
            style={{ color: "#c0392b" }}
          >
            Supprimer mon compte
          </h3>
          <p className="text-xs text-text-light">
            Cette action est irréversible
          </p>
        </div>
      </div>

      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="text-xs font-semibold px-4 py-2 rounded-full border-none cursor-pointer"
          style={{ background: "#fde8e8", color: "#c0392b" }}
        >
          Supprimer mon compte
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-text-mid">
            Tape <strong>SUPPRIMER</strong> pour confirmer. Toutes tes données
            seront effacées définitivement.
          </p>
          <input
            type="text"
            placeholder="SUPPRIMER"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-sm font-sans outline-none"
            style={{ borderColor: "#f5c6c6", background: "white" }}
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setConfirm(false);
                setInput("");
              }}
              className="btn-outline py-2! px-4! text-xs! flex-1 justify-center"
            >
              Annuler
            </button>
            <button
              onClick={handleDelete}
              disabled={input !== "SUPPRIMER" || loading}
              className="text-xs font-semibold px-4 py-2 rounded-full flex-1 border-none cursor-pointer transition-all duration-200"
              style={{
                background: input === "SUPPRIMER" ? "#c0392b" : "#f5c6c6",
                color: "white",
                cursor: input === "SUPPRIMER" ? "pointer" : "not-allowed",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Suppression..." : "Confirmer la suppression"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Page principale ── */
export default function ProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charge les données utilisateur
  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Sauvegarde un champ — retourne le message d'erreur ou null si succès
  const handleSaveField = async (field, value) => {
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    const result = await response.json();
    if (!response.ok) return result.error || "Une erreur est survenue.";
    // Met à jour localement
    setUser((prev) => ({ ...prev, [field]: value }));
    return null;
  };

  // Supprime le compte
  const handleDelete = async () => {
    const response = await fetch("/api/user", { method: "DELETE" });
    if (response.ok) {
      router.push("/");
    }
  };

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

  if (!user) return null;

  // Formate la DPA pour l'input date
  const dpaFormatted = user.dpa
    ? new Date(user.dpa).toISOString().split("T")[0]
    : "";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">
          Mon profil
        </h1>
        <p className="text-text-light mt-1">
          Gère tes informations personnelles
        </p>
      </div>

      {/* Avatar + résumé */}
      <div
        className="rounded-3xl p-6 mb-6 flex items-center gap-5"
        style={{
          background:
            "linear-gradient(135deg, var(--color-blush) 0%, var(--color-cream-warm) 100%)",
          border: "1px solid var(--color-sand)",
          boxShadow: "0 4px 24px rgba(180,110,110,0.10)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shrink-0 border-4 border-white"
          style={{
            background: "var(--color-rose)",
            boxShadow: "0 4px 16px rgba(212,120,122,0.3)",
          }}
        >
          🤰
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-text-dark">
            {user.prenom}
          </h2>
          <p className="text-sm text-text-mid mt-0.5">{user.email}</p>
          <div className="flex gap-3 mt-2 flex-wrap">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "var(--color-rose)", color: "white" }}
            >
              Semaine {user.semaine}
            </span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "white",
                color: "var(--color-text-mid)",
                border: "1px solid var(--color-sand)",
              }}
            >
              Membre depuis{" "}
              {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Informations personnelles */}
      <h2 className="font-serif text-lg font-semibold text-text-dark mb-4">
        Informations personnelles
      </h2>
      <div className="flex flex-col gap-3 mb-8">
        <EditableField
          label="Prénom"
          icon={User}
          value={user.prenom}
          onSave={(val) => handleSaveField("prenom", val)}
        />
        <EditableField
          label="Adresse e-mail"
          icon={Mail}
          value={user.email}
          type="email"
          onSave={(val) => handleSaveField("email", val)}
        />
        <EditableField
          label="Date Prévue d'Accouchement (DPA)"
          icon={Calendar}
          value={dpaFormatted}
          type="date"
          hint="Modifier ta DPA recalculera automatiquement ta semaine de grossesse."
          onSave={(val) => handleSaveField("dpa", val)}
        />
      </div>

      {/* Sécurité */}
      <h2 className="font-serif text-lg font-semibold text-text-dark mb-4">
        Sécurité
      </h2>
      <div className="mb-8">
        <PasswordSection />
      </div>

      {/* Zone danger - supprimer compte */}
      <h2
        className="font-serif text-lg font-semibold mb-4"
        style={{ color: "#c0392b" }}
      >
        Zone danger
      </h2>
      <DeleteSection onDelete={handleDelete} />
    </div>
  );
}
