import { Link } from "@tanstack/react-router";
import { useRef, type PointerEvent } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { playSpark } from "@/lib/audio";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  onQuick,
}: {
  product: Product;
  onQuick?: (p: Product) => void;
}) {
  const card = useRef<HTMLElement>(null);
  const add = useCart((s) => s.add);

  const tilt = (e: PointerEvent) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (card.current) card.current.style.transform = "";
  };

  return (
    <article
      ref={card}
      onPointerMove={tilt}
      onPointerLeave={reset}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 will-change-transform hover:shadow-[var(--shadow-neon)]"
    >
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative aspect-[3/4] overflow-hidden bg-raised"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-void/70 px-2.5 py-1 font-display text-[10px] tracking-[0.22em] text-neon backdrop-blur-sm">
          {product.lineLabel}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl tracking-[0.08em]">{product.name}</h3>
            <p className="mt-1 text-xs text-fog">{product.flavour}</p>
          </div>
          <span className="font-display text-xs tracking-[0.16em] text-dim">
            {product.weight}
          </span>
        </div>

        <div>
          <div className="mb-1 flex justify-between font-display text-[10px] tracking-[0.2em] text-dim">
            <span>Voltage</span>
            <span className="tabular-nums text-neon">{product.voltage}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-raised">
            <div
              className="h-full rounded-full bg-neon"
              style={{ width: `${product.voltage}%` }}
            />
          </div>
        </div>

        <div className="mt-auto flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              playSpark();
              add(product.slug);
            }}
            className={cn(
              "min-h-11 flex-1 rounded-md bg-neon font-display text-[12px] tracking-[0.18em] text-void",
              "transition-transform duration-150 active:scale-[0.96]",
            )}
          >
            Plug in
          </button>
          {onQuick ? (
            <button
              type="button"
              onClick={() => onQuick(product)}
              className="min-h-11 rounded-md border border-line px-3 font-display text-[12px] tracking-[0.16em] text-fog hover:border-neon hover:text-neon"
            >
              View
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
