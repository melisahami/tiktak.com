import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TikTak Türkiye",
  description:
    "Eğitim operasyonları için görev, hazırlık, malzeme ve yoklama yönetimi",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
