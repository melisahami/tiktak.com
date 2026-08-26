import { findDemoUserByEmail } from "@/data/demo/users";
import { writeSession } from "@/lib/auth/session";
import type { LoginAudience, Session, SessionUser } from "@/types/auth";

export type LoginErrorCode = "invalid_credentials" | "wrong_audience";

export type LoginResult =
  | { ok: true; session: Session; redirect: string }
  | { ok: false; code: LoginErrorCode; message: string };

const GENERIC_ERROR = "E-posta adresi veya şifre hatalı. Lütfen tekrar deneyin.";

const AUDIENCE_MISMATCH: Record<LoginAudience, string> = {
  employee:
    "Bu bilgiler bir öğrenci hesabına ait. Devam etmek için öğrenci girişini seçin.",
  student:
    "Bu bilgiler bir kurumsal hesaba ait. Devam etmek için çalışan girişini seçin.",
};

function toSessionUser(user: {
  id: string;
  email: string;
  fullName: string;
  initials: string;
  role: SessionUser["role"];
  audience: LoginAudience;
  organization: string;
  redirect: string;
}): SessionUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    initials: user.initials,
    role: user.role,
    audience: user.audience,
    organization: user.organization,
    redirect: user.redirect,
  };
}

/**
 * Demo kullanıcı listesine karşı doğrulama yapar ve başarılı girişte
 * oturumu localStorage üzerine yazar. Gerçek kimlik doğrulama içermez.
 */
export function signIn(
  email: string,
  password: string,
  audience: LoginAudience,
): LoginResult {
  const user = findDemoUserByEmail(email);

  if (!user || user.password !== password) {
    return { ok: false, code: "invalid_credentials", message: GENERIC_ERROR };
  }

  if (user.audience !== audience) {
    return {
      ok: false,
      code: "wrong_audience",
      message: AUDIENCE_MISMATCH[audience],
    };
  }

  const sessionUser = toSessionUser(user);
  const session = writeSession(sessionUser);

  if (!session) {
    return {
      ok: false,
      code: "invalid_credentials",
      message:
        "Oturum bu tarayıcıda saklanamadı. Tarayıcı depolama ayarlarınızı kontrol edin.",
    };
  }

  return { ok: true, session, redirect: user.redirect };
}
