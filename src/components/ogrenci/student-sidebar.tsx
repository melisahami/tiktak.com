"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
}

const MENU_ITEMS: SidebarItem[] = [
  { name: "Ana Sayfa", href: "/ogrenci-ana-sayfa", icon: "🏠" },
  { name: "Derslerim", href: "/ogrenci-ana-sayfa/derslerim", icon: "📚" },
  { name: "Sınavlar", href: "/ogrenci-ana-sayfa/sinavlar", icon: "📝" },
  { name: "Ödevler", href: "/ogrenci-ana-sayfa/odevler", icon: "✏️" },
  { name: "Sertifikalar", href: "/ogrenci-ana-sayfa/sertifikalar", icon: "🎓" },
  { name: "Duyurular", href: "/ogrenci-ana-sayfa/duyurular", icon: "📢" },
];

interface StudentSidebarProps {
  onClose?: () => void;
}

export function StudentSidebar({ onClose }: StudentSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileOpen(false);
    onClose?.();
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-[#E4EAF2] bg-white px-6 py-8 transition-transform lg:sticky lg:top-0 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#F4A261]/10 text-[#14213D]"
                    : "text-[#667085] hover:bg-[#F5F7FB] hover:text-[#172033]"
                }`}
                href={item.href}
                key={item.href}
                onClick={handleLinkClick}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <button
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#14213D] text-white shadow-lg lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? "✕" : "☰"}
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
