import type { Metadata } from "next";

import { RolePageShell } from "@/components/layout/role-page-shell";

export const metadata: Metadata = {
  title: "Atölye paneli · TikTakTürkiye Operasyon",
  description: "Atölyenizin malzeme kontrolünü tamamlayın, eğitmen hazırlıklarını doğrulayın ve eğitime hazır onayını verin.",
};

export default function WorkshopPanelPage() {
  return (
    <RolePageShell
      breadcrumb="Operasyon / Atölye paneli"
      description="Atölyenizin malzeme kontrolünü tamamlayın, eğitmen hazırlıklarını doğrulayın ve eğitime hazır onayını verin."
      eyebrow="Atölye operasyonu"
      highlights={[
        {
          label: "Açık görev",
          value: "6",
          description: "İşlem bekleyen atölye görevleri",
          tone: "navy",
        },
        {
          label: "Eksik malzeme",
          value: "3",
          description: "Bildirilen ve temin bekleyen kalem",
          tone: "danger",
        },
        {
          label: "Hazır eğitim grubu",
          value: "4 / 6",
          description: "Hazırlığı tamamlanan gruplar",
          tone: "success",
        },
      ]}
      notes={[
        {
          title: "Dönem malzeme kontrolü",
          description: "Eğitim başlamadan tüm dönem malzemelerinin yeterliliğini kalem bazında doğrulayın.",
        },
        {
          title: "Eğitime hazır onayı",
          description: "Eğitmen hazırlıkları ve malzeme kontrolü tamamlandığında atölyeyi hazır olarak işaretleyin.",
        },
      ]}
      role="workshop_manager"
      title="Atölye paneli"
    />
  );
}
