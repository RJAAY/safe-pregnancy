"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  LineChart,
  CalendarDays,
  Lightbulb,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mon suivi", href: "/dashboard/suivi", icon: LineChart },
  { label: "Rendez-vous", href: "/dashboard/rendez-vous", icon: CalendarDays },
  { label: "Conseils", href: "/dashboard/conseils", icon: Lightbulb },
  { label: "Mon profil", href: "/dashboard/profil", icon: UserCircle },
];

function NavItem({ link, active, onClick }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 no-underline"
      style={{
        background: active ? "var(--color-rose)" : "transparent",
        color: active ? "white" : "var(--color-text-mid)",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "var(--color-blush)";
          e.currentTarget.style.color = "var(--color-rose)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--color-text-mid)";
        }
      }}
    >
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: active ? "rgba(255,255,255,0.2)" : "var(--color-cream)",
        }}
      >
        <Icon size={18} color={active ? "white" : "var(--color-rose)"} />
      </span>
      <span className="font-sans text-sm font-semibold">{link.label}</span>
      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />
      )}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState(null);

  // Récupère les vraies données utilisateur au chargement
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setUser(data);
      })
      .catch((err) => console.error("Erreur chargement user:", err));
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  // Affichage pendant le chargement
  const prenom = user?.prenom || "...";
  const semaine = user?.semaine || "-";
  const trimestre = user?.trimestre || "-";
  const daysLeft = user?.daysLeft || "-";
  const progression = user?.semaine ? Math.round((user.semaine / 40) * 100) : 0;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-sand">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 no-underline"
        >
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, var(--color-rose), var(--color-blush-deep))",
              boxShadow: "0 4px 12px rgba(212,120,122,0.3)",
            }}
          >
            <Heart size={16} fill="white" color="white" />
          </span>
          <span className="font-serif text-lg font-semibold text-text-dark">
            Safe<span className="text-rose">Pregnancy</span>
          </span>
        </Link>
      </div>

      {/* Bonjour */}
      <div className="px-6 py-5">
        <p className="text-xs text-text-light font-medium mb-0.5">Bienvenue,</p>
        <p className="font-serif text-lg font-bold text-text-dark">
          {prenom} 👋
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 flex flex-col gap-1">
        {navLinks.map((link) => (
          <NavItem
            key={link.href}
            link={link}
            active={pathname === link.href}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Carte grossesse */}
      <div className="px-4 pb-4">
        <div
          className="rounded-2xl p-4 border border-sand mb-2"
          style={{
            background:
              "linear-gradient(135deg, var(--color-blush) 0%, var(--color-cream-warm) 100%)",
          }}
        >
          <p className="text-xs text-text-light font-semibold uppercase tracking-widest mb-3">
            🤰 Ta grossesse
          </p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white rounded-xl p-2.5 text-center border border-sand">
              <div className="font-serif text-xl font-bold text-rose">
                {semaine !== "-" ? `S${semaine}` : "-"}
              </div>
              <div className="text-xs text-text-light">semaine</div>
            </div>
            <div className="bg-white rounded-xl p-2.5 text-center border border-sand">
              <div className="font-serif text-xl font-bold text-rose">
                {trimestre !== "-" ? `T${trimestre}` : "-"}
              </div>
              <div className="text-xs text-text-light">trimestre</div>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-xs text-text-light mb-1">
              <span>Progression</span>
              <span className="font-semibold text-rose">{progression}%</span>
            </div>
            <div className="w-full h-1.5 bg-sand rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progression}%`,
                  background:
                    "linear-gradient(90deg, var(--color-rose), var(--color-rose-dark))",
                }}
              />
            </div>
          </div>
          <p className="text-xs text-text-light text-center">
            <span className="font-bold text-rose">{daysLeft}</span>
            {daysLeft !== "-" ? " jours avant la DPA" : ""}
          </p>
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 border-none cursor-pointer"
          style={{
            background: "transparent",
            color: "var(--color-text-light)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fde8e8";
            e.currentTarget.style.color = "var(--color-rose-dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--color-text-light)";
          }}
        >
          <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-cream">
            <LogOut size={18} color="var(--color-rose)" />
          </span>
          <span className="font-sans text-sm font-semibold">
            {loggingOut ? "Déconnexion..." : "Déconnexion"}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className="fixed top-0 left-0 h-screen w-64 border-r border-sand z-40 overflow-y-auto max-lg:hidden"
        style={{ background: "var(--color-cream)" }}
      >
        <SidebarContent />
      </aside>

      {/* Burger mobile */}
      <button
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center border-none cursor-pointer lg:hidden"
        style={{
          background: "var(--color-blush)",
          color: "var(--color-rose-dark)",
        }}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            background: "rgba(61,44,44,0.3)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      <aside
        className="fixed top-0 left-0 h-screen w-72 z-50 overflow-y-auto border-r border-sand transition-transform duration-300 lg:hidden"
        style={{
          background: "var(--color-cream)",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
