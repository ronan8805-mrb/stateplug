import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: () => (
      <div className="flex min-h-[70dvh] flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-[11px] tracking-[0.32em] text-neon">404</p>
        <h1 className="mt-3 text-4xl tracking-[0.1em]">Signal not found</h1>
        <a href="/" className="mt-6 font-display text-sm tracking-[0.2em] text-fog hover:text-neon">
          Return to the current
        </a>
      </div>
    ),
  });
}

