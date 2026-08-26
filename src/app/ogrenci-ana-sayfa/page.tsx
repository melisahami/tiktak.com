import type { Metadata } from "next";

import { RolePageShell } from "@/components/layout/role-page-shell";

export const metadata: Metadata = {
  title: "Öğrenci ana sayfası · TikTakTürkiye Operasyon",
  description: "Ders programınızı görün, yoklama durumunuzu takip edin ve oturum PIN kodunuzla katılım bildirin.",
};

export default function StudentHomePage() {
  return (
    <RolePageShell
      breadcrumb="Öğrenci / Ana sayfa"
      description="Ders programınızı görün, yoklama durumunuzu takip edin ve oturum PIN kodunuzla katılım bildirin."
      eyebrow="Öğrenci görünümü"
      highlights={[
        {
          label: "Yaklaşan ders",
          value: "2",
          description: "Bu hafta içindeki oturumlar",
          tone: "navy",
        },
        {
          label: "Katılım oranı",
          value: "%92",
          description: "Bu döneme ait yoklama",
          tone: "success",
        },
        {
          label: "Bekleyen yoklama",
          value: "1",
          description: "PIN ile onaylanmayı bekleyen",
          tone: "amber",
        },
      ]}
      notes={[
        {
          title: "Ders programı",
          description: "Kayıtlı olduğunuz eğitim gruplarının oturum takvimini görüntüleyin.",
        },
        {
          title: "PIN ile katılım",
          description: "Eğitmeninizin paylaştığı dört haneli PIN ile derse katılımınızı bildirin.",
        },
      ]}
      role="student"
      title="Öğrenci ana sayfası"
    />
  );
}
