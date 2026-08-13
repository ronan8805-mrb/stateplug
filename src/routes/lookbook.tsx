import { createFileRoute } from "@tanstack/react-router";
import { LookbookViewer } from "@/components/lookbook-viewer";
import { lookbookProducts } from "@/lib/products";

export const Route = createFileRoute("/lookbook")({
  component: Lookbook,
  head: () => ({
    meta: [{ title: "Lookbook — STATE PLUG" }],
  }),
});

function Lookbook() {
  const items = lookbookProducts();
  return (
    <div className="px-5 pt-36 pb-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-[11px] tracking-[0.32em] text-neon">
          Lookbook
        </p>
        <h1 className="mt-2 max-w-2xl text-4xl tracking-[0.08em] sm:text-6xl">
          Packaging that hits different
        </h1>
        <p className="mt-4 max-w-xl text-fog">
          Rotate the drop. Unplug it. Plug it back in. This is the physical
          lightning bag art — alive.
        </p>
        <div className="mt-14">
          <LookbookViewer />
        </div>
        <div className="mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <figure key={p.slug} className="overflow-hidden rounded-xl bg-surface">
              <img src={p.image} alt={p.name} className="aspect-[3/4] w-full object-cover" />
              <figcaption className="flex items-center justify-between px-4 py-3">
                <span className="font-display tracking-[0.1em]">{p.name}</span>
                <span className="text-[11px] tracking-[0.16em] text-dim uppercase">
                  {p.lineLabel}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
