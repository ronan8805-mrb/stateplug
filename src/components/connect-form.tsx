import { useState } from "react";
import { submitConnect } from "@/lib/connect";
import { playStrike } from "@/lib/audio";
import { cn } from "@/lib/utils";

export function ConnectForm({ defaultCity = "" }: { defaultCity?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "err">("idle");
  const [flash, setFlash] = useState(false);

  return (
    <form
      className="relative space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const payload = {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          city: String(fd.get("city") ?? ""),
          message: String(fd.get("message") ?? ""),
        };
        setStatus("sending");
        try {
          await submitConnect({ data: payload });
          playStrike();
          setFlash(true);
          setStatus("sent");
          window.setTimeout(() => setFlash(false), 600);
          form.reset();
        } catch (err) {
          setStatus("err");
          console.error("connect failed", err);
        }
      }}
    >
      {flash ? (
        <div className="pointer-events-none absolute inset-0 z-10 bg-neon/25 mix-blend-screen" />
      ) : null}

      <Field label="Name" name="name" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="City" name="city" defaultValue={defaultCity} autoComplete="address-level2" />
      <label className="block">
        <span className="font-display text-[11px] tracking-[0.24em] text-dim">
          Signal
        </span>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What are you looking for?"
          className="mt-1.5 w-full resize-y rounded-md border border-line bg-raised px-3 py-2.5 text-sm text-fg placeholder:text-dim focus:border-neon"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "min-h-12 w-full rounded-md bg-neon font-display tracking-[0.2em] text-void",
          "transition-transform duration-150 active:scale-[0.96] disabled:opacity-60",
        )}
      >
        {status === "sending" ? "Charging…" : status === "sent" ? "Connected" : "Send the current"}
      </button>
      {status === "err" ? (
        <p className="text-sm text-warn">Couldn't send. Check the fields and try again.</p>
      ) : null}
      {status === "sent" ? (
        <p className="text-sm text-neon">Signal received. A plug will reach out.</p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="font-display text-[11px] tracking-[0.24em] text-dim">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="mt-1.5 h-11 w-full rounded-md border border-line bg-raised px-3 text-sm text-fg placeholder:text-dim focus:border-neon"
      />
    </label>
  );
}
