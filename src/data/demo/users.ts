import type { DemoUser } from "@/types/auth";

/**
 * Prototip aşamasında kullanılan merkezi demo kullanıcı listesi.
 * Bu veri yalnızca uygulama içinde kullanılır; arayüzde gösterilmez.
 */
export const DEMO_USERS: readonly DemoUser[] = [
  {
    id: "merkez-operasyon",
    email: "merkez@tiktakturkiye.gov.tr",
    password: "TikTakMerkez2026!",
    fullName: "Merkez Operasyon",
    initials: "MO",
    role: "central_operations",
    audience: "employee",
    organization: "Merkez Operasyon Ekibi",
    redirect: "/merkez-paneli",
  },
  {
    id: "istanbul-il-sorumlusu",
    email: "istanbul.il@tiktakturkiye.gov.tr",
    password: "TikTakIl2026!",
    fullName: "İstanbul İl Sorumlusu",
    initials: "İS",
    role: "province_manager",
    audience: "employee",
    organization: "İstanbul İl Koordinasyonu",
    redirect: "/il-paneli",
  },
  {
    id: "zeynep-yildiz",
    email: "zeynep.yildiz@tiktakturkiye.gov.tr",
    password: "TikTakAtolye2026!",
    fullName: "Zeynep Yıldız",
    initials: "ZY",
    role: "workshop_manager",
    audience: "employee",
    organization: "İstanbul / Üsküdar Atölyesi",
    redirect: "/atolye-paneli",
  },
  {
    id: "ayse-demir",
    email: "ayse.demir@tiktakturkiye.gov.tr",
    password: "TikTakEgitmen2026!",
    fullName: "Ayşe Demir",
    initials: "AD",
    role: "instructor",
    audience: "employee",
    organization: "Robotik ve Kodlama eğitmeni",
    redirect: "/egitmen-paneli",
  },
  {
    id: "marmara-koordinator",
    email: "marmara.koordinator@tiktakturkiye.gov.tr",
    password: "TikTakKoordinator2026!",
    fullName: "Marmara Koordinatörü",
    initials: "MK",
    role: "coordinator",
    audience: "employee",
    organization: "Marmara Bölge Koordinasyonu",
    redirect: "/koordinator-paneli",
  },
  {
    id: "yetkili-yonetici",
    email: "yonetici@tiktakturkiye.gov.tr",
    password: "TikTakYonetici2026!",
    fullName: "Yetkili Yönetici",
    initials: "YY",
    role: "executive",
    audience: "employee",
    organization: "Genel Yönetim",
    redirect: "/yonetici-dashboard",
  },
  {
    id: "elif-yilmaz",
    email: "elif.yilmaz@ogrenci.tiktakturkiye.gov.tr",
    password: "TikTakOgrenci2026!",
    fullName: "Elif Yılmaz",
    initials: "EY",
    role: "student",
    audience: "student",
    organization: "Üsküdar Atölyesi / Robotik ve Kodlama",
    redirect: "/ogrenci-ana-sayfa",
  },
];

export function findDemoUserByEmail(email: string): DemoUser | undefined {
  const normalized = email.trim().toLocaleLowerCase("tr-TR");

  return DEMO_USERS.find(
    (user) => user.email.toLocaleLowerCase("tr-TR") === normalized,
  );
}
