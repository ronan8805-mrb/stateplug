import { useEffect, useRef, useState, type ReactNode } from "react";
import { readAgeVerified, writeAgeVerified } from "@/lib/age";
import { playStrike } from "@/lib/audio";
import { StormCanvas } from "@/components/storm-canvas";

type Phase = "boot" | "plug" | "confirm" | "denied" | "live";

export function AgeGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("boot");
  const [flash, setFlash] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const plugRef = useRef<HTMLButtonElement>(null);
  const socketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPhase(readAgeVerified() ? "live" : "plug");
  }, []);

  const connect = () => {
    playStrike();
    setFlash(true);
    setPos({ x: 0, y: 86 });
    window.setTimeout(() => {
      setFlash(false);
      setPhase("confirm");
    }, 520);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (phase !== "plug") return;
    dragging.current = true;
    origin.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - origin.current.x, y: e.clientY - origin.current.y });
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const plug = plugRef.current?.getBoundingClientRect();
    const sock = socketRef.current?.getBoundingClientRect();
    if (plug && sock) {
      const cx = plug.left + plug.width / 2;
      const cy = plug.top + plug.height / 2;
      const sx = sock.left + sock.width / 2;
      const sy = sock.top + sock.height / 2;
      const dist = Math.hypot(cx - sx, cy - sy);
      if (dist < 110) {
        connect();
        return;
      }
    }
    setPos({ x: 0, y: 0 });
  };

  const pass = () => {
    writeAgeVerified();
    playStrike();
    setFlash(true);
    window.setTimeout(() => {
      setFlash(false);
      setPhase("live");
    }, 380);
  };

  if (phase === "boot") {
    return <div className="min-h-dvh bg-void" aria-busy="true" />;
  }

  if (phase === "live") return <>{children}</>;

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-void text-fg">
      <img
        src="/hero-storm.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-bg/70 to-void" />
      <StormCanvas intensity={1.4} />

      {flash ? (
        <div className="pointer-events-none absolute inset-0 z-20 bg-neon/40 mix-blend-screen" />
      ) : null}

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 py-10">
        <p className="mb-6 font-display text-[11px] tracking-[0.42em] text-neon">
          21+ · CALIFORNIA ENERGY
        </p>

        {phase === "plug" ? (
          <>
            <button
              ref={plugRef}
              type="button"
              aria-label="Drag the logo into the socket to enter"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="relative touch-none select-none"
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                transition: dragging.current ? "none" : "transform 420ms var(--ease-out)",
              }}
            >
              <span className="aura absolute inset-[-18%] rounded-full bg-neon/25" />
              <img
                src="/logo.webp"
                alt="STATE PLUG"
                width={280}
                height={292}
                className="relative z-10 w-[210px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] sm:w-[260px]"
                draggable={false}
              />
            </button>

            <h1 className="mt-8 text-center font-display text-4xl tracking-[0.14em] glow-text sm:text-6xl">
              Plug in to enter
            </h1>
            <p className="mt-3 max-w-sm text-center text-sm text-fog">
              Drag the mark into the socket — or tap connect. This current is
              reserved for adults 21 and over.
            </p>

            <div
              ref={socketRef}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <div className="glow-box relative grid h-20 w-28 place-items-center rounded-[22px] bg-raised">
                <div className="flex gap-4">
                  <span className="h-9 w-3.5 rounded-full bg-void shadow-[inset_0_0_8px_#39ff14]" />
                  <span className="h-9 w-3.5 rounded-full bg-void shadow-[inset_0_0_8px_#39ff14]" />
                </div>
                <span className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-neon/40" />
              </div>
              <span className="font-display text-[10px] tracking-[0.38em] text-dim">
                SOCKET
              </span>
            </div>

            <button
              type="button"
              onClick={connect}
              className="mt-8 min-h-12 rounded-full bg-neon px-8 font-display text-sm tracking-[0.22em] text-void transition-transform duration-150 active:scale-[0.96]"
            >
              Connect
            </button>
          </>
        ) : null}

        {phase === "confirm" ? (
          <div className="w-full max-w-md rounded-xl bg-surface/90 p-7 shadow-[var(--shadow-neon)] backdrop-blur-md">
            <p className="font-display text-[11px] tracking-[0.36em] text-neon">
              Confirm your frequency
            </p>
            <h2 className="mt-3 text-3xl tracking-[0.08em]">Are you 21 or older?</h2>
            <p className="mt-3 text-sm text-fog">
              Cannabis products are for adults 21+. By entering you confirm you
              meet the legal age in your jurisdiction.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={pass}
                className="min-h-12 rounded-md bg-neon font-display tracking-[0.18em] text-void transition-transform duration-150 active:scale-[0.96]"
              >
                I am 21+
              </button>
              <button
                type="button"
                onClick={() => setPhase("denied")}
                className="min-h-12 rounded-md border border-line font-display tracking-[0.18em] text-fog transition-colors hover:border-line-strong"
              >
                Exit
              </button>
            </div>
          </div>
        ) : null}

        {phase === "denied" ? (
          <div className="max-w-md text-center">
            <h2 className="text-4xl tracking-[0.1em]">Come back charged</h2>
            <p className="mt-4 text-fog">
              STATE PLUG is an adults-only experience. See you at 21.
            </p>
          </div>
        ) : null}

        <p className="mt-12 max-w-lg text-center text-[11px] leading-relaxed text-dim">
          GOVERNMENT WARNING: THIS PRODUCT CONTAINS CANNABIS. KEEP OUT OF REACH
          OF CHILDREN AND ANIMALS. FOR USE ONLY BY ADULTS 21 YEARS OF AGE AND
          OLDER.
        </p>
      </div>
    </div>
  );
}
