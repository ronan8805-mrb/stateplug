import type { ReactNode } from "react";
import { AgeGate } from "@/components/age-gate";
import { CartDrawer } from "@/components/cart-drawer";
import { ElectricCursor } from "@/components/electric-cursor";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollBolt } from "@/components/scroll-bolt";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AgeGate>
      <div className="grain relative min-h-dvh bg-bg text-fg">
        <ElectricCursor />
        <SiteHeader />
        <ScrollBolt />
        <main className="relative z-10">{children}</main>
        <SiteFooter />
        <CartDrawer />
      </div>
    </AgeGate>
  );
}
