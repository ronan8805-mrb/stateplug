import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Volume2, VolumeX, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useCart } from "@/lib/cart-store";
import { isMuted, startHum, toggleMuted } from "@/lib/audio";
import { cn } from "@/lib/utils";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "The Plug" },
  { to: "/find", label: "Find" },
  { to: "/contact", label: "Connect" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [muted, setMutedState] = useState(true);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const setCartOpen = useCart((s) => s.setOpen);
  const { isPending } = useCurrentUserState();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter,border-color] duration-300",
        solid || open
          ? "border-b border-line bg-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="STATE PLUG home">
          <img src="/logo.webp" alt="" className="h-10 w-auto sm:h-11" />
          <span className="hidden font-display text-lg tracking-[0.18em] sm:inline">
            State Plug
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "font-display text-[13px] tracking-[0.22em] text-fog transition-colors hover:text-neon",
                pathname === l.to && "text-neon",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label={muted ? "Unmute electric sound" : "Mute sound"}
            onClick={() => {
              const next = toggleMuted();
              setMutedState(next);
              if (!next) startHum();
            }}
            className="grid size-11 place-items-center rounded-full text-fog transition-colors hover:text-neon"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative grid size-11 place-items-center rounded-full text-fog transition-colors hover:text-neon"
            aria-label={`Open bag, ${count} items`}
          >
            <Zap className="size-4" />
            {count > 0 ? (
              <span className="absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full bg-neon font-display text-[10px] text-void">
                {count}
              </span>
            ) : null}
          </button>

          <div className="hidden sm:block">
            {isPending ? (
              <div className="h-8 w-20 animate-pulse rounded-full bg-raised" />
            ) : (
              <>
                <SignedOut>
                  <Link
                    to="/login"
                    className="inline-flex min-h-10 items-center rounded-full border border-line px-4 font-display text-[12px] tracking-[0.18em] text-fog hover:border-neon hover:text-neon"
                  >
                    Sign in
                  </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            )}
          </div>

          <button
            type="button"
            className="grid size-11 place-items-center text-fg lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-line bg-void/95 px-5 py-5 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex min-h-12 items-center font-display text-lg tracking-[0.16em] text-fg"
              >
                {l.label}
              </Link>
            ))}
            <SignedOut>
              <Link
                to="/login"
                className="flex min-h-12 items-center font-display text-lg tracking-[0.16em] text-neon"
              >
                Sign in
              </Link>
            </SignedOut>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
