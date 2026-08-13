import { createFileRoute } from "@tanstack/react-router";
import { ConnectForm } from "@/components/connect-form";
import { StormCanvas } from "@/components/storm-canvas";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [{ title: "Connect — STATE PLUG" }],
  }),
});

function Contact() {
  return (
    <div className="relative isolate overflow-hidden px-5 pt-36 pb-24 sm:px-6">
      <StormCanvas intensity={0.55} className="opacity-70" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-[11px] tracking-[0.32em] text-neon">
            Contact
          </p>
          <h1 className="mt-2 text-4xl tracking-[0.08em] sm:text-6xl">
            Make the connection
          </h1>
          <p className="mt-4 text-fog">
            Press, wholesale, or a private ask. Send a clean signal. We answer
            the ones that are charged.
          </p>
          <p className="mt-6 font-display text-sm tracking-[0.2em] text-dim">
            Instagram · @stateplug
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface/90 p-5 backdrop-blur-sm sm:p-8 lg:col-span-7">
          <ConnectForm />
        </div>
      </div>
    </div>
  );
}
