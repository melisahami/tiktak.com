import type { Metadata } from "next";

import { RolePageShell } from "@/components/layout/role-page-shell";

export const metadata: Metadata = {
  title: "Yönetici dashboard · TikTak Türkiye",
  description:
    "Türkiye geneli operasyon göstergelerini, kritik riskleri ve dönem hazırlık ilerlemesini üst seviyede izleyin.",
};

export default function ExecutiveDashboardPage() {
  return (
    <RolePageShell
      breadcrumb="Operasyon / Yönetici dashboard"
      description="Türkiye geneli operasyon göstergelerini, kritik riskleri ve dönem hazırlık ilerlemesini üst seviyede izleyin."
      eyebrow="Genel yönetim"
      highlights={[
        {
          label: "Aktif operasyon görevi",
          value: "86",
          description: "Tüm iller genelinde",
          tone: "navy",
        },
        {
          label: "Kritik risk",
          value: "3",
          description: "Öncelikli aksiyon gerektiren",
          tone: "danger",
        },
        {
          label: "Eğitime hazır atölye",
          value: "31 / 42",
          description: "Dönem hazırlığı tamamlananlar",
          tone: "success",
        },
      ]}
      notes={[
        {
          title: "Dönem ilerlemesi",
          description:
            "Güz Dönemi 2026 hazırlık takvimini ve tamamlanma oranını izleyin.",
        },
        {
          title: "Yönetim raporu",
          description:
            "Bölge ve il bazlı performans özetlerini tek görünümde derleyin.",
        },
      ]}
      role="executive"
      title="Yönetici dashboard"
    />
  );
}
