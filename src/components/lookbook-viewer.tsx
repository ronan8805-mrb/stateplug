import { useRef, useState, type PointerEvent } from "react";
import { lookbookProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

export function LookbookViewer() {
  const items = lookbookProducts();
  const [i, setI] = useState(0);
  const [plugged, setPlugged] = useState(true);
  const rot = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; r: number } | null>(null);
  const p = items[i];

  const onDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, r: rot.current };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!drag.current || !stage.current) return;
    rot.current = drag.current.r + (e.clientX - drag.current.x) * 0.45;
    stage.current.style.transform = `rotateY(${rot.current}deg)`;
  };
  const onUp = () => {
    drag.current = null;
  };

  if (!p) return null;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div
          className="relative mx-auto aspect-square max-w-lg cursor-grab touch-none active:cursor-grabbing"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={stage}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            className={cn(
              "absolute inset-0 transition-[filter,opacity,transform] duration-500",
              plugged ? "opacity-100" : "opacity-40 blur-[2px]",
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-full w-full rounded-xl object-cover shadow-[var(--shadow-neon)]"
              draggable={false}
            />
          </div>
          <div className="pointer-events-none absolute inset-x-8 -bottom-2 h-10 rounded-[100%] bg-neon/15 blur-2xl" />
        </div>
        <p className="mt-5 text-center text-xs tracking-[0.22em] text-dim uppercase">
          Drag to rotate · Unplug to inspect
        </p>
      </div>

      <div className="lg:col-span-5">
        <p className="font-display text-[11px] tracking-[0.3em] text-neon">
          {p.lineLabel}
        </p>
        <h2 className="mt-2 text-4xl tracking-[0.08em] sm:text-5xl">{p.name}</h2>
        <p className="mt-3 text-fog">{p.tagline}</p>
        <p className="mt-2 text-sm text-fg">{p.flavour}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPlugged((v) => !v)}
            className="min-h-11 rounded-full bg-neon px-5 font-display text-xs tracking-[0.18em] text-void"
          >
            {plugged ? "Unplug" : "Plug in"}
          </button>
          <button
            type="button"
            onClick={() => {
              setI((n) => (n - 1 + items.length) % items.length);
              rot.current = 0;
              if (stage.current) stage.current.style.transform = "rotateY(0deg)";
            }}
            className="min-h-11 rounded-full border border-line px-4 font-display text-xs tracking-[0.16em] text-fog"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => {
              setI((n) => (n + 1) % items.length);
              rot.current = 0;
              if (stage.current) stage.current.style.transform = "rotateY(0deg)";
            }}
            className="min-h-11 rounded-full border border-line px-4 font-display text-xs tracking-[0.16em] text-fog"
          >
            Next
          </button>
        </div>

        <ul className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {items.map((item, idx) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => {
                setI(idx);
                setPlugged(true);
                rot.current = 0;
                if (stage.current) stage.current.style.transform = "rotateY(0deg)";
              }}
              className={cn(
                "overflow-hidden rounded-md border",
                idx === i ? "border-neon" : "border-line",
              )}
              aria-label={item.name}
            >
              <img src={item.image} alt="" className="aspect-square object-cover" />
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
