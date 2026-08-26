import type { Metadata } from "next";

import { LoginView } from "@/app/giris/login-view";

export const metadata: Metadata = {
  title: "Giriş yapın · TikTakTürkiye Operasyon",
  description:
    "TikTakTürkiye Operasyon platformuna çalışan veya öğrenci hesabınızla giriş yapın.",
};

export default function GirisPage() {
  return <LoginView />;
}
