import { X } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { playSpark } from "@/lib/audio";
import { Link } from "@tanstack/react-router";

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const add = useCart((s) => s.add);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close quick view"
        className="absolute inset-0 bg-void/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative grid max-h-[92dvh] w-full max-w-3xl overflow-hidden rounded-t-xl bg-storm shadow-[var(--shadow-neon)] sm:grid-cols-2 sm:rounded-xl"
      >
        <img
          src={product.image}
          alt=""
          className="h-56 w-full object-cover sm:h-full"
        />
        <div className="flex flex-col p-5 sm:p-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 grid size-11 place-items-center text-fog"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          <p className="font-display text-[11px] tracking-[0.28em] text-neon">
            {product.lineLabel}
          </p>
          <h2 className="mt-2 text-3xl tracking-[0.08em]">{product.name}</h2>
          <p className="mt-2 text-sm text-fog">{product.tagline}</p>
          <p className="mt-4 text-sm text-fg">{product.flavour}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-fog">
            {product.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <div className="mt-5">
            <div className="mb-1 flex justify-between font-display text-[10px] tracking-[0.2em] text-dim">
              <span>Voltage</span>
              <span className="tabular-nums text-neon">{product.voltage}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-raised">
              <div
                className="h-full bg-neon"
                style={{ width: `${product.voltage}%` }}
              />
            </div>
          </div>
          <div className="mt-auto flex gap-2 pt-6">
            <button
              type="button"
              onClick={() => {
                playSpark();
                add(product.slug);
                onClose();
              }}
              className="min-h-12 flex-1 rounded-md bg-neon font-display tracking-[0.16em] text-void active:scale-[0.96]"
            >
              Plug in
            </button>
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              onClick={onClose}
              className="inline-flex min-h-12 items-center rounded-md border border-line px-4 font-display text-xs tracking-[0.16em] text-fog"
            >
              Full file
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
