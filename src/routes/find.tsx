import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CityMap } from "@/components/city-map";
import { ConnectForm } from "@/components/connect-form";
import type { City } from "@/lib/cities";

export const Route = createFileRoute("/find")({
  component: Find,
  head: () => ({
    meta: [{ title: "Find Your Plug — STATE PLUG" }],
  }),
});

function Find() {
  const [city, setCity] = useState("Los Angeles");
  return (
    <div className="px-5 pt-36 pb-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-[11px] tracking-[0.32em] text-neon">
          Where to buy
        </p>
        <h1 className="mt-2 text-4xl tracking-[0.08em] sm:text-6xl">
          Find your plug
        </h1>
        <p className="mt-4 max-w-xl text-fog">
          Los Angeles first. Global after that. Select a city or send a
          connect request — we only route through licensed partners.
        </p>
        <div className="mt-12">
          <CityMap onPick={(c: City) => setCity(c.name)} />
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl tracking-[0.08em]">Request a connect</h2>
            <p className="mt-3 text-sm text-fog">
              Tell us where you are. If there's a live plug, we'll
              make the introduction.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-7 lg:col-span-7">
            <ConnectForm key={city} defaultCity={city} />
          </div>
        </div>
      </div>
    </div>
  );
}
