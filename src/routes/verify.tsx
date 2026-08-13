import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { StormCanvas } from "@/components/storm-canvas";
import { getProduct } from "@/lib/products";
import { playSpark } from "@/lib/audio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export const Route = createFileRoute("/verify")({
  validateSearch: (search: Record<string, unknown>) => ({
    p: typeof search.p === "string" ? search.p : undefined,
  }),
  component: Verify,
  head: () => ({
    meta: [
      { title: "Authentic — STATE PLUG" },
      {
        name: "description",
        content:
          "This product is AUTHENTIC. Stay Charged. Official STATE PLUG packaging seal.",
      },
    ],
  }),
});

type Phase = "scan" | "charge" | "lock";

function Verify() {
  const { p } = Route.useSearch();
  const product = p ? getProduct(p) : undefined;
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "lock" : "scan");

  useEffect(() => {
    if (reduced) {
      setPhase("lock");
      return;
    }
    const a = window.setTimeout(() => setPhase("charge"), 900);
    const b = window.setTimeout(() => {
      setPhase("lock");
      playSpark();
    }, 2200);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [reduced]);

  return (
    <section className="relative isolate min-h-dvh overflow-hidden">
      <StormCanvas intensity={1.35} className="absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-void)_78%)]"
        aria-hidden="true"
      />
      {phase === "lock" ? (
        <div className="verify-flash pointer-events-none absolute inset-0 bg-neon" />
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-5 pt-24 pb-16 text-center sm:px-6">
        <p className="font-display text-[11px] tracking-[0.36em] text-neon">
          Packaging authentication
        </p>

        <img
          src="/logo.webp"
          alt="STATE PLUG"
          className="mt-5 h-20 w-auto sm:h-24"
        />

        {phase !== "lock" ? (
          <div className="mt-14 w-full max-w-xs" aria-live="polite">
            <p className="font-display text-sm tracking-[0.28em] text-fog">
              {phase === "scan" ? "Reading seal…" : "Charging current…"}
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-raised">
              <div
                className={
                  phase === "charge" ? "h-full bg-neon verify-charge" : "h-full w-1/5 bg-neon"
                }
              />
            </div>
          </div>
        ) : (
          <div className="verify-seal mt-10 flex w-full flex-col items-center">
            <Seal />

            <p className="mt-10 font-display text-sm tracking-[0.32em] text-fog sm:text-base">
              This product is
            </p>
            <h1 className="mt-2 text-6xl tracking-[0.08em] text-neon glow-text sm:text-8xl">
              Authentic
            </h1>
            <p className="mt-5 font-display text-2xl tracking-[0.22em] text-fg sm:text-3xl">
              Stay Charged.
            </p>

            {product ? (
              <div className="mt-8 flex items-center gap-3 rounded-lg border border-line bg-surface/80 px-4 py-3 text-left">
                <img
                  src={product.image}
                  alt=""
                  className="size-14 rounded-md object-cover"
                />
                <div>
                  <p className="font-display tracking-[0.14em]">{product.name}</p>
                  <p className="text-xs tracking-[0.16em] text-dim uppercase">
                    {product.lineLabel} · {product.weight}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-6 max-w-sm text-sm text-fog">
                Official STATE PLUG packaging. Los Angeles based. Globally
                recognized. The only plug you need.
              </p>
            )}

            <p className="mt-6 font-display text-[11px] tracking-[0.28em] text-dim">
              Los Angeles · 21+ · Licensed channel
            </p>

            <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/shop"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-neon px-8 font-display tracking-[0.18em] text-void"
              >
                Shop the drop
              </Link>
              <Link
                to="/find"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-line px-8 font-display tracking-[0.16em] text-fog"
              >
                Find your plug
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Seal() {
  return (
    <div className="relative grid size-40 place-items-center sm:size-44">
      <div className="aura absolute inset-3 rounded-full bg-neon/20" />
      <svg
        viewBox="0 0 160 160"
        className="absolute inset-0 text-neon"
        aria-hidden="true"
      >
        <circle
          cx="80"
          cy="80"
          r="74"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.85"
        />
        <circle
          cx="80"
          cy="80"
          r="66"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="3 5"
          opacity="0.55"
        />
        <text
          className="origin-center animate-[spin-slow_18s_linear_infinite]"
          fill="currentColor"
          fontSize="9.2"
          fontFamily="Oswald, sans-serif"
          letterSpacing="3.4"
        >
          <textPath href="#seal-ring" startOffset="0%">
            STATE PLUG · AUTHENTIC · STAY CHARGED ·
          </textPath>
        </text>
        <defs>
          <path
            id="seal-ring"
            d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
          />
        </defs>
      </svg>
      <ShieldCheck className="relative size-12 text-neon" strokeWidth={1.6} />
    </div>
  );
}
