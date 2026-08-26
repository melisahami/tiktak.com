"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";

const NAV = [
  ["Ana sayfa", "/egitmen-paneli"],
  ["Derslerim", "/egitmen-paneli/dersler"],
  ["Yoklama", "/egitmen-paneli/yoklama"],
  ["Bildirimler", "/egitmen-paneli/bildirimler"],
] as const;

export function InstructorPanelShell({
  children,
  logout,
  instructorName,
}: {
  children: ReactNode;
  logout: ReactNode;
  instructorName: string;
}) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const initials = instructorName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex min-h-screen bg-[#F6F9FE] text-[#3C4657]">
      <aside className="hidden w-[148px] shrink-0 flex-col bg-[#0D1A38] px-2 py-3 lg:flex">
        <div className="mb-5 border-b border-white/10 px-1.5 pb-4">
          <div className="flex items-start gap-1.5 text-[9px] font-semibold leading-3 text-white">
            <BrandLogo compact />
            <span>
              TikTakTürkiye
              <br />
              Operasyon
            </span>
          </div>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Eğitmen menüsü">
          {NAV.map(([label, href]) => {
            const active =
              href === "/egitmen-paneli"
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-md bg-white/10 px-2 py-2 text-[10px] font-medium text-white shadow-[inset_2px_0_0_#F59E4A]"
                    : "rounded-md px-2 py-2 text-[10px] text-[#C3CCDC] transition hover:bg-white/[.06] hover:text-white"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-white/10 px-1.5 pt-3 text-[8px] leading-3 text-[#9FB0CC]">
          <p className="text-white">Güz Dönemi 2026</p>
          <p>Robotik ve Kodlama · 8 hafta</p>
          <p className="mt-3">Sistem durumları</p>
          <p className="mt-1 text-[#F59E4A]">Çıkış yap</p>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-[38px] flex-wrap items-center gap-3 border-b border-[#DDE5F0] bg-white px-4 py-2 lg:px-4">
          <div className="text-[9px] text-[#667085]">
            TikTak Türkiye / Ana sayfa
          </div>
          <nav className="flex flex-wrap gap-1 lg:hidden">
            {NAV.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-md border border-[#DDE5F0] px-2.5 py-1.5 text-xs text-[#3C4657]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="relative ml-auto">
            <button
              aria-expanded={isProfileOpen}
              className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-[#F5F7FB]"
              onClick={() => setIsProfileOpen((current) => !current)}
              type="button"
            >
              <div className="hidden text-right sm:block">
                <p className="text-[10px] font-medium text-[#172033]">
                  {instructorName}
                </p>
                <p className="text-[9px] text-[#667085]">
                  Eğitmen · Üsküdar Atölyesi
                </p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6EEFA] text-[9px] font-semibold text-[#1F3D77]">
                {initials}
              </div>
            </button>
            {isProfileOpen ? (
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-[#E4EAF2] bg-white py-1 shadow-lg">
                <div className="border-b border-[#E4EAF2] px-4 py-2">
                  <p className="text-sm font-medium text-[#172033]">
                    {instructorName}
                  </p>
                  <p className="text-xs text-[#667085]">Eğitmen hesabı</p>
                </div>
                {logout}
              </div>
            ) : null}
          </div>
        </header>
        <main className="min-w-0 flex-1 px-4 py-4 lg:px-4">{children}</main>
      </div>
    </div>
  );
}
