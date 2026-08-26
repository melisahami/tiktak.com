"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";

import { signIn } from "@/lib/auth/login";
import { readSession } from "@/lib/auth/session";
import type { LoginAudience } from "@/types/auth";

const REMEMBERED_EMAIL_KEY = "tiktakturkiye.operasyon.remembered-email";

const AUDIENCE_OPTIONS: ReadonlyArray<{
  value: LoginAudience;
  title: string;
  caption: string;
  helper: string;
  emailPlaceholder: string;
}> = [
  {
    value: "employee",
    title: "Çalışan girişi",
    caption: "Kurumsal hesap",
    helper:
      "Kurumsal hesabınızla görev, hazırlık ve operasyon ekranlarınıza erişin.",
    emailPlaceholder: "ad.soyad@tiktakturkiye.gov.tr",
  },
  {
    value: "student",
    title: "Öğrenci girişi",
    caption: "Öğrenci hesabı",
    helper:
      "Öğrenci hesabınızla derslerinize ve yoklama bilgilerinize erişin.",
    emailPlaceholder: "ad.soyad@ogrenci.tiktakturkiye.gov.tr",
  },
];

const HERO_STATS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "42", label: "Atölye" },
  { value: "31", label: "Eğitime hazır atölye" },
  { value: "86", label: "Aktif operasyon görevi" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface FieldErrors {
  email?: string;
  password?: string;
}

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = "E-posta adresi gerekli.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Geçerli bir e-posta adresi girin.";
  }

  if (!password) {
    errors.password = "Şifre gerekli.";
  } else if (password.length < 6) {
    errors.password = "Şifre en az 6 karakter olmalı.";
  }

  return errors;
}

export function LoginView() {
  const router = useRouter();
  const fieldId = useId();

  const [audience, setAudience] = useState<LoginAudience>("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const activeOption = useMemo(
    () => AUDIENCE_OPTIONS.find((option) => option.value === audience)!,
    [audience],
  );

  useEffect(() => {
    const session = readSession();

    if (session) {
      setIsRedirecting(true);
      router.replace(session.user.redirect);
      return;
    }

    try {
      const remembered = window.localStorage.getItem(REMEMBERED_EMAIL_KEY);

      if (remembered) {
        setEmail(remembered);
      }
    } catch {
      // Depolama kullanılamıyorsa alan boş kalır.
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setFormError(null);
    setShowPasswordHint(false);

    const errors = validate(email, password);
    setFieldErrors(errors);

    if (errors.email || errors.password) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 550);
    });

    const result = signIn(email, password, audience);

    if (!result.ok) {
      setIsSubmitting(false);
      setFormError(result.message);
      return;
    }

    try {
      if (remember) {
        window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email.trim());
      } else {
        window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }
    } catch {
      // Hatırlama tercihi saklanamazsa giriş akışı etkilenmez.
    }

    setIsRedirecting(true);
    router.replace(result.redirect);
  };

  const busy = isSubmitting || isRedirecting;

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#172033] lg:grid lg:grid-cols-[1.05fr_1fr]">
      <section
        className="relative hidden overflow-hidden px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between xl:px-16"
        style={{
          backgroundColor: "#0B1426",
          backgroundImage: [
            "radial-gradient(circle at 82% 6%, rgba(43,105,214,0.55), transparent 58%)",
            "radial-gradient(circle at 12% 92%, rgba(20,33,61,0.9), transparent 60%)",
            "linear-gradient(140deg, #0B1426 0%, #12203C 52%, #16336F 100%)",
          ].join(", "),
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: [
              "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px)",
              "linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.9), transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.9), transparent 78%)",
          }}
        />

        <div className="relative flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F4A261]/35 bg-[#20304F] text-lg font-semibold text-[#F4A261]">
            T
          </span>

          <p className="text-lg font-semibold tracking-tight">
            TikTakTürkiye Operasyon
          </p>
        </div>

        <div className="relative mt-16">
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.15] tracking-tight xl:text-[2.9rem]">
            Eğitim operasyonlarını tek merkezden yönetin.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
            Görev takibi, atölye malzeme hazırlığı, eğitmen süreçleri ve öğrenci
            yoklaması tek operasyon panosunda birleşir. Gecikmeler ve riskler
            eğitim başlamadan görünür olur.
          </p>

          <dl className="mt-11 grid max-w-xl grid-cols-3 gap-4">
            {HERO_STATS.map((stat) => (
              <div
                className="rounded-xl border border-white/12 bg-white/[0.05] px-5 py-4"
                key={stat.label}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-sm leading-5 text-slate-300">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="relative mt-16 text-sm text-slate-400">
          Güz Dönemi 2026 · Robotik ve Kodlama hazırlık süreci
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[468px]">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14213D] text-base font-semibold text-[#F4A261]">
              T
            </span>
            <p className="text-base font-semibold text-[#172033]">
              TikTakTürkiye Operasyon
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4EAF2] bg-white p-7 shadow-[0_20px_45px_-30px_rgba(20,33,61,0.45)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Giriş yapın</h2>
            <p className="mt-2 text-sm text-[#667085]">
              Erişim alanınızı seçerek devam edin.
            </p>

            <div
              aria-label="Erişim alanı"
              className="mt-6 grid grid-cols-2 gap-3"
              role="radiogroup"
            >
              {AUDIENCE_OPTIONS.map((option) => {
                const isActive = option.value === audience;

                return (
                  <button
                    aria-checked={isActive}
                    className={`rounded-xl border px-4 py-3.5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#243B64]/25 ${
                      isActive
                        ? "border-[#F4A261] bg-[#FFF3E7]"
                        : "border-[#E4EAF2] bg-white hover:border-[#C9D6E8] hover:bg-[#F8FAFC]"
                    }`}
                    disabled={busy}
                    key={option.value}
                    onClick={() => {
                      setAudience(option.value);
                      setFormError(null);
                    }}
                    role="radio"
                    type="button"
                  >
                    <span className="block text-sm font-semibold text-[#172033]">
                      {option.title}
                    </span>
                    <span className="mt-1 block text-xs text-[#667085]">
                      {option.caption}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-sm leading-6 text-[#667085]">
              {activeOption.helper}
            </p>

            <form className="mt-6" noValidate onSubmit={handleSubmit}>
              {formError ? (
                <div
                  className="mb-5 rounded-lg border border-[#F3C7CB] bg-[#FFF0F1] px-4 py-3 text-sm leading-6 text-[#93242E]"
                  role="alert"
                >
                  {formError}
                </div>
              ) : null}

              <label
                className="block text-sm font-medium text-[#344054]"
                htmlFor={`${fieldId}-email`}
              >
                E-posta adresi
              </label>

              <input
                aria-describedby={
                  fieldErrors.email ? `${fieldId}-email-error` : undefined
                }
                aria-invalid={fieldErrors.email ? true : undefined}
                autoComplete="email"
                className={`mt-2 h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:ring-2 disabled:bg-[#F8FAFC] ${
                  fieldErrors.email
                    ? "border-[#C2414B] focus:border-[#C2414B] focus:ring-[#C2414B]/15"
                    : "border-[#E4EAF2] focus:border-[#243B64] focus:ring-[#243B64]/15"
                }`}
                disabled={busy}
                id={`${fieldId}-email`}
                inputMode="email"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (fieldErrors.email) {
                    setFieldErrors((current) => ({ ...current, email: undefined }));
                  }
                }}
                placeholder={activeOption.emailPlaceholder}
                type="email"
                value={email}
              />

              {fieldErrors.email ? (
                <p
                  className="mt-2 text-sm text-[#C2414B]"
                  id={`${fieldId}-email-error`}
                >
                  {fieldErrors.email}
                </p>
              ) : null}

              <label
                className="mt-5 block text-sm font-medium text-[#344054]"
                htmlFor={`${fieldId}-password`}
              >
                Şifre
              </label>

              <input
                aria-describedby={
                  fieldErrors.password ? `${fieldId}-password-error` : undefined
                }
                aria-invalid={fieldErrors.password ? true : undefined}
                autoComplete="current-password"
                className={`mt-2 h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:ring-2 disabled:bg-[#F8FAFC] ${
                  fieldErrors.password
                    ? "border-[#C2414B] focus:border-[#C2414B] focus:ring-[#C2414B]/15"
                    : "border-[#E4EAF2] focus:border-[#243B64] focus:ring-[#243B64]/15"
                }`}
                disabled={busy}
                id={`${fieldId}-password`}
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);

                  if (fieldErrors.password) {
                    setFieldErrors((current) => ({
                      ...current,
                      password: undefined,
                    }));
                  }
                }}
                placeholder="••••••••"
                type="password"
                value={password}
              />

              {fieldErrors.password ? (
                <p
                  className="mt-2 text-sm text-[#C2414B]"
                  id={`${fieldId}-password-error`}
                >
                  {fieldErrors.password}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <label
                  className="flex items-center gap-2.5 text-sm text-[#344054]"
                  htmlFor={`${fieldId}-remember`}
                >
                  <input
                    checked={remember}
                    className="h-4 w-4 rounded border-[#C9D6E8] accent-[#14213D]"
                    disabled={busy}
                    id={`${fieldId}-remember`}
                    name="remember"
                    onChange={(event) => setRemember(event.target.checked)}
                    type="checkbox"
                  />
                  Beni hatırla
                </label>

                <button
                  className="text-sm font-medium text-[#243B64] underline underline-offset-4 transition hover:text-[#B65A12]"
                  onClick={() => setShowPasswordHint((current) => !current)}
                  type="button"
                >
                  Şifremi unuttum
                </button>
              </div>

              {showPasswordHint ? (
                <p className="mt-3 rounded-lg border border-[#E4EAF2] bg-[#F8FAFC] px-4 py-3 text-sm leading-6 text-[#667085]">
                  Şifrenizi sıfırlamak için kurum operasyon sorumlunuzla iletişime
                  geçin.
                </p>
              ) : null}

              <button
                className="mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#14213D] text-sm font-semibold text-white transition hover:bg-[#243B64] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#243B64]/35 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={busy}
                type="submit"
              >
                {busy ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
                    />
                    {isRedirecting ? "Yönlendiriliyor" : "Giriş yapılıyor"}
                  </>
                ) : (
                  "Giriş yap"
                )}
              </button>

              <p aria-live="polite" className="sr-only">
                {busy ? "Giriş bilgileri doğrulanıyor" : ""}
              </p>
            </form>

            <p className="mt-6 text-sm leading-6 text-[#667085]">
              Hesabınızın güvenliği için yalnızca size ait giriş bilgilerini
              kullanın.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
