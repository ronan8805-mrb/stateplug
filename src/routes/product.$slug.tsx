import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { playSpark } from "@/lib/audio";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.product.name} — STATE PLUG`
          : "STATE PLUG",
      },
    ],
  }),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const more = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="px-5 pt-36 pb-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-raised">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-display text-[11px] tracking-[0.32em] text-neon">
            {product.lineLabel}
          </p>
          <h1 className="mt-3 text-5xl tracking-[0.08em] sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-fog">{product.tagline}</p>
          <p className="mt-6 text-fg">{product.flavour}</p>
          <ul className="mt-5 space-y-2 text-sm text-fog">
            {product.notes.map((n) => (
              <li key={n} className="border-l border-neon/40 pl-3">
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <div className="mb-1 flex justify-between font-display text-[10px] tracking-[0.2em] text-dim">
              <span>Voltage</span>
              <span className="tabular-nums text-neon">{product.voltage}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-raised">
              <div className="h-full bg-neon" style={{ width: `${product.voltage}%` }} />
            </div>
            <p className="mt-2 text-xs text-dim">{product.weight} · Licensed retailers</p>
          </div>
          <p className="mt-6 text-sm text-fog">
            Scan the QR on the bag.{" "}
            <Link to="/verify" search={{ p: product.slug }} className="text-neon">
              Confirm this product is authentic.
            </Link>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                playSpark();
                add(product.slug);
              }}
              className="min-h-12 rounded-md bg-neon px-8 font-display tracking-[0.18em] text-void active:scale-[0.96]"
            >
              Plug in
            </button>
            <Link
              to="/find"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-line px-6 font-display tracking-[0.16em] text-fog"
            >
              Find a licensed plug
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl">
        <h2 className="text-3xl tracking-[0.08em]">More current</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
