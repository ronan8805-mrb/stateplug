import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StormCanvas } from "@/components/storm-canvas";
import { ProductCard } from "@/components/product-card";
import { ProductModal } from "@/components/product-modal";
import { featuredProducts, type Product } from "@/lib/products";
import { usePowerUp } from "@/hooks/use-reduced-motion";

export const Route = createFileRoute("/")({ component: Home });

const ticker = [
  "The 1LB",
  "SunnyZ",
  "Gelonade",
  "Kelp Juicez",
  "States Secret Stuff",
];

function Home() {
  const [quick, setQuick] = useState<Product | null>(null);
  const setPower = usePowerUp<HTMLElement>();

  return (
    <>
      <Hero />
      <Marquee />
      <section ref={setPower} className="power-up mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-[11px] tracking-[0.32em] text-neon">
              Exotic current
            </p>
            <h2 className="mt-2 text-4xl tracking-[0.08em] sm:text-5xl">
              Shop the voltage
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-display text-sm tracking-[0.2em] text-fog hover:text-neon"
          >
            Full menu →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts().map((p) => (
            <ProductCard key={p.slug} product={p} onQuick={setQuick} />
          ))}
        </div>
      </section>
      <LookStrip />
      <StoryBand />
      <CtaBand />
      <ProductModal product={quick} onClose={() => setQuick(null)} />
    </>
  );
}

function Hero() {
  const [charged, setCharged] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setCharged(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative isolate flex min-h-dvh items-end overflow-hidden">
      <img
        src="/hero-storm.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-bg/55 to-bg" />
      <StormCanvas intensity={1.15} />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-16 pt-28 text-center sm:px-6 sm:pb-20">
        <div
          className={`relative mb-6 transition-all duration-700 ${
            charged ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <span className="aura absolute inset-[-16%] rounded-full bg-neon/20" />
          <img
            src="/logo.webp"
            alt="STATE PLUG"
            width={360}
            height={375}
            className="relative z-10 w-[220px] sm:w-[300px] md:w-[340px]"
          />
        </div>
        <p className="font-display text-[11px] tracking-[0.42em] text-neon sm:text-xs">
          Los Angeles · Globally recognized
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl tracking-[0.08em] glow-text sm:text-6xl md:text-7xl">
          The only plug
          <br />
          you'll ever need
        </h1>
        <p className="mt-5 max-w-xl text-sm text-fog sm:text-base">
          Premium exotic flower. Unforgettable flavours. Pure California energy
          — packed like nothing else on the shelf.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-neon px-7 font-display tracking-[0.18em] text-void transition-transform duration-150 active:scale-[0.96]"
          >
            Shop exotic flavours
          </Link>
          <Link
            to="/about"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 font-display tracking-[0.18em] text-fg hover:border-neon"
          >
            Discover the plug
          </Link>
        </div>
        <div className="mt-14 flex flex-col items-center gap-2 text-[10px] tracking-[0.32em] text-dim uppercase">
          <span>Scroll to charge</span>
          <span className="h-10 w-px bg-gradient-to-b from-neon to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden border-y border-line bg-void py-3">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-display text-sm tracking-[0.28em] text-fog"
          >
            {t}
            <span className="ml-10 text-neon">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function LookStrip() {
  const setPower = usePowerUp<HTMLElement>();
  return (
    <section
      ref={setPower}
      className="power-up border-y border-line bg-storm px-5 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-display text-[11px] tracking-[0.32em] text-neon">
            Packaging as culture
          </p>
          <h2 className="mt-2 text-4xl tracking-[0.08em] sm:text-5xl">
            The bag is the lightning
          </h2>
          <p className="mt-4 max-w-md text-fog">
            Coolers. Cartons. Summer pouches. Secret jars. The parody packs
            that made the streets look twice — now a living lookbook.
          </p>
          <Link
            to="/lookbook"
            className="mt-7 inline-flex min-h-12 items-center rounded-full border border-neon px-6 font-display tracking-[0.16em] text-neon"
          >
            Enter the lookbook
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img
            src="/products/gelonade.jpg"
            alt="State's Gelonade"
            className="aspect-[3/4] rounded-lg object-cover"
          />
          <img
            src="/products/sunnyz.jpg"
            alt="SunnyZ Summer Edition"
            className="mt-8 aspect-[3/4] rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function StoryBand() {
  const setPower = usePowerUp<HTMLElement>();
  return (
    <section ref={setPower} className="power-up mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-[11px] tracking-[0.32em] text-neon">
            Origin
          </p>
          <h2 className="mt-2 text-4xl tracking-[0.08em] sm:text-5xl">
            From the streets of LA to the world
          </h2>
        </div>
        <div className="space-y-4 text-fog lg:col-span-7">
          <p>
            STATE PLUG is your high-voltage connection to premium exotic flower.
            Unforgettable flavours, pure California energy, and top-shelf
            quality that hits different every time.
          </p>
          <p>From the streets of LA to the world — this is the only plug you need.</p>
          <Link
            to="/about"
            className="inline-flex font-display text-sm tracking-[0.2em] text-neon"
          >
            Read the current →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <img
        src="/hero-storm.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-void/70" />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-6">
        <h2 className="text-4xl tracking-[0.1em] glow-text sm:text-6xl">
          Plug in. Power up.
          <br />
          Stay charged.
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/find"
            className="inline-flex min-h-12 items-center rounded-full bg-neon px-7 font-display tracking-[0.18em] text-void"
          >
            Find your plug
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center rounded-full border border-line px-7 font-display tracking-[0.18em]"
          >
            Request a connect
          </Link>
        </div>
      </div>
    </section>
  );
}
