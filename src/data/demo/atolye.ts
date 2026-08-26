/* Atölye Sorumlusu paneli demo verisi.
   Sunucu yok; tüm mutasyonlar ilgili sayfanın client state'inde tutulur.
   Mevcut projenizde demo veri dosyanız varsa bu tipleri oraya taşıyıp
   bu dosyayı re-export haline getirebilirsiniz. */

export type Durum = string;

export const SORUMLU = {
  ad: "Zeynep Yıldız",
  unvan: "Atölye Sorumlusu",
  atolye: "Üsküdar Atölyesi",
  il: "İstanbul",
  basHarf: "ZY",
};

/* ── Genel bakış ─────────────────────────────────────────── */

export type AtolyeGorev = {
  ad: string; egitim: string; termin: string;
  oncelik: "Düşük" | "Orta" | "Yüksek" | "Kritik";
  durum: Durum; ilerleme: number; hedef: string;
};

export const GOREVLER: AtolyeGorev[] = [
  { ad: "Eğitim öncesi hazırlık ve malzeme kontrolü", egitim: "Robotik ve Kodlama / Grup A", termin: "20 Eylül 2026", oncelik: "Kritik", durum: "Eksik var", ilerleme: 70, hedef: "/atolye-paneli/malzeme" },
  { ad: "Eğitmen hazırlık onaylarını takip et", egitim: "Robotik ve Kodlama / Grup B", termin: "19 Eylül 2026", oncelik: "Yüksek", durum: "Devam ediyor", ilerleme: 45, hedef: "/atolye-paneli/hazirlik" },
  { ad: "Ders yoklamalarını izle", egitim: "Robotik ve Kodlama / Grup A", termin: "18 Eylül 2026", oncelik: "Orta", durum: "Devam ediyor", ilerleme: 60, hedef: "/atolye-paneli/egitmenler" },
  { ad: "Atölye güvenlik kontrol formunu doldur", egitim: "Tüm eğitimler", termin: "25 Eylül 2026", oncelik: "Düşük", durum: "Bekliyor", ilerleme: 0, hedef: "/atolye-paneli" },
];

export const YAKLASAN = [
  { zaman: "18 Eylül, 10:00", islem: "Robotik ve Kodlama / Grup A yoklaması" },
  { zaman: "18 Eylül, 16:00", islem: "Eğitmen hazırlık kontrolü termin tarihi" },
  { zaman: "20 Eylül", islem: "Eğitim öncesi malzeme kontrolü termin tarihi" },
];

export const UYARILAR: { metin: string; tone: "err" | "warn" | "info"; eylem: string; hedef: string }[] = [
  { metin: "Robotik ve Kodlama / Grup A için 3 açık malzeme eksik bildirimi bulunuyor.", tone: "err", eylem: "Malzeme kontrolüne git", hedef: "/atolye-paneli/malzeme" },
  { metin: "Temel Elektronik / Grup A için eğitmen hazırlığı henüz tamamlanmadı.", tone: "warn", eylem: "Eğitim hazırlığına git", hedef: "/atolye-paneli/hazirlik" },
  { metin: "Robotik ve Kodlama / Grup A yoklaması ders saatinde başlatılmadı.", tone: "warn", eylem: "Eğitmenler ekranına git", hedef: "/atolye-paneli/egitmenler" },
];

/* ── Eğitim hazırlığı ────────────────────────────────────── */

export type Dokuman = { ad: string; meta: string };

export const DOKUMANLAR: Dokuman[] = [
  { ad: "Robotik ve Kodlama – Eğitim planı ve müfredat", meta: "PDF · 2,1 MB · Merkez Operasyon" },
  { ad: "Atölye eğitim öncesi hazırlık yönergesi", meta: "PDF · 640 KB · Merkez Operasyon" },
];

export type EgitimSatiri = {
  id: string; egitim: string; grup: string; egitmen: string; sure: string;
  egitmenHazirlik: Durum; malzeme: Durum; atolyeHazirlik: Durum;
};

export const EGITIM_SATIRLARI: EgitimSatiri[] = [
  { id: "A", egitim: "Robotik ve Kodlama", grup: "Grup A", egitmen: "Ayşe Demir", sure: "8 hafta", egitmenHazirlik: "Tamamlandı", malzeme: "Kritik eksik", atolyeHazirlik: "Bekliyor" },
  { id: "B", egitim: "Robotik ve Kodlama", grup: "Grup B", egitmen: "Ayşe Demir", sure: "8 hafta", egitmenHazirlik: "Tamamlandı", malzeme: "Uygun", atolyeHazirlik: "Onaylandı" },
  { id: "C", egitim: "Temel Elektronik", grup: "Grup A", egitmen: "Kerem Aydın", sure: "6 hafta", egitmenHazirlik: "Bekliyor", malzeme: "Uygun", atolyeHazirlik: "Bekliyor" },
];

export const HAZIRLIK_KONTROL = [
  "Eğitim dokümanları atölyeye iletildi",
  "Eğitmen hazırlık onayı alındı",
  "Tüm dönem malzeme uygunluğu doğrulandı",
  "Atölye fiziki düzeni ve güvenlik kontrolü yapıldı",
  "Öğrenci listesi ve grup düzeni kesinleşti",
];

/* ── Malzeme kontrolü ────────────────────────────────────── */

export type MalzemeSatiri = {
  id: number; egitim: string; grup: string; hafta: string;
  ad: string; gerekli: number; mevcut: number;
};

export const MALZEMELER: MalzemeSatiri[] = [
  { id: 1, egitim: "Robotik ve Kodlama", grup: "Grup A", hafta: "Hafta 1", ad: "Arduino Uno", gerekli: 15, mevcut: 15 },
  { id: 2, egitim: "Robotik ve Kodlama", grup: "Grup A", hafta: "Hafta 2", ad: "USB kablo", gerekli: 15, mevcut: 15 },
  { id: 3, egitim: "Robotik ve Kodlama", grup: "Grup A", hafta: "Hafta 3", ad: "Ultrasonik sensör", gerekli: 15, mevcut: 12 },
  { id: 4, egitim: "Robotik ve Kodlama", grup: "Grup A", hafta: "Hafta 4", ad: "Breadboard", gerekli: 15, mevcut: 13 },
  { id: 5, egitim: "Robotik ve Kodlama", grup: "Grup A", hafta: "Hafta 5", ad: "Direnç seti", gerekli: 15, mevcut: 15 },
  { id: 6, egitim: "Robotik ve Kodlama", grup: "Grup A", hafta: "Hafta 6", ad: "Servo motor", gerekli: 15, mevcut: 15 },
  { id: 7, egitim: "Robotik ve Kodlama", grup: "Grup A", hafta: "Hafta 7", ad: "Jumper kablo seti", gerekli: 15, mevcut: 10 },
  { id: 8, egitim: "Robotik ve Kodlama", grup: "Grup A", hafta: "Hafta 8", ad: "9V pil", gerekli: 15, mevcut: 15 },
  { id: 9, egitim: "Temel Elektronik", grup: "Grup A", hafta: "Hafta 1", ad: "Multimetre", gerekli: 15, mevcut: 15 },
  { id: 10, egitim: "Temel Elektronik", grup: "Grup A", hafta: "Hafta 2", ad: "Lehim seti", gerekli: 15, mevcut: 15 },
];

export const TALEP_DURUMLARI = ["Açık", "Transfer planlandı", "Teslim alındı"] as const;
export type TalepDurumu = (typeof TALEP_DURUMLARI)[number];

/* ── Eğitmenler: ders yoklaması ──────────────────────────── */

export type DersOturumu = {
  id: string; egitmen: string; egitim: string; grup: string;
  tarih: string; saat: string; ogrenciSayisi: number;
  yoklamaDurumu: Durum; katilim: string;
};

export const DERS_OTURUMLARI: DersOturumu[] = [
  { id: "d1", egitmen: "Ayşe Demir", egitim: "Robotik ve Kodlama", grup: "Grup A", tarih: "18 Eylül 2026", saat: "10:00–12:00", ogrenciSayisi: 15, yoklamaDurumu: "Başlatılmadı", katilim: "—" },
  { id: "d2", egitmen: "Ayşe Demir", egitim: "Robotik ve Kodlama", grup: "Grup B", tarih: "19 Eylül 2026", saat: "13:00–15:00", ogrenciSayisi: 14, yoklamaDurumu: "Bekliyor", katilim: "—" },
  { id: "d3", egitmen: "Kerem Aydın", egitim: "Temel Elektronik", grup: "Grup A", tarih: "10 Eylül 2026", saat: "10:00–12:00", ogrenciSayisi: 15, yoklamaDurumu: "Tamamlandı", katilim: "%93" },
];

export type Ogrenci = { id: string; ad: string; no: string; durum: Durum; saat: string };

export const OGRENCILER: Ogrenci[] = [
  { id: "o1", ad: "Elif Yılmaz", no: "202601", durum: "Bekleniyor", saat: "–" },
  { id: "o2", ad: "Can Arslan", no: "202602", durum: "Katıldı", saat: "10:04" },
  { id: "o3", ad: "Deniz Kaya", no: "202603", durum: "Bekleniyor", saat: "–" },
  { id: "o4", ad: "Ece Aydın", no: "202604", durum: "Bekleniyor", saat: "–" },
  { id: "o5", ad: "Yusuf Şen", no: "202605", durum: "Katıldı", saat: "10:02" },
  { id: "o6", ad: "Zeynep Ak", no: "202606", durum: "Katıldı", saat: "10:01" },
  { id: "o7", ad: "Mert Bulut", no: "202607", durum: "Katıldı", saat: "10:05" },
  { id: "o8", ad: "Nisa Doğan", no: "202608", durum: "Geç katıldı", saat: "10:12" },
  { id: "o9", ad: "Arda Koç", no: "202609", durum: "Katıldı", saat: "10:03" },
  { id: "o10", ad: "Selin Umut", no: "202610", durum: "Katıldı", saat: "10:02" },
];

/* ── Eğitmenler: eğitmen yoklaması ───────────────────────── */

export type EgitmenYoklama = {
  id: string; egitmen: string; egitim: string; grup: string;
  tarih: string; saat: string; durum: Durum; gelis: string; not: string; guncelleyen: string;
};

export const EGITMEN_YOKLAMALARI: EgitmenYoklama[] = [
  { id: "r1", egitmen: "Ayşe Demir", egitim: "Robotik ve Kodlama", grup: "Grup A", tarih: "18 Eylül 2026", saat: "10:00", durum: "Bekleniyor", gelis: "–", not: "–", guncelleyen: "–" },
  { id: "r2", egitmen: "Ayşe Demir", egitim: "Robotik ve Kodlama", grup: "Grup B", tarih: "17 Eylül 2026", saat: "13:00", durum: "Katıldı", gelis: "12:54", not: "Zamanında geldi", guncelleyen: "Zeynep Yıldız, 17 Eylül 2026, 12:56" },
  { id: "r3", egitmen: "Kerem Aydın", egitim: "Temel Elektronik", grup: "Grup A", tarih: "19 Eylül 2026", saat: "10:00", durum: "Bekleniyor", gelis: "–", not: "–", guncelleyen: "–" },
];

export const EGITMEN_DURUMLARI = ["Bekleniyor", "Katıldı", "Geç katıldı", "Katılmadı"] as const;

/* ── Bildirimler ─────────────────────────────────────────── */

export type Bildirim = {
  id: number; kategori: string; tur: string; baslik: string; metin: string;
  ilgili: string; zaman: string; href: string; okundu?: boolean;
};

export const BILDIRIM_FILTRELERI = [
  "Tümü", "Eğitim hazırlığı", "Malzeme", "Görevler", "Yoklama",
];

export const BILDIRIMLER: Bildirim[] = [
  { id: 1, kategori: "Eğitim hazırlığı", tur: "Eğitim hazırlığı", baslik: "Robotik ve Kodlama / Grup A için Ayşe Demir ders hazırlığını tamamladı.", metin: "Hafta 3 hazırlık maddeleri onaylandı.", ilgili: "Robotik ve Kodlama / Grup A", zaman: "17 Eylül 2026, 15:40", href: "/atolye-paneli/hazirlik" },
  { id: 2, kategori: "Malzeme", tur: "Malzeme", baslik: "Robotik ve Kodlama / Grup A için 3 malzeme kalemi eksik bildirildi.", metin: "Toplam 10 adet eksik bulunuyor.", ilgili: "Üsküdar Atölyesi", zaman: "18 Eylül 2026, 11:40", href: "/atolye-paneli/malzeme" },
  { id: 3, kategori: "Görevler", tur: "Görev", baslik: "Üsküdar Atölyesi için yeni görev atandı: Eğitim öncesi malzeme kontrolünü tamamla.", metin: "Termin: 20 Eylül 2026. Öncelik: Kritik.", ilgili: "Merkez Operasyon görevi", zaman: "13 Eylül 2026, 09:15", href: "/atolye-paneli" },
  { id: 4, kategori: "Yoklama", tur: "Yoklama", baslik: "Robotik ve Kodlama / Grup A yoklaması henüz başlatılmadı.", metin: "Ders saati 10:00 olarak planlandı.", ilgili: "Eğitmen: Ayşe Demir", zaman: "18 Eylül 2026, 10:12", href: "/atolye-paneli/egitmenler" },
  { id: 5, kategori: "Eğitim hazırlığı", tur: "Eğitim hazırlığı", baslik: "Robotik ve Kodlama / Grup B eğitim hazırlığı İl Sorumlusuna iletildi.", metin: "Onay 18 Eylül 2026, 14:35 tarihinde verildi.", ilgili: "Robotik ve Kodlama / Grup B", zaman: "18 Eylül 2026, 14:35", href: "/atolye-paneli/hazirlik", okundu: true },
  { id: 6, kategori: "Yoklama", tur: "Yoklama", baslik: "Robotik ve Kodlama / Grup A yoklaması Ayşe Demir tarafından güncellendi.", metin: "Katılım kaydı güncellendi, işlem geçmişine eklendi.", ilgili: "Robotik ve Kodlama / Grup A", zaman: "18 Eylül 2026, 12:15", href: "/atolye-paneli/egitmenler" },
];

export const YOKLAMA_ISLEM_GECMISI = [
  {
    zaman: "18 Eylül 2026, 12:15", aktor: "Ayşe Demir",
    degisiklik: "Nisa Doğan (202608) katılım durumu güncellendi.",
    gerekce: "Öğrenci derse 12 dakika gecikmeli katıldı.",
    bilgilendirilen: "Atölye Sorumlusu, İl Sorumlusu",
  },
];
