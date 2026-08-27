"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHead,
  Chip,
  CONTROL,
  Empty,
  Field,
  PageTitle,
  Progress,
  RowButton,
  Secondary,
  Table,
  Tabs,
  TD,
  TR,
} from "@/components/panel/ui";
import { GOREVLER, GOREV_ALT_ADIMLARI, type Gorev } from "@/lib/demo/operasyon";
import {
  getTamamlananGorevler,
  goreviTamamla,
  type TamamlananGorev,
} from "@/lib/demo/gorev-store";

const SEKMELER = ["Alt adımlar", "Kapsam", "İşlem geçmişi"] as const;

/* Merkez ve İl panellerinin paylaştığı görev listesi + detay.
   ilFiltresi verilirse yalnızca o ilin görevleri listelenir.
   showTamamla=true olduğunda "Tamamlandı" butonu aktif olur (il sorumlusu rolü). */
export default function GorevlerScreen({
  baslik,
  alt,
  ilFiltresi,
  listeBasligi,
  showTamamla,
}: {
  baslik: string;
  alt: string;
  ilFiltresi?: string;
  listeBasligi?: string;
  showTamamla?: boolean;
}) {
  const kaynak = useMemo(
    () => (ilFiltresi ? GOREVLER.filter((g) => g.il === ilFiltresi) : GOREVLER),
    [ilFiltresi],
  );

  const [durum, setDurum] = useState("Tümü");
  const [oncelik, setOncelik] = useState("Tümü");
  const [secili, setSecili] = useState<Gorev | null>(null);
  const [sekme, setSekme] = useState<(typeof SEKMELER)[number]>("Alt adımlar");
  const [tamamlananlar, setTamamlananlar] = useState<Record<string, TamamlananGorev>>({});
  const [onayMesaj, setOnayMesaj] = useState<string | null>(null);

  // showTamamla prop verilmemişse ilFiltresi varlığına göre otomatik belirle
  const kapatmaAktif = showTamamla ?? Boolean(ilFiltresi);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTamamlananlar(getTamamlananGorevler());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const goreviKapat = (gorev: Gorev) => {
    goreviTamamla(gorev.id, gorev.sorumlu);
    setTamamlananlar(getTamamlananGorevler());
    setOnayMesaj(
      `"${gorev.ad}" görevi tamamlandı olarak işaretlendi. Yönetici ve koordinatöre bildirim gönderildi.`,
    );
    window.setTimeout(() => setOnayMesaj(null), 5000);
  };

  const gercekDurum = (gorev: Gorev) =>
    gorev.id in tamamlananlar ? "Tamamlandı" : gorev.durum;

  const satirlar = kaynak.filter((g) => {
    const gd = gercekDurum(g);
    if (durum !== "Tümü" && gd !== durum) return false;
    if (oncelik !== "Tümü" && g.oncelik !== oncelik) return false;
    return true;
  });

  const durumlar = [
    "Tümü",
    ...Array.from(
      new Set(kaynak.map((g) => gercekDurum(g))),
    ),
  ];
  const oncelikler = ["Tümü", "Kritik", "Yüksek", "Orta", "Düşük"];

  return (
    <div>
      <PageTitle title={baslik} sub={alt} />

      {onayMesaj ? (
        <div className="mb-4 rounded-lg border border-[#C7E4D6] bg-[#E9F5EF] px-4 py-3 text-sm text-[#106B4A]">
          {onayMesaj}
        </div>
      ) : null}

      <Card className="mb-[18px] px-[18px] py-4">
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          <Field label="Durum" htmlFor="g-durum">
            <select
              id="g-durum"
              value={durum}
              onChange={(e) => setDurum(e.target.value)}
              className={CONTROL}
            >
              {durumlar.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Öncelik" htmlFor="g-oncelik">
            <select
              id="g-oncelik"
              value={oncelik}
              onChange={(e) => setOncelik(e.target.value)}
              className={CONTROL}
            >
              {oncelikler.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Termin aralığı" htmlFor="g-termin">
            <select id="g-termin" defaultValue="Eylül 2026" className={CONTROL}>
              <option>Eylül 2026</option>
              <option>Ekim 2026</option>
            </select>
          </Field>
          <div className="flex items-end">
            <Secondary
              className="w-full py-2 text-[13px]"
              onClick={() => {
                setDurum("Tümü");
                setOncelik("Tümü");
              }}
            >
              Filtreleri temizle
            </Secondary>
          </div>
        </div>
      </Card>

      <Card className="mb-[18px]">
        <CardHead
          title={listeBasligi ?? "Görev listesi"}
          hint={`${satirlar.length} görev listeleniyor`}
        />
        {satirlar.length === 0 ? (
          <div className="p-[18px]">
            <Empty
              title="Bu kriterlere uygun görev bulunamadı."
              sub="Filtreleri değiştirerek yeniden deneyin."
            />
          </div>
        ) : (
          <Table
            head={[
              "Görev",
              "İl / Atölye",
              "Sorumlu",
              "Termin",
              "Durum",
              "Öncelik",
              "Gecikme",
              "İlerleme",
              "İşlem",
            ]}
            minWidth={1080}
          >
            {satirlar.map((g) => {
              const tamamlandi = g.id in tamamlananlar;
              const gosterilecekDurum = tamamlandi ? "Tamamlandı" : g.durum;
              return (
                <tr key={g.id} className={TR}>
                  <td className={TD}>{g.ad}</td>
                  <td className={`${TD} text-[#667085]`}>
                    {g.il} / {g.atolye}
                  </td>
                  <td className={TD}>{g.sorumlu}</td>
                  <td className={`${TD} whitespace-nowrap`}>{g.termin}</td>
                  <td className={TD}>
                    <Chip>{gosterilecekDurum}</Chip>
                  </td>
                  <td className={TD}>
                    <Chip>{g.oncelik}</Chip>
                  </td>
                  <td
                    className={`${TD} ${g.gecikme === "—" ? "text-[#667085]" : "text-[#9B2C2C]"}`}
                  >
                    {tamamlandi ? "—" : g.gecikme}
                  </td>
                  <td className={`${TD} min-w-[150px]`}>
                    <Progress pct={tamamlandi ? 100 : g.ilerleme} />
                  </td>
                  <td className={`${TD} whitespace-nowrap`}>
                    {tamamlandi ? (
                      <span className="text-[13px] text-[#106B4A]">
                        ✓ Tamamlandı
                      </span>
                    ) : kapatmaAktif ? (
                      <div className="flex gap-1.5">
                        <RowButton type="button" onClick={() => setSecili(g)}>
                          Görevi aç
                        </RowButton>
                        <RowButton
                          type="button"
                          onClick={() => goreviKapat(g)}
                          className="border-[#C7E4D6] bg-[#E9F5EF] text-[#106B4A] hover:bg-[#D4EFE2]"
                        >
                          Tamamlandı
                        </RowButton>
                      </div>
                    ) : (
                      <RowButton type="button" onClick={() => setSecili(g)}>
                        Görevi aç
                      </RowButton>
                    )}
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Card>

      {secili ? (
        <Card className="p-[18px]">
          <div className="flex flex-wrap items-start gap-3">
            <div className="min-w-[260px]">
              <div className="text-[17px] font-semibold text-[#14213D]">
                {secili.ad}
              </div>
              <div className="mt-1 text-sm text-[#3C4657]">
                {secili.il} / {secili.atolye}
              </div>
              <div className="mt-1 text-[13px] text-[#667085]">
                Sorumlu: {secili.sorumlu} · Termin: {secili.termin}
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <Chip>{secili.id in tamamlananlar ? "Tamamlandı" : secili.durum}</Chip>
                <Chip>{secili.oncelik}</Chip>
                <span className="text-[13px] text-[#667085]">
                  Son güncelleme:{" "}
                  {secili.id in tamamlananlar
                    ? tamamlananlar[secili.id].zaman
                    : secili.guncelleme}
                </span>
              </div>
              {secili.id in tamamlananlar ? (
                <div className="mt-3 rounded-lg border border-[#C7E4D6] bg-[#E9F5EF] px-3 py-2 text-[13px] text-[#106B4A]">
                  Bu görev <strong>{tamamlananlar[secili.id].kapatan}</strong> tarafından{" "}
                  <strong>{tamamlananlar[secili.id].zaman}</strong> tarihinde tamamlandı olarak kapatıldı.
                </div>
              ) : kapatmaAktif ? (
                <button
                  type="button"
                  onClick={() => goreviKapat(secili)}
                  className="mt-3 rounded-lg border border-[#C7E4D6] bg-[#E9F5EF] px-4 py-2 text-[13px] font-semibold text-[#106B4A] hover:bg-[#D4EFE2]"
                >
                  Görevi tamamlandı olarak kapat
                </button>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setSecili(null)}
              className="ml-auto text-[13px] text-[#667085] underline"
            >
              Kapat
            </button>
          </div>

          <div className="mt-4">
            <Tabs items={SEKMELER} value={sekme} onChange={setSekme} />

            {sekme === "Alt adımlar" ? (
              <Table head={["Alt adım", "Sorumlu rol", "Durum"]} minWidth={560}>
                {GOREV_ALT_ADIMLARI.map((a) => (
                  <tr key={a.ad} className={TR}>
                    <td className={TD}>{a.ad}</td>
                    <td className={`${TD} text-[#667085]`}>{a.sorumlu}</td>
                    <td className={TD}>
                      <Chip>{a.durum}</Chip>
                    </td>
                  </tr>
                ))}
              </Table>
            ) : sekme === "Kapsam" ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { e: "İl", d: secili.il },
                  { e: "Atölye", d: secili.atolye },
                  { e: "İlerleme", d: secili.id in tamamlananlar ? "%100" : `%${secili.ilerleme}` },
                  { e: "Risk", d: secili.id in tamamlananlar ? "Tamamlandı" : secili.risk },
                ].map((k) => (
                  <div
                    key={k.e}
                    className="rounded-lg border border-[#DDE5F0] px-3.5 py-3"
                  >
                    <div className="text-xs text-[#667085]">{k.e}</div>
                    <div className="mt-0.5 text-sm text-[#14213D]">{k.d}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-2.5">
                {secili.id in tamamlananlar ? (
                  <div className="rounded-lg border border-[#DDE5F0] px-3.5 py-3">
                    <div className="text-[13px] text-[#667085]">
                      {tamamlananlar[secili.id].zaman} · {tamamlananlar[secili.id].kapatan}
                    </div>
                    <div className="mt-1 text-sm text-[#14213D]">
                      Görev tamamlandı olarak kapatıldı.
                    </div>
                  </div>
                ) : null}
                {[
                  {
                    z: secili.guncelleme,
                    a: secili.sorumlu,
                    m: "Görev durumu güncellendi.",
                  },
                  {
                    z: "13 Eylül 2026, 09:15",
                    a: "Selin Aksoy (Merkez Operasyon)",
                    m: "Görev oluşturuldu ve il sorumlularına atandı.",
                  },
                ].map((h) => (
                  <div
                    key={h.z}
                    className="rounded-lg border border-[#DDE5F0] px-3.5 py-3"
                  >
                    <div className="text-[13px] text-[#667085]">
                      {h.z} · {h.a}
                    </div>
                    <div className="mt-1 text-sm text-[#14213D]">{h.m}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      ) : null}
    </div>
  );
}