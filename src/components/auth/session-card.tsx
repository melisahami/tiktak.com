"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { roleLabel } from "@/lib/auth/roles";
import { useSession } from "@/lib/auth/use-session";

interface SessionCardProps {
  /** Koyu zeminli kenar çubukları için "navy", açık yüzeyler için "light". */
  tone?: "navy" | "light";
}

export function SessionCard({ tone = "navy" }: SessionCardProps) {
  const { session, status } = useSession();

  const isNavy = tone === "navy";

  const containerClass = isNavy
    ? "rounded-xl border border-white/10 bg-white/5 p-4"
    : "rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] p-4";

  const captionClass = isNavy ? "text-xs text-slate-400" : "text-xs text-[#667085]";
  const nameClass = isNavy
    ? "mt-1 text-sm font-medium text-white"
    : "mt-1 text-sm font-medium text-[#172033]";
  const buttonClass = isNavy
    ? "mt-3 w-full rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
    : "mt-3 w-full rounded-lg border border-[#E4EAF2] bg-white px-3 py-2 text-xs font-medium text-[#243B64] transition hover:border-[#C9D6E8] hover:text-[#B65A12]";

  if (status !== "authenticated" || !session) {
    return (
      <div className={containerClass}>
        <p className={captionClass}>Aktif kullanıcı</p>
        <p className={nameClass}>Yükleniyor</p>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <p className={captionClass}>Aktif kullanıcı</p>
      <p className={nameClass}>{session.user.fullName}</p>
      <p className={`mt-1 ${captionClass}`}>{roleLabel(session.user.role)}</p>

      <LogoutButton className={buttonClass} />
    </div>
  );
}
