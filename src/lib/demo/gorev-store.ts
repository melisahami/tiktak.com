/**
 * Görev tamamlama durumunu tüm paneller arasında paylaşan localStorage yardımcısı.
 * Yönetici, koordinatör, merkez panelleri bu key''i okuyarak "Tamamlandı" gösterir.
 * İl sorumlusu bu key''e yazar.
 */

export const GOREV_TAMAMLANDI_KEY = "tiktak.gorev.tamamlandi.v1";

export type TamamlananGorev = {
  zaman: string;
  kapatan: string;
};

/** localStorage''dan tamamlanan görevleri okur. Sunucu tarafında boş obje döner. */
export function getTamamlananGorevler(): Record<string, TamamlananGorev> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(GOREV_TAMAMLANDI_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, TamamlananGorev>;
  } catch {
    return {};
  }
}

/** Bir görevi tamamlandı olarak işaretler ve localStorage''a yazar. */
export function goreviTamamla(id: string, kapatan: string): void {
  if (typeof window === "undefined") return;
  const mevcut = getTamamlananGorevler();
  mevcut[id] = {
    zaman: new Date().toLocaleString("tr-TR"),
    kapatan,
  };
  window.localStorage.setItem(GOREV_TAMAMLANDI_KEY, JSON.stringify(mevcut));
}

/** Bir görevin tamamlanıp tamamlanmadığını kontrol eder. */
export function gorevTamamlandi(
  id: string,
  tamamlananlar: Record<string, TamamlananGorev>,
): boolean {
  return id in tamamlananlar;
}
