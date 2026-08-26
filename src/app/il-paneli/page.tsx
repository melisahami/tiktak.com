import type { Metadata } from "next";

import { RolePageShell } from "@/components/layout/role-page-shell";

export const metadata: Metadata = {
  title: "İl operasyon paneli · TikTakTürkiye Operasyon",
  description: "İlinizdeki atölyelerin görev ilerlemesini, malzeme eksiklerini ve eğitim hazırlık durumunu takip edin.",
};

export default function ProvincePanelPage() {
  return (
    <RolePageShell
      breadcrumb="Operasyon / İl paneli"
      description="İlinizdeki atölyelerin görev ilerlemesini, malzeme eksiklerini ve eğitim hazırlık durumunu takip edin."
      eyebrow="İl koordinasyonu"
      highlights={[
        {
          label: "Atölye sayısı",
          value: "12",
          description: "İl genelinde aktif atölyeler",
          tone: "navy",
        },
        {
          label: "Eğitime hazır atölye",
          value: "8",
          description: "Tüm hazırlığı tamamlananlar",
          tone: "success",
        },
        {
          label: "Açık malzeme eksiği",
          value: "3",
          description: "Temin bekleyen kalemler",
          tone: "amber",
        },
      ]}
      notes={[
        {
          title: "Görev delegasyonu",
          description: "Merkezden gelen görevleri atölye sorumlularına dağıtın ve termin tarihlerini izleyin.",
        },
        {
          title: "Malzeme temin takibi",
          description: "Atölyelerden gelen eksik bildirimlerini önceliklendirip temin sürecini yürütün.",
        },
      ]}
      role="province_manager"
      title="İl operasyon paneli"
    />
  );
}
