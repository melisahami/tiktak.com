import type { ReactNode } from "react";
import PanelShell from "@/components/panel/PanelShell";

/* ─────────────────────────────────────────────────────────────
   Mevcut projeye entegre ederken YALNIZCA bu iki import ve
   SessionGuard prop'u değişir. Named export ise:
     import { SessionGuard } from "@/components/SessionGuard";
   ───────────────────────────────────────────────────────────── */
import { LogoutButton } from "@/components/auth/logout-button";
import { SessionGuard } from "@/components/auth/session-guard";

export const metadata = { title: "Koordinatör Paneli" };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SessionGuard allow={["coordinator"]}>
      <PanelShell role="koordinator" logout={<LogoutButton />}>
        {children}
      </PanelShell>
    </SessionGuard>
  );
}
