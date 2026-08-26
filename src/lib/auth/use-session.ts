"use client";

import { useCallback, useEffect, useState } from "react";

import {
  SESSION_CHANGED_EVENT,
  SESSION_STORAGE_KEY,
  clearSession,
  readSession,
} from "@/lib/auth/session";
import type { Session, SessionStatus } from "@/types/auth";

interface UseSessionResult {
  session: Session | null;
  status: SessionStatus;
  signOut: () => void;
}

/**
 * localStorage üzerindeki oturumu okur ve sekmeler arası değişiklikleri dinler.
 * İlk render'da "loading" döner; böylece sunucu çıktısıyla uyumsuzluk oluşmaz.
 */
export function useSession(): UseSessionResult {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<SessionStatus>("loading");

  useEffect(() => {
    const sync = () => {
      const current = readSession();
      setSession(current);
      setStatus(current ? "authenticated" : "unauthenticated");
    };

    sync();

    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === SESSION_STORAGE_KEY) {
        sync();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(SESSION_CHANGED_EVENT, sync);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SESSION_CHANGED_EVENT, sync);
    };
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setSession(null);
    setStatus("unauthenticated");
  }, []);

  return { session, status, signOut };
}
