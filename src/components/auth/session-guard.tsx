"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSession } from "@/lib/auth/use-session";
import type { UserRole } from "@/types/auth";

interface SessionGuardProps {
  allow: readonly UserRole[];
  children: React.ReactNode;
}

/**
 * Oturum yoksa /giris adresine, rol uyuşmuyorsa kullanıcının kendi paneline yönlendirir.
 */
export function SessionGuard({ allow, children }: SessionGuardProps) {
  const router = useRouter();
  const { session, status } = useSession();

  const role = session?.user.role;
  const ownRedirect = session?.user.redirect;
  const isAllowed = role !== undefined && allow.includes(role);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      router.replace("/giris");
      return;
    }

    if (!isAllowed && ownRedirect) {
      router.replace(ownRedirect);
    }
  }, [isAllowed, ownRedirect, router, status]);

  if (status !== "authenticated" || !isAllowed) {
    return (
      <div
        aria-live="polite"
        className="flex min-h-screen items-center justify-center bg-[#F5F7FB] px-6"
      >
        <div className="flex items-center gap-3 rounded-xl border border-[#E4EAF2] bg-white px-5 py-4 shadow-sm">
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-[#E4EAF2] border-t-[#243B64]"
          />
          <p className="text-sm font-medium text-[#667085]">
            Oturum doğrulanıyor
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
