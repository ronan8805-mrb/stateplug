import { createFileRoute } from "@tanstack/react-router";
import { usePowerUp } from "@/hooks/use-reduced-motion";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [{ title: "The Plug — STATE PLUG" }],
  }),
});

const beats = [
  {
    k: "01",
    t: "Los Angeles",
    d: "The current starts on the streets of LA. Night air, wet pavement, a green bolt across a black sky.",
  },
  {
    k: "02",
    t: "The Plug",
    d: "Not a middleman. A standard. Reliable, loud when it needs to be, quiet when it counts.",
  },
  {
    k: "03",
    t: "Exotic flavours",
    d: "Unforgettable profiles packed in 1LB bags and the parody shells the culture still talks about.",
  },
  {
    k: "04",
    t: "Global recognition",
    d: "From California counters to cities that wait for the next strike. Same voltage, every time.",
  },
  {
    k: "05",
    t: "Stay charged",
    d: "Plug in. Power up. This is the only plug you need.",
  },
];

function About() {
  const setPower = usePowerUp<HTMLElement>();
  return (
    <div className="px-5 pt-36 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <p className="font-display text-[11px] tracking-[0.32em] text-neon">
          The plug story
        </p>
        <h1 className="mt-3 text-5xl tracking-[0.08em] glow-text sm:text-7xl">
          State Plug
        </h1>
        <p className="mt-3 font-display text-sm tracking-[0.24em] text-fog">
          Los Angeles Based. Globally Recognized.
        </p>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-fg">
          <p>Your high-voltage connection to premium exotic flower.</p>
          <p>
            Unforgettable flavours, pure California energy, and top-shelf
            quality that hits different every time.
          </p>
          <p>
            From the streets of LA to the world — this is the only plug you
            need.
          </p>
          <p className="font-display text-2xl tracking-[0.12em] text-neon">
            Plug in. Power up. Stay charged.
          </p>
        </div>
      </div>

      <ol ref={setPower} className="power-up mx-auto mt-20 max-w-4xl space-y-0">
        {beats.map((b, i) => (
          <li
            key={b.k}
            className="grid gap-3 border-t border-line py-8 sm:grid-cols-12 sm:items-start"
          >
            <span className="font-display text-neon sm:col-span-2">{b.k}</span>
            <h2 className="text-2xl tracking-[0.1em] sm:col-span-4">{b.t}</h2>
            <p className="text-fog sm:col-span-6">{b.d}</p>
            <div className="sm:col-span-12">
              <div className="h-px overflow-hidden bg-raised">
                <div
                  className="volt-fill h-px bg-neon"
                  style={{ width: `${30 + i * 14}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
