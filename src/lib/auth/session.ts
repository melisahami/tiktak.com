import type { Session, SessionUser } from "@/types/auth";

export const SESSION_STORAGE_KEY = "tiktakturkiye.operasyon.session";
export const SESSION_VERSION = 1;
export const SESSION_CHANGED_EVENT = "tiktakturkiye:session-changed";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function notifySessionChange(): void {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(SESSION_CHANGED_EVENT));
}

function isSessionUser(value: unknown): value is SessionUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.fullName === "string" &&
    typeof candidate.initials === "string" &&
    typeof candidate.role === "string" &&
    typeof candidate.audience === "string" &&
    typeof candidate.organization === "string" &&
    typeof candidate.redirect === "string"
  );
}

/** Tarayıcı dışında veya bozuk kayıtta güvenli biçimde null döner. */
export function readSession(): Session | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);

    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }

    const candidate = parsed as Record<string, unknown>;

    if (candidate.version !== SESSION_VERSION || !isSessionUser(candidate.user)) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return {
      version: SESSION_VERSION,
      user: candidate.user,
      signedInAt:
        typeof candidate.signedInAt === "string"
          ? candidate.signedInAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function writeSession(user: SessionUser): Session | null {
  const session: Session = {
    version: SESSION_VERSION,
    user,
    signedInAt: new Date().toISOString(),
  };

  if (!isBrowser()) {
    return null;
  }

  try {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    notifySessionChange();
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Depolama kullanılamıyorsa sessizce devam edilir.
  }

  notifySessionChange();
}
