"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardHead,
  Chip,
  CONTROL,
  Empty,
  Field,
  Notice,
  PageTitle,
  Primary,
  RowButton,
  Secondary,
  Table,
  TD,
  TR,
} from "@/components/atolye/ui";
import {
  MALZEMELER,
  TALEP_DURUMLARI,
  type TalepDurumu,
} from "@/lib/demo/atolye";

export default function MalzemeClient() {
  const [satirlar, setSatirlar] = useState(() =>
    MALZEMELER.map((m) => ({ ...m })),
  );
  const [talepler, setTalepler] = useState<Record<number, TalepDurumu>>({});
  const [egitim, setEgitim] = useState("Tümü");
  const [grup, setGrup] = useState("Tümü");
  const [durumF, setDurumF] = useState("Tümü");
  const [talepF, setTalepF] = useState("Tümü");
  const [mesaj, setMesaj] = useState<string | null>(null);

  const egitimler = useMemo(
    () => ["Tümü", ...Array.from(new Set(MALZEMELER.map((m) => m.egitim)))],
    [],
  );
  const gruplar = useMemo(
    () => ["Tümü", ...Array.from(new Set(MALZEMELER.map((m) => m.grup)))],
    [],
  );

  const durumu = (m: { gerekli: number; mevcut: number }) => {
    const eksik = m.gerekli - m.mevcut;
    if (eksik <= 0) return "Uygun";
    return eksik >= 3 ? "Kritik eksik" : "Eksik";
  };

  const gorunen = satirlar.filter((m) => {
    if (egitim !== "Tümü" && m.egitim !== egitim) return false;
    if (grup !== "Tümü" && m.grup !== grup) return false;
    if (durumF !== "Tümü" && durumu(m) !== durumF) return false;
    const t = talepler[m.id] ?? (m.mevcut < m.gerekli ? "Açık" : "—");
    if (talepF !== "Tümü" && t !== talepF) return false;
    return true;
  });

  const eksikler = satirlar.filter((m) => m.mevcut < m.gerekli);
  const toplamEksik = eksikler.reduce((t, m) => t + (m.gerekli - m.mevcut), 0);
  const acikEksik = eksikler.filter(
    (m) => (talepler[m.id] ?? "Açık") !== "Teslim alındı",
  );

  function mevcutGuncelle(id: number, deger: string) {
    const n = Math.max(0, Number(deger.replace(/[^0-9]/g, "")) || 0);
    setSatirlar((l) => l.map((m) => (m.id === id ? { ...m, mevcut: n } : m)));
  }

  function hepsineUygula(d: TalepDurumu, bilgi: string) {
    setTalepler((t) => {
      const y = { ...t };
      for (const m of eksikler) y[m.id] = d;
      return y;
    });
    setMesaj(bilgi);
  }

  return (
    <div>
      <PageTitle
        title="Malzeme kontrolü"
        sub="Tüm dönem malzeme uygunluğu eğitim başlamadan önce tek seferde doğrulanır."
      />

      <div className="mb-[18px] grid gap-2.5">
        {eksikler.length > 0 ? (
          <Notice tone="warn">
            {eksikler.length} malzeme kaleminde toplam {toplamEksik} adet eksik
            bulunuyor. Eksikler giderilmeden atölye hazırlığı onaylanamaz.
          </Notice>
        ) : (
          <Notice tone="ok">
            Tüm dönem malzeme uygunluğu sağlandı. Atölye hazırlığı onaya hazır.
          </Notice>
        )}
        {mesaj ? <Notice tone="info">{mesaj}</Notice> : null}
      </div>

      <Card className="mb-[18px] px-[18px] py-4">
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          <Field label="Eğitim" htmlFor="m-egitim">
            <select
              id="m-egitim"
              value={egitim}
              onChange={(e) => setEgitim(e.target.value)}
              className={CONTROL}
            >
              {egitimler.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Grup" htmlFor="m-grup">
            <select
              id="m-grup"
              value={grup}
              onChange={(e) => setGrup(e.target.value)}
              className={CONTROL}
            >
              {gruplar.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Malzeme durumu" htmlFor="m-durum">
            <select
              id="m-durum"
              value={durumF}
              onChange={(e) => setDurumF(e.target.value)}
              className={CONTROL}
            >
              {["Tümü", "Uygun", "Eksik", "Kritik eksik"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Talep durumu" htmlFor="m-talep">
            <select
              id="m-talep"
              value={talepF}
              onChange={(e) => setTalepF(e.target.value)}
              className={CONTROL}
            >
              {["Tümü", ...TALEP_DURUMLARI].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Card>

      <Card className="mb-[18px]">
        <CardHead
          title="Tüm dönem malzeme uygunluk kontrolü"
          hint="Kullanım zamanı, malzemenin hangi haftada kullanılacağını gösterir."
        />
        {gorunen.length === 0 ? (
          <div className="p-[18px]">
            <Empty
              title="Bu kriterlere uygun malzeme kaydı bulunamadı."
              sub="Filtreleri değiştirerek yeniden deneyin."
            />
          </div>
        ) : (
          <Table
            head={[
              "Eğitim",
              "Grup",
              "Kullanım zamanı",
              "Malzeme",
              "Gerekli",
              "Mevcut",
              "Eksik",
              "Durum",
              "Talep durumu",
            ]}
            minWidth={1060}
          >
            {gorunen.map((m) => {
              const eksik = Math.max(0, m.gerekli - m.mevcut);
              const talep: string =
                talepler[m.id] ?? (eksik > 0 ? "Açık" : "—");
              return (
                <tr key={m.id} className={TR}>
                  <td className={`${TD} text-[#667085]`}>{m.egitim}</td>
                  <td className={`${TD} text-[#667085]`}>{m.grup}</td>
                  <td className={`${TD} text-[#667085]`}>{m.hafta}</td>
                  <td className={`${TD} text-[#14213D]`}>{m.ad}</td>
                  <td className={TD}>{m.gerekli}</td>
                  <td className={TD}>
                    <input
                      value={m.mevcut}
                      onChange={(e) => mevcutGuncelle(m.id, e.target.value)}
                      inputMode="numeric"
                      aria-label={`${m.ad} mevcut adet`}
                      className="w-[72px] rounded-lg border border-[#DDE5F0] bg-white px-2 py-1.5 text-center text-sm text-[#3C4657] outline-none focus-visible:border-[#F59E4A]"
                    />
                  </td>
                  <td
                    className={`${TD} ${eksik > 0 ? "text-[#9B2C2C]" : "text-[#667085]"}`}
                  >
                    {eksik}
                  </td>
                  <td className={TD}>
                    <Chip>{durumu(m)}</Chip>
                  </td>
                  <td className={TD}>
                    {talep === "—" ? (
                      <span className="text-[#8B95A6]">—</span>
                    ) : (
                      <Chip>{talep}</Chip>
                    )}
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Card>

      <Card className="p-[18px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="m-0 text-base font-semibold text-[#14213D]">
            Toplam eksik malzeme temini
          </h2>
          <span className="text-[13px] text-[#667085]">
            {eksikler.length} kalem · {toplamEksik} adet
          </span>
        </div>

        <div className="mt-3">
          {eksikler.length === 0 ? (
            <Empty
              title="Açık malzeme eksiği bulunmuyor."
              sub="Atölye hazırlığı için malzeme koşulu sağlandı."
            />
          ) : (
            eksikler.map((m) => (
              <div
                key={m.id}
                className="flex flex-wrap items-center gap-3 border-b border-[#E9EFF9] py-2.5 last:border-0"
              >
                <span className="min-w-[170px] text-sm">{m.ad}</span>
                <span className="min-w-[80px] text-sm text-[#667085]">
                  {m.gerekli - m.mevcut} adet
                </span>
                <Chip>{talepler[m.id] ?? "Açık"}</Chip>
                <span className="flex-1 text-[13px] text-[#8B95A6]">
                  {m.hafta} kullanımı
                </span>
                <RowButton
                  type="button"
                  onClick={() =>
                    setTalepler((t) => ({ ...t, [m.id]: "Transfer planlandı" }))
                  }
                >
                  Transfer planla
                </RowButton>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <Primary
            disabled={acikEksik.length === 0}
            onClick={() =>
              hepsineUygula(
                "Açık",
                "Temin talebi oluşturuldu ve İl Sorumlusuna iletildi.",
              )
            }
          >
            Temin talebi oluştur
          </Primary>
          <Secondary
            disabled={acikEksik.length === 0}
            onClick={() =>
              hepsineUygula(
                "Transfer planlandı",
                "Tüm açık eksikler için transfer planlandı.",
              )
            }
          >
            Transfer planla
          </Secondary>
          <Secondary
            disabled={acikEksik.length === 0}
            onClick={() =>
              hepsineUygula(
                "Teslim alındı",
                "Eksik malzemeler teslim alındı olarak işaretlendi.",
              )
            }
          >
            Teslim alındı olarak işaretle
          </Secondary>
        </div>
      </Card>
    </div>
  );
}
