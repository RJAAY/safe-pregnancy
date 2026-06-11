"use client";
import { useEffect, useState } from "react";

/* ── Bébé SVG selon le trimestre ── */
function BabySVG({ trimestre, size }) {
  const scale = trimestre === 1 ? 0.7 : trimestre === 2 ? 0.85 : 1;
  const s = size * scale;

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "all 1s ease",
        filter: "drop-shadow(0 4px 12px rgba(212,120,122,0.2))",
      }}
    >
      {/* Corps */}
      <ellipse cx="40" cy="48" rx="16" ry="20" fill="var(--color-blush-mid)" />

      {/* Tête */}
      <circle cx="40" cy="26" r="14" fill="var(--color-blush-mid)" />

      {/* Oreilles */}
      <circle cx="26" cy="27" r="4" fill="var(--color-blush-deep)" />
      <circle cx="54" cy="27" r="4" fill="var(--color-blush-deep)" />

      {/* Yeux fermés */}
      <path
        d="M34 25 Q36 23 38 25"
        stroke="var(--color-rose-dark)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M42 25 Q44 23 46 25"
        stroke="var(--color-rose-dark)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Petit sourire */}
      <path
        d="M36 30 Q40 34 44 30"
        stroke="var(--color-rose)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Petites mains */}
      <circle cx="22" cy="46" r="5" fill="var(--color-blush-deep)" />
      <circle cx="58" cy="46" r="5" fill="var(--color-blush-deep)" />

      {/* Petits pieds */}
      <ellipse cx="32" cy="67" rx="7" ry="5" fill="var(--color-blush-deep)" />
      <ellipse cx="48" cy="67" rx="7" ry="5" fill="var(--color-blush-deep)" />

      {/* Nombril / cordon */}
      <circle cx="40" cy="50" r="2.5" fill="var(--color-rose)" opacity="0.5" />
    </svg>
  );
}

/* ── Cordon ombilical SVG animé ── */
function UmbilicalCord({ percent, size, trimestre }) {
  const [animPercent, setAnimPercent] = useState(0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 16;

  useEffect(() => {
    const timer = setTimeout(() => setAnimPercent(percent), 300);
    return () => clearTimeout(timer);
  }, [percent]);

  const generateCordPath = () => {
    const points = [];
    const totalPoints = 120;
    for (let i = 0; i <= totalPoints; i++) {
      const angle = (i / totalPoints) * 2 * Math.PI - Math.PI / 2;
      const wave = Math.sin(i * 0.6) * 6;
      const rx = r + wave;
      const ry = r + wave * 0.7;
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return points.join(" ");
  };

  const cordPath = generateCordPath();
  const cordLength = 2 * Math.PI * r * 1.15;
  const filledLength = (animPercent / 100) * cordLength;

  const cordColors = {
    1: { filled: "#F2C9C9", empty: "#F7F0E6", glow: "rgba(242,201,201,0.4)" },
    2: { filled: "#D4787A", empty: "#EAD9C6", glow: "rgba(212,120,122,0.4)" },
    3: { filled: "#B85C5E", empty: "#EAD9C6", glow: "rgba(184,92,94,0.5)" },
  };
  const colors = cordColors[trimestre] || cordColors[2];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle
        cx={cx}
        cy={cy}
        r={r + 20}
        fill="none"
        stroke="var(--color-cream-warm)"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.5"
      />

      <path
        d={cordPath}
        stroke={colors.empty}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      <path
        d={cordPath}
        stroke={colors.filled}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${filledLength} ${cordLength}`}
        style={{
          transition: "stroke-dasharray 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
          filter: `drop-shadow(0 0 6px ${colors.glow})`,
        }}
      />

      <circle
        cx={cx}
        cy={cy - r}
        r="5"
        fill={animPercent > 0 ? colors.filled : colors.empty}
        style={{ transition: "fill 0.5s ease" }}
      />

      {animPercent > 2 && (
        <circle
          cx={
            cx + r * Math.cos((animPercent / 100) * 2 * Math.PI - Math.PI / 2)
          }
          cy={
            cy + r * Math.sin((animPercent / 100) * 2 * Math.PI - Math.PI / 2)
          }
          r="5"
          fill={colors.filled}
          style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
        />
      )}
    </svg>
  );
}

/* ── Composant principal PregnancyRing ── */
export default function PregnancyRing({ semaine = 24, size = 280 }) {
  const percent = Math.min(Math.round((semaine / 40) * 100), 100);
  const trimestre = semaine <= 13 ? 1 : semaine <= 26 ? 2 : 3;
  const babySize = size * 0.38;
  const triLabel = ["", "1er trimestre", "2ème trimestre", "3ème trimestre"][
    trimestre
  ];
  const triColor = [
    "",
    "var(--color-blush-deep)",
    "var(--color-rose)",
    "var(--color-rose-dark)",
  ][trimestre];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: size * 0.58,
            height: size * 0.58,
            background:
              "linear-gradient(135deg, var(--color-blush) 0%, var(--color-cream-warm) 100%)",
            boxShadow:
              "0 8px 32px rgba(212,120,122,0.12), inset 0 2px 8px rgba(255,255,255,0.8)",
          }}
        />

        <div className="absolute inset-0">
          <UmbilicalCord percent={percent} size={size} trimestre={trimestre} />
        </div>

        <div
          className="absolute flex items-center justify-center"
          style={{ width: size * 0.58, height: size * 0.58 }}
        >
          <BabySVG trimestre={trimestre} size={babySize} />
        </div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="text-center">
            <div className="font-serif text-4xl font-bold text-rose leading-none">
              S{semaine}
            </div>
            <div className="text-xs text-text-light font-medium mt-0.5">
              semaine
            </div>
          </div>
          <div className="w-px h-10 bg-sand" />
          <div className="text-center">
            <div
              className="font-serif text-4xl font-bold leading-none"
              style={{ color: triColor }}
            >
              {percent}%
            </div>
            <div className="text-xs text-text-light font-medium mt-0.5">
              complété
            </div>
          </div>
        </div>

        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: "var(--color-blush)", color: triColor }}
        >
          🌸 {triLabel}
        </span>

        <p className="text-xs text-text-light mt-2">
          {semaine * 7} jours · encore {40 - semaine} semaines
        </p>
      </div>
    </div>
  );
}
