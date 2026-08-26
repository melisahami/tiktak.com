export type UserRole =
  | "central_operations"
  | "province_manager"
  | "workshop_manager"
  | "instructor"
  | "coordinator"
  | "executive"
  | "student";

/** Giriş ekranında sunulan iki erişim alanı. */
export type LoginAudience = "employee" | "student";

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  fullName: string;
  initials: string;
  role: UserRole;
  audience: LoginAudience;
  organization: string;
  redirect: string;
}

/** localStorage üzerinde saklanan oturum bilgisi (şifre içermez). */
export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  initials: string;
  role: UserRole;
  audience: LoginAudience;
  organization: string;
  redirect: string;
}

export interface Session {
  version: number;
  user: SessionUser;
  signedInAt: string;
}

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";
