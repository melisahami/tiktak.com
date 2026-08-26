"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { LogoutButton } from "@/components/auth/logout-button";
import { BrandLogo } from "@/components/ui/brand-logo";

interface StudentHeaderProps {
  studentName: string;
}

export function StudentHeader({ studentName }: StudentHeaderProps) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const initials = studentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="border-b border-[#E4EAF2] bg-white">
      <div className="mx-auto flex max-w-full items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <BrandLogo compact />
          <h1 className="text-lg font-semibold text-[#172033]">
            TikTakTürkiye – Öğrenci Paneli
          </h1>
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-[#F5F7FB]"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="text-right">
              <p className="text-sm font-medium text-[#172033]">
                {studentName}
              </p>
              <p className="text-xs text-[#667085]">Öğrenci</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4A261] text-sm font-semibold text-white">
              {initials}
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-[#E4EAF2] bg-white shadow-lg">
              <button
                className="block w-full px-4 py-2 text-left text-sm text-[#172033] hover:bg-[#F5F7FB]"
                onClick={() => {
                  setIsProfileOpen(false);
                  router.push("/ogrenci-ana-sayfa/profil");
                }}
              >
                👤 Profil
              </button>
              <hr className="border-[#E4EAF2]" />
              <LogoutButton
                className="block w-full px-4 py-2 text-left text-sm text-[#C2414B] hover:bg-[#FFF0F1]"
                label="🚪 Çıkış yap"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
