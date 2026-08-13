import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: "Sign in — STATE PLUG" }],
  }),
});

function Login() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-5 pt-24 pb-16">
      <div className="w-full max-w-sm rounded-xl border border-line bg-surface p-7">
        <img src="/logo.webp" alt="" className="mx-auto h-16 w-auto" />
        <h1 className="mt-5 text-center text-3xl tracking-[0.12em]">
          Connect account
        </h1>
        <p className="mt-2 text-center text-sm text-fog">
          Sign in to save your bag and send a named connect.
        </p>
        <div className="mt-6 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                className="flex min-h-12 w-full items-center justify-center rounded-md border border-line font-display tracking-[0.16em] text-fg transition-colors hover:border-neon hover:text-neon"
              >
                Continue with {p.label}
              </button>
            ))
          ) : (
            <p className="text-center text-sm text-fog">Sign-in is disabled.</p>
          )}
        </div>
        <Link
          to="/"
          className="mt-6 block text-center text-xs tracking-[0.2em] text-dim hover:text-neon"
        >
          Back to the current
        </Link>
      </div>
    </div>
  );
}
