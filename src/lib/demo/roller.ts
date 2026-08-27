export type RolKey = "merkez" | "il" | "koordinator" | "yonetici";

export type Rol = {
  key: RolKey;
  ad: string;
  unvan: string;
  kapsam: string;
  basHarf: string;
  base: string;
  nav: { href: string; label: string }[];
};

export const ROLLER: Record<RolKey, Rol> = {
  merkez: {
    key: "merkez",
    ad: "Selin Aksoy",
    unvan: "Merkez Operasyon",
    kapsam: "Genel Müdürlük",
    basHarf: "SA",
    base: "/merkez-paneli",
    nav: [
      { href: "/merkez-paneli", label: "Genel bakış" },
      { href: "/merkez-paneli/gorevler", label: "Görevler" },
      { href: "/merkez-paneli/egitimler", label: "Eğitimler" },
      { href: "/merkez-paneli/gorevler/yeni", label: "Görev oluştur" },
      { href: "/merkez-paneli/iller", label: "İller" },
      { href: "/merkez-paneli/bildirimler", label: "Bildirimler" },
    ],
  },
  il: {
    key: "il",
    ad: "Hakan Demirtaş",
    unvan: "İl Sorumlusu",
    kapsam: "İstanbul",
    basHarf: "HD",
    base: "/il-paneli",
    nav: [
      { href: "/il-paneli", label: "Genel bakış" },
      { href: "/il-paneli/gorevlerim", label: "Görevlerim" },
      { href: "/il-paneli/atolyeler", label: "Atölyeler" },
      { href: "/il-paneli/malzeme-talepleri", label: "Malzeme talepleri" },
      { href: "/il-paneli/bildirimler", label: "Bildirimler" },
    ],
  },
  koordinator: {
    key: "koordinator",
    ad: "Emre Şahin",
    unvan: "Koordinatör",
    kapsam: "Marmara Bölgesi",
    basHarf: "EŞ",
    base: "/koordinator-paneli",
    nav: [
      { href: "/koordinator-paneli", label: "Operasyon takibi" },
      { href: "/koordinator-paneli/iller", label: "İller" },
      { href: "/koordinator-paneli/raporlar", label: "Raporlar" },
      { href: "/koordinator-paneli/bildirimler", label: "Bildirimler" },
    ],
  },
  yonetici: {
    key: "yonetici",
    ad: "Kerem Aydın",
    unvan: "Yetkili Yönetici",
    kapsam: "Türkiye",
    basHarf: "KA",
    base: "/yonetici-paneli",
    nav: [
      { href: "/yonetici-paneli", label: "Operasyon özeti" },
      { href: "/yonetici-paneli/iller", label: "İller" },
      { href: "/yonetici-paneli/egitimler", label: "Eğitimler" },
      { href: "/yonetici-paneli/raporlar", label: "Raporlar" },
      { href: "/yonetici-paneli/bildirimler", label: "Bildirimler" },
    ],
  },
};
