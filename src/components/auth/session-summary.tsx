"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { roleLabel } from "@/lib/auth/roles";
import { useSession } from "@/lib/auth/use-session";

/** Üst çubukta aktif kullanıcıyı gösterir ve çıkış aksiyonunu sunar. */
export function SessionSummary() {
  const { session, status } = useSession();

  if (status !== "authenticated" || !session) {
    return (
      <div className="flex items-center gap-3">
        <span className="h-9 w-9 animate-pulse rounded-full bg-[#EEF2F8]" />
        <span className="hidden h-4 w-28 animate-pulse rounded bg-[#EEF2F8] sm:block" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium text-[#172033]">
          {session.user.fullName}
        </p>
        <p className="text-xs text-[#667085]">{roleLabel(session.user.role)}</p>
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF3E7] text-sm font-semibold text-[#B65A12]">
        {session.user.initials}
      </div>

      <LogoutButton />
    </div>
  );
}
