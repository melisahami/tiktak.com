import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TikTakTürkiye Operasyon",
  description:
    "Eğitim operasyonları için görev, hazırlık, malzeme ve yoklama yönetimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}