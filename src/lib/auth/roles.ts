import type { LoginAudience, UserRole } from "@/types/auth";

export const ROLE_LABELS: Record<UserRole, string> = {
  central_operations: "Merkez Operasyon Ekibi",
  province_manager: "İl Sorumlusu",
  workshop_manager: "Atölye Sorumlusu",
  instructor: "Eğitmen",
  coordinator: "Koordinatör",
  executive: "Yetkili Yönetici",
  student: "Öğrenci",
};

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  central_operations: "/merkez-paneli",
  province_manager: "/il-paneli",
  workshop_manager: "/atolye-paneli",
  instructor: "/egitmen-paneli",
  coordinator: "/koordinator-paneli",
  executive: "/yonetici-paneli",
  student: "/ogrenci-ana-sayfa",
};

export const AUDIENCE_OF_ROLE: Record<UserRole, LoginAudience> = {
  central_operations: "employee",
  province_manager: "employee",
  workshop_manager: "employee",
  instructor: "employee",
  coordinator: "employee",
  executive: "employee",
  student: "student",
};

export function roleLabel(role: UserRole): string {
  return ROLE_LABELS[role];
}

export function redirectForRole(role: UserRole): string {
  return ROLE_REDIRECTS[role];
}
