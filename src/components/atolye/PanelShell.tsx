"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SORUMLU } from "@/lib/demo/atolye";

export const NAV = [
  { href: "/atolye-paneli", label: "Genel bakış" },
  { href: "/atolye-paneli/hazirlik", label: "Eğitim hazırlığı" },
  { href: "/atolye-paneli/malzeme", label: "Malzeme kontrolü" },
  { href: "/atolye-paneli/egitmenler", label: "Eğitmenler" },
  { href: "/atolye-paneli/bildirimler", label: "Bildirimler" },
];

export default function PanelShell({
  children, logout,
}: { children: ReactNode; logout?: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/atolye-paneli" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-[#F6F9FE] text-[#3C4657]">
      <aside className="hidden w-[248px] shrink-0 flex-col bg-[#14213D] px-3.5 py-5 lg:flex">
        <div className="mb-6 px-2">
          <div className="text-[15px] font-semibold text-white">TikTakTürkiye</div>
          <div className="mt-0.5 text-xs text-[#9FB0CC]">Eğitim Operasyon Paneli</div>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-lg bg-white/10 px-3 py-2.5 text-sm text-white shadow-[inset_2px_0_0_#F59E4A]"
                    : "rounded-lg px-3 py-2.5 text-sm text-[#C3CCDC] transition-colors hover:bg-white/[.06] hover:text-white"
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4">
          <div className="flex items-center gap-2.5 px-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white">
              {SORUMLU.basHarf}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] text-white">{SORUMLU.ad}</span>
              <span className="block truncate text-[11px] text-[#9FB0CC]">
                {SORUMLU.unvan} · {SORUMLU.atolye}
              </span>
            </span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-3 border-b border-[#DDE5F0] bg-white px-5 py-3.5 lg:px-8">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[#14213D]">Atölye Sorumlusu Paneli</div>
            <div className="text-xs text-[#667085]">{SORUMLU.atolye}</div>
          </div>

          <nav className="flex flex-wrap gap-1 lg:hidden">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={
                  isActive(n.href)
                    ? "rounded-md border border-[#14213D] bg-[#14213D] px-2.5 py-1.5 text-xs text-white"
                    : "rounded-md border border-[#DDE5F0] px-2.5 py-1.5 text-xs text-[#3C4657]"
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2.5">{logout}</div>
        </header>

        <main className="min-w-0 flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
