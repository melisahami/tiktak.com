import type { Metadata } from "next";

import { LoginView } from "@/app/giris/login-view";

export const metadata: Metadata = {
  title: "Giriş yapın · TikTak Türkiye",
  description:
    "TikTak Türkiye platformuna çalışan veya öğrenci hesabınızla giriş yapın.",
};

export default function GirisPage() {
  return <LoginView />;
}
