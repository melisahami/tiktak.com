/* Rollerin paylaştığı operasyon verisi:
   dönem görevi, görev listesi, il tabloları, eğitimler, bildirimler. */

export type Oncelik = "Düşük" | "Orta" | "Yüksek" | "Kritik";
export type Durum = string;

export const DONEM_GOREVI = {
  ad: "Robotik ve Kodlama Güz Dönemi eğitim öncesi hazırlık ve malzeme kontrolü",
  termin: "20 Eylül 2026",
  egitimBaslangici: "30 Eylül 2026",
  tamamlanma: 64,
  atananIl: 5,
  oncelik: "Kritik" as Oncelik,
};

export type Gorev = {
  id: string; ad: string; il: string; atolye: string; sorumlu: string;
  termin: string; durum: Durum; oncelik: Oncelik; risk: Durum;
  gecikme: string; guncelleme: string; ilerleme: number;
};

export const GOREVLER: Gorev[] = [
  { id: "g1", ad: "Malzeme sayımı ve teslim onayı", il: "Bursa", atolye: "Nilüfer Atölyesi", sorumlu: "Emre Şahin", termin: "14 Eylül 2026", durum: "Gecikti", oncelik: "Kritik", risk: "Aksiyon gerekli", gecikme: "4 gün", guncelleme: "16 Eylül 2026, 09:12", ilerleme: 35 },
  { id: "g2", ad: "Eğitim öncesi hazırlık ve malzeme kontrolü", il: "İstanbul", atolye: "Üsküdar Atölyesi", sorumlu: "Zeynep Yıldız", termin: "20 Eylül 2026", durum: "Eksik var", oncelik: "Kritik", risk: "Risk", gecikme: "Eğitime 10 gün", guncelleme: "18 Eylül 2026, 11:40", ilerleme: 70 },
  { id: "g3", ad: "Eğitim öncesi hazırlık ve malzeme kontrolü", il: "Ankara", atolye: "Keçiören Atölyesi", sorumlu: "Ahmet Türkmen", termin: "20 Eylül 2026", durum: "Devam ediyor", oncelik: "Orta", risk: "İzlemede", gecikme: "—", guncelleme: "18 Eylül 2026, 10:05", ilerleme: 55 },
  { id: "g4", ad: "Yoklama sistemi kontrolü", il: "İzmir", atolye: "Karşıyaka Atölyesi", sorumlu: "Hakan Kurt", termin: "17 Eylül 2026", durum: "Tamamlandı", oncelik: "Düşük", risk: "İzlemede", gecikme: "—", guncelleme: "17 Eylül 2026, 16:20", ilerleme: 100 },
  { id: "g5", ad: "Atölye hazırlık onayı", il: "Kocaeli", atolye: "İzmit Atölyesi", sorumlu: "Selin Korkmaz", termin: "24 Eylül 2026", durum: "Bekliyor", oncelik: "Orta", risk: "İzlemede", gecikme: "—", guncelleme: "15 Eylül 2026, 14:02", ilerleme: 10 },
  { id: "g6", ad: "Eğitmen ders hazırlığı takibi", il: "Bursa", atolye: "Nilüfer Atölyesi", sorumlu: "Emre Şahin", termin: "26 Eylül 2026", durum: "Devam ediyor", oncelik: "Orta", risk: "İzlemede", gecikme: "—", guncelleme: "18 Eylül 2026, 08:45", ilerleme: 40 },
];

export const GOREV_ALT_ADIMLARI = [
  { ad: "Eğitim dokümanlarının atölyelere iletilmesi", sorumlu: "Merkez Operasyon", durum: "Tamamlandı" },
  { ad: "Eğitmen hazırlık onaylarının alınması", sorumlu: "Atölye Sorumlusu", durum: "Devam ediyor" },
  { ad: "Tüm dönem malzeme uygunluk kontrolü", sorumlu: "Atölye Sorumlusu", durum: "Eksik var" },
  { ad: "Atölye hazırlık onayı", sorumlu: "Atölye Sorumlusu", durum: "Bekliyor" },
  { ad: "İl onayı ve merkeze bildirim", sorumlu: "İl Sorumlusu", durum: "Bekliyor" },
];

export type IlSatiri = {
  ad: string; toplam: number; tamamlanan: number; devam: number;
  geciken: number; hazirAtolye: string; oran: number; aksiyon: boolean;
  atolyeSayisi: number; sorumlu: string;
};

export const ILLER: IlSatiri[] = [
  { ad: "İstanbul", toplam: 18, tamamlanan: 11, devam: 6, geciken: 1, hazirAtolye: "7 / 9", oran: 61, aksiyon: true, atolyeSayisi: 9, sorumlu: "Hakan Demirtaş" },
  { ad: "Ankara", toplam: 12, tamamlanan: 9, devam: 3, geciken: 0, hazirAtolye: "6 / 7", oran: 75, aksiyon: false, atolyeSayisi: 7, sorumlu: "Ahmet Türkmen" },
  { ad: "İzmir", toplam: 10, tamamlanan: 8, devam: 2, geciken: 0, hazirAtolye: "5 / 6", oran: 80, aksiyon: false, atolyeSayisi: 6, sorumlu: "Hakan Kurt" },
  { ad: "Bursa", toplam: 9, tamamlanan: 4, devam: 3, geciken: 2, hazirAtolye: "2 / 5", oran: 44, aksiyon: true, atolyeSayisi: 5, sorumlu: "Emre Şahin" },
  { ad: "Kocaeli", toplam: 7, tamamlanan: 4, devam: 3, geciken: 0, hazirAtolye: "3 / 4", oran: 57, aksiyon: false, atolyeSayisi: 4, sorumlu: "Selin Korkmaz" },
];

export type Egitim = {
  ad: string; donem: string; atolye: number; hazir: number; eksik: number;
  devam: number; baslangic: number; kalanGun: number;
};

export const EGITIMLER: Egitim[] = [
  { ad: "Robotik ve Kodlama", donem: "Güz Dönemi 2026", atolye: 42, hazir: 31, eksik: 5, devam: 6, baslangic: 0, kalanGun: 10 },
  { ad: "Temel Elektronik", donem: "Güz Dönemi 2026", atolye: 28, hazir: 19, eksik: 3, devam: 6, baslangic: 0, kalanGun: 22 },
  { ad: "Tasarım ve Üretim", donem: "Güz Dönemi 2026", atolye: 16, hazir: 6, eksik: 4, devam: 6, baslangic: 0, kalanGun: 38 },
];

export const EGITIM_BASLANGICLARI = [
  { ad: "Robotik ve Kodlama", meta: "30 Eylül 2026 · 42 atölye", durum: "Eksik var" },
  { ad: "Temel Elektronik", meta: "12 Ekim 2026 · 28 atölye", durum: "Devam ediyor" },
  { ad: "Tasarım ve Üretim", meta: "28 Ekim 2026 · 16 atölye", durum: "Bekliyor" },
];

export type Atolye = {
  ad: string; il: string; sorumlu: string; egitim: string;
  durum: Durum; eksikKalem: number; meta: string;
};

export const ATOLYELER: Atolye[] = [
  { ad: "Üsküdar Atölyesi", il: "İstanbul", sorumlu: "Zeynep Yıldız", egitim: "Robotik ve Kodlama", durum: "Eksik var", eksikKalem: 3, meta: "2 grup · 29 öğrenci" },
  { ad: "Kadıköy Atölyesi", il: "İstanbul", sorumlu: "Murat Eren", egitim: "Robotik ve Kodlama", durum: "Hazır", eksikKalem: 0, meta: "2 grup · 30 öğrenci" },
  { ad: "Beşiktaş Atölyesi", il: "İstanbul", sorumlu: "Nazlı Şimşek", egitim: "Temel Elektronik", durum: "Devam ediyor", eksikKalem: 1, meta: "1 grup · 15 öğrenci" },
];

export type Talep = {
  id: number; malzeme: string; adet: number; atolye: string;
  egitim: string; durum: "Açık" | "Transfer planlandı" | "Teslim alındı"; tarih: string;
};

export const MALZEME_TALEPLERI: Talep[] = [
  { id: 1, malzeme: "Ultrasonik sensör", adet: 3, atolye: "Üsküdar Atölyesi", egitim: "Robotik ve Kodlama / Grup A", durum: "Açık", tarih: "18 Eylül 2026" },
  { id: 2, malzeme: "Breadboard", adet: 2, atolye: "Üsküdar Atölyesi", egitim: "Robotik ve Kodlama / Grup A", durum: "Transfer planlandı", tarih: "18 Eylül 2026" },
  { id: 3, malzeme: "Jumper kablo seti", adet: 5, atolye: "Üsküdar Atölyesi", egitim: "Robotik ve Kodlama / Grup A", durum: "Açık", tarih: "18 Eylül 2026" },
  { id: 4, malzeme: "Multimetre", adet: 1, atolye: "Beşiktaş Atölyesi", egitim: "Temel Elektronik / Grup A", durum: "Teslim alındı", tarih: "14 Eylül 2026" },
];

export type Bulgu = { metin: string; tone: "err" | "warn" | "info"; eylem: string; hedef: string };

export const RISKLER: Bulgu[] = [
  { metin: "Nilüfer Atölyesi görevi 4 gündür gecikiyor; eğitim başlangıcı risk altında.", tone: "err", eylem: "Görevi aç", hedef: "gorev:g1" },
  { metin: "Üsküdar Atölyesi için 3 malzeme kaleminde eksik bulunuyor.", tone: "warn", eylem: "Görevi aç", hedef: "gorev:g2" },
  { metin: "Bursa ilinde hazır atölye oranı %40'ın altında.", tone: "warn", eylem: "İl detayına git", hedef: "iller" },
];

export type Bildirim = {
  id: number; kategori: string; tur: string; baslik: string; metin: string;
  ilgili: string; zaman: string; okundu?: boolean;
};

export const BILDIRIM_FILTRELERI = ["Tümü", "Görevler", "Malzeme", "Yoklama", "Eğitim hazırlığı"];

export const BILDIRIMLER: Bildirim[] = [
  { id: 1, kategori: "Görevler", tur: "Görev gecikti", baslik: "Nilüfer Atölyesi görevi 4 gündür gecikiyor.", metin: "Malzeme sayımı ve teslim onayı görevi tamamlanmadı.", ilgili: "Bursa / Nilüfer Atölyesi", zaman: "18 Eylül 2026, 08:30" },
  { id: 2, kategori: "Malzeme", tur: "Malzeme eksiği", baslik: "Üsküdar Atölyesi 3 malzeme kaleminde eksik bildirdi.", metin: "Toplam 10 adet eksik bulunuyor.", ilgili: "İstanbul / Üsküdar Atölyesi", zaman: "18 Eylül 2026, 11:40" },
  { id: 3, kategori: "Eğitim hazırlığı", tur: "Hazırlık tamamlandı", baslik: "Robotik ve Kodlama / Grup B eğitim hazırlığı onaylandı.", metin: "Atölye hazırlığı İl Sorumlusuna iletildi.", ilgili: "İstanbul / Üsküdar Atölyesi", zaman: "18 Eylül 2026, 14:35" },
  { id: 4, kategori: "Görevler", tur: "Görev atandı", baslik: "Eğitim öncesi hazırlık görevi il sorumlularına atandı.", metin: "5 il ve 9 atölye için alt görevler oluşturuldu.", ilgili: "Merkez Operasyon", zaman: "13 Eylül 2026, 09:15", okundu: true },
  { id: 5, kategori: "Yoklama", tur: "Yoklama başlatılmadı", baslik: "Üsküdar Atölyesi Grup A için yoklama başlatılmadı.", metin: "Ders saati 10:00 olarak planlandı.", ilgili: "Eğitmen: Ayşe Demir", zaman: "18 Eylül 2026, 10:12" },
  { id: 6, kategori: "Malzeme", tur: "Transfer", baslik: "Breadboard talebi için transfer planlandı.", metin: "2 adet, 19 Eylül 2026 tarihinde teslim edilecek.", ilgili: "İstanbul / Üsküdar Atölyesi", zaman: "18 Eylül 2026, 15:10", okundu: true },
];

export const RAPOR_OZETI = [
  { etiket: "Toplam görev", deger: "56", not: "5 il · 31 atölye" },
  { etiket: "Tamamlanan", deger: "36", not: "%64 tamamlanma" },
  { etiket: "Geciken", deger: "3", not: "1 kritik" },
  { etiket: "Hazır atölye", deger: "23 / 31", not: "Eğitime 10 gün" },
];
