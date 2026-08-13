import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { getProduct } from "@/lib/products";

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, clear } = useCart();
  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close bag"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-void/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-storm transition-transform duration-300 ease-[var(--ease-out)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Connect bag"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="font-display text-[11px] tracking-[0.3em] text-neon">
              Connect bag
            </p>
            <h2 className="mt-1 font-display text-2xl tracking-[0.08em]">
              {count} plugged
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center text-fog hover:text-fg"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-16 text-center text-sm text-fog">
              Nothing plugged in yet. Find a flavour and make the connection.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => {
                const p = getProduct(it.slug);
                if (!p) return null;
                return (
                  <li key={it.slug} className="flex gap-3">
                    <img
                      src={p.image}
                      alt=""
                      className="size-20 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-display tracking-[0.08em]">{p.name}</p>
                      <p className="text-xs text-fog">{p.lineLabel}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="grid size-8 place-items-center rounded-sm border border-line"
                          onClick={() => setQty(it.slug, it.qty - 1)}
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="w-6 text-center tabular-nums text-sm">
                          {it.qty}
                        </span>
                        <button
                          type="button"
                          className="grid size-8 place-items-center rounded-sm border border-line"
                          onClick={() => setQty(it.slug, it.qty + 1)}
                          aria-label="Increase"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(it.slug)}
                          className="ml-auto text-xs text-dim underline-offset-2 hover:text-fog hover:underline"
                        >
                          Unplug
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-line p-5">
          <p className="mb-3 text-xs text-fog">
            STATE PLUG ships through licensed retailers only. Request a connect
            and we'll route you to a live plug.
          </p>
          <div className="flex gap-2">
            <Link
              to="/find"
              onClick={() => setOpen(false)}
              className="flex min-h-12 flex-1 items-center justify-center rounded-md bg-neon font-display tracking-[0.16em] text-void"
            >
              Request a connect
            </Link>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="min-h-12 rounded-md border border-line px-4 font-display text-xs tracking-[0.16em] text-fog"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
