import type { Metadata } from "next";

import { RolePageShell } from "@/components/layout/role-page-shell";

export const metadata: Metadata = {
  title: "Eğitmen paneli · TikTakTürkiye Operasyon",
  description: "Ders hazırlık bildirimlerinizi iletin, oturum planınızı görün ve yoklama akışını yönetin.",
};

export default function InstructorPanelPage() {
  return (
    <RolePageShell
      breadcrumb="Operasyon / Eğitmen paneli"
      description="Ders hazırlık bildirimlerinizi iletin, oturum planınızı görün ve yoklama akışını yönetin."
      eyebrow="Eğitim hazırlığı"
      highlights={[
        {
          label: "Yaklaşan oturum",
          value: "3",
          description: "Önümüzdeki iki hafta içinde",
          tone: "navy",
        },
        {
          label: "Hazırlık bildirimi",
          value: "2",
          description: "Gönderilmeyi bekleyen ders",
          tone: "amber",
        },
        {
          label: "Yoklama tamamlanan",
          value: "9 / 11",
          description: "Bu döneme ait oturumlar",
          tone: "success",
        },
      ]}
      notes={[
        {
          title: "Ders hazırlık bildirimi",
          description: "Her oturum öncesi malzeme ve içerik hazırlığınızı atölye sorumlusuna bildirin.",
        },
        {
          title: "Yoklama yönetimi",
          description: "Dört haneli PIN ile öğrenci katılımını toplayın ve eksik katılımları işaretleyin.",
        },
      ]}
      role="instructor"
      title="Eğitmen paneli"
    />
  );
}
