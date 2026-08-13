import { useState } from "react";
import { cities, statusLabel, type City } from "@/lib/cities";
import { cn } from "@/lib/utils";

export function CityMap({
  onPick,
}: {
  onPick?: (city: City) => void;
}) {
  const [active, setActive] = useState<string>("la");
  const current = cities.find((c) => c.id === active) ?? cities[0];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="relative overflow-hidden rounded-xl bg-surface lg:col-span-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_45%,rgba(57,255,20,0.08),transparent_28%),radial-gradient(circle_at_80%_40%,rgba(158,246,255,0.05),transparent_24%)]" />
        <svg viewBox="0 0 100 70" className="relative h-auto w-full" role="img" aria-label="Global STATE PLUG map">
          <rect width="100" height="70" fill="transparent" />
          <path
            d="M8 22 C18 14, 28 16, 34 24 C40 18, 48 20, 54 16 C62 12, 70 18, 78 20 C86 22, 92 28, 94 36 C90 44, 82 48, 74 50 C64 54, 54 52, 46 56 C36 60, 26 54, 18 50 C12 46, 6 38, 8 22 Z"
            fill="none"
            stroke="rgba(57,255,20,0.18)"
            strokeWidth="0.35"
          />
          {cities.map((c) => (
            <g key={c.id}>
              <circle
                cx={c.x}
                cy={c.y}
                r={active === c.id ? 1.8 : 1.15}
                fill={c.status === "incoming" ? "transparent" : "#39FF14"}
                stroke="#39FF14"
                strokeWidth="0.35"
                className="cursor-pointer"
                onClick={() => {
                  setActive(c.id);
                  onPick?.(c);
                }}
              />
              {active === c.id ? (
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="3.4"
                  fill="none"
                  stroke="rgba(57,255,20,0.55)"
                  strokeWidth="0.25"
                />
              ) : null}
            </g>
          ))}
        </svg>
      </div>

      <div className="lg:col-span-4">
        <p className="font-display text-[11px] tracking-[0.3em] text-neon">
          {statusLabel[current.status]}
        </p>
        <h3 className="mt-2 text-3xl tracking-[0.08em]">{current.name}</h3>
        <p className="mt-1 text-sm text-dim">{current.region}</p>
        <p className="mt-4 text-sm text-fog">{current.blurb}</p>
        <ul className="mt-6 space-y-1">
          {cities.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => {
                  setActive(c.id);
                  onPick?.(c);
                }}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm",
                  active === c.id ? "bg-raised text-neon" : "text-fog hover:text-fg",
                )}
              >
                <span>{c.name}</span>
                <span className="font-display text-[10px] tracking-[0.16em] text-dim">
                  {statusLabel[c.status]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
