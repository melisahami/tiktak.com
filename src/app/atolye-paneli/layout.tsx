import type { ReactNode } from "react";
import PanelShell from "@/components/atolye/PanelShell";

/* ─────────────────────────────────────────────────────────────
   Mevcut projeye entegre ederken YALNIZCA bu iki import ve
   SessionGuard prop'u değişir. Named export ise:
     import { SessionGuard } from "@/components/SessionGuard";
   ───────────────────────────────────────────────────────────── */
import { LogoutButton } from "@/components/auth/logout-button";
import { SessionGuard } from "@/components/auth/session-guard";

export const metadata = { title: "Atölye Sorumlusu Paneli" };

export default function AtolyePaneliLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionGuard allow={["workshop_manager", "province_manager"]}>
      <PanelShell logout={<LogoutButton />}>{children}</PanelShell>
    </SessionGuard>
  );
}
