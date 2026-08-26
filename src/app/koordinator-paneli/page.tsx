import type { Metadata } from "next";

import { RolePageShell } from "@/components/layout/role-page-shell";

export const metadata: Metadata = {
  title: "Koordinatör paneli · TikTakTürkiye Operasyon",
  description: "Sorumlu olduğunuz bölgedeki illerin hazırlık ilerlemesini karşılaştırın ve riskli başlıkları öne çıkarın.",
};

export default function CoordinatorPanelPage() {
  return (
    <RolePageShell
      breadcrumb="Operasyon / Koordinatör paneli"
      description="Sorumlu olduğunuz bölgedeki illerin hazırlık ilerlemesini karşılaştırın ve riskli başlıkları öne çıkarın."
      eyebrow="Bölge koordinasyonu"
      highlights={[
        {
          label: "Takip edilen il",
          value: "5",
          description: "Bölge kapsamındaki iller",
          tone: "navy",
        },
        {
          label: "Geciken görev",
          value: "4",
          description: "Termin tarihi geçmiş kayıtlar",
          tone: "danger",
        },
        {
          label: "Bölge hazırlık oranı",
          value: "%72",
          description: "Tamamlanan hazırlık adımları",
          tone: "navy",
        },
      ]}
      notes={[
        {
          title: "Bölge karşılaştırması",
          description: "İller arası hazırlık farklarını görüp gecikme nedenlerini kayıt altına alın.",
        },
        {
          title: "Risk bildirimi",
          description: "Eğitim başlangıcını tehdit eden başlıkları merkez operasyona iletin.",
        },
      ]}
      role="coordinator"
      title="Koordinatör paneli"
    />
  );
}
