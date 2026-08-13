import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductModal } from "@/components/product-modal";
import { products, type Product, type ProductLine } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({
    meta: [{ title: "Shop Exotic Flavours — STATE PLUG" }],
  }),
});

function Shop() {
  const [line, setLine] = useState<"all" | ProductLine>("all");
  const [quick, setQuick] = useState<Product | null>(null);
  const list = useMemo(
    () => (line === "all" ? products : products.filter((p) => p.line === line)),
    [line],
  );

  return (
    <div className="px-5 pt-36 pb-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-[11px] tracking-[0.32em] text-neon">
          The menu
        </p>
        <h1 className="mt-2 text-4xl tracking-[0.08em] sm:text-6xl">
          Exotic flavours
        </h1>
        <p className="mt-4 max-w-xl text-fog">
          1LB bags and the parody packs that rewired the culture. Plug in to
          request a licensed connect.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              ["all", "All current"],
              ["flower", "1LB Flower"],
              ["parody", "Parody Packs"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setLine(id)}
              className={cn(
                "min-h-11 rounded-full px-4 font-display text-xs tracking-[0.18em]",
                line === id
                  ? "bg-neon text-void"
                  : "border border-line text-fog hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} onQuick={setQuick} />
          ))}
        </div>
      </div>
      <ProductModal product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
