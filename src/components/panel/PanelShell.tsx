"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ROLLER, type RolKey } from "@/lib/demo/roller";

/* Tek kabuk, dört panel. Menü rol tanımından okunur. */
export default function PanelShell({
  role, children, logout,
}: { role: RolKey; children: ReactNode; logout?: ReactNode }) {
  const r = ROLLER[role];
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === r.base ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-[#F6F9FE] text-[#3C4657]">
      <aside className="hidden w-[248px] shrink-0 flex-col bg-[#14213D] px-3.5 py-5 lg:flex">
        <div className="mb-6 px-2">
          <div className="text-[15px] font-semibold text-white">TikTakTürkiye</div>
          <div className="mt-0.5 text-xs text-[#9FB0CC]">Eğitim Operasyon Paneli</div>
        </div>

        <nav className="flex flex-col gap-1">
          {r.nav.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-lg bg-white/10 px-3 py-2.5 text-sm text-white no-underline shadow-[inset_2px_0_0_#F59E4A]"
                    : "rounded-lg px-3 py-2.5 text-sm text-[#C3CCDC] no-underline transition-colors hover:bg-white/[.06] hover:text-white"
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4">
          <div className="flex items-center gap-2.5 px-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white">
              {r.basHarf}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] text-white">{r.ad}</span>
              <span className="block truncate text-[11px] text-[#9FB0CC]">
                {r.unvan} · {r.kapsam}
              </span>
            </span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-3 border-b border-[#DDE5F0] bg-white px-5 py-3.5 lg:px-8">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[#14213D]">{r.unvan} Paneli</div>
            <div className="text-xs text-[#667085]">{r.kapsam}</div>
          </div>

          <nav className="flex flex-wrap gap-1 lg:hidden">
            {r.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={
                  isActive(n.href)
                    ? "rounded-md border border-[#14213D] bg-[#14213D] px-2.5 py-1.5 text-xs text-white no-underline"
                    : "rounded-md border border-[#DDE5F0] px-2.5 py-1.5 text-xs text-[#3C4657] no-underline"
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
