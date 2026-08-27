"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHead,
  Chip,
  CONTROL,
  Empty,
  Field,
  FilterChip,
  PageTitle,
  Primary,
  Secondary,
  Table,
  TD,
  TR,
} from "@/components/panel/ui";
import { GOREVLER, ILLER, RISKLER } from "@/lib/demo/operasyon";

const HIZLI = [
  "Geciken",
  "Kritik öncelik",
  "Eksik malzeme",
  "Fazla malzeme",
  "Tamamlanan",
] as const;

const MALZEME_OPERASYONLARI = [
  {
    durum: "Eksik malzeme",
    il: "İstanbul",
    ilce: "Fatih",
    atolye: "Bilim Fatih Atölyesi",
    malzeme: "Ultrasonik sensör",
    adet: 3,
  },
  {
    durum: "Fazla malzeme",
    il: "İstanbul",
    ilce: "Güngören",
    atolye: "Güngören Atölyesi",
    malzeme: "Ultrasonik sensör",
    adet: 8,
  },
  {
    durum: "Fazla malzeme",
    il: "İstanbul",
    ilce: "Bakırköy",
    atolye: "Bakırköy Atölyesi",
    malzeme: "Breadboard",
    adet: 6,
  },
] as const;

export default function OperasyonTakibiClient() {
  const [il, setIl] = useState("Tümü");
  const [sorumlu, setSorumlu] = useState("Tümü");
  const [durum, setDurum] = useState("Tümü");
  const [oncelik, setOncelik] = useState("Tümü");
  const [hizli, setHizli] = useState<string | null>(null);

  const iller = ["Tümü", ...ILLER.map((i) => i.ad)];
  const sorumlular = [
    "Tümü",
    ...Array.from(new Set(GOREVLER.map((g) => g.sorumlu))),
  ];
  const durumlar = [
    "Tümü",
    ...Array.from(new Set(GOREVLER.map((g) => g.durum))),
  ];

  const satirlar = GOREVLER.filter((g) => {
    if (il !== "Tümü" && g.il !== il) return false;
    if (sorumlu !== "Tümü" && g.sorumlu !== sorumlu) return false;
    if (durum !== "Tümü" && g.durum !== durum) return false;
    if (oncelik !== "Tümü" && g.oncelik !== oncelik) return false;
    if (hizli === "Geciken" && g.durum !== "Gecikti") return false;
    if (hizli === "Kritik öncelik" && g.oncelik !== "Kritik") return false;
    if (hizli === "Eksik malzeme" || hizli === "Fazla malzeme") return false;
    if (hizli === "Tamamlanan" && g.durum !== "Tamamlandı") return false;
    return true;
  });

  const malzemeSonuclari = MALZEME_OPERASYONLARI.filter((item) =>
    hizli === "Eksik malzeme"
      ? item.durum === "Eksik malzeme"
      : item.durum === "Fazla malzeme",
  );
  const eksikMalzeme = MALZEME_OPERASYONLARI.find(
    (item) => item.durum === "Eksik malzeme",
  );
  const enYakinFazla = MALZEME_OPERASYONLARI.find(
    (item) =>
      item.durum === "Fazla malzeme" && item.malzeme === eksikMalzeme?.malzeme,
  );

  function temizle() {
    setIl("Tümü");
    setSorumlu("Tümü");
    setDurum("Tümü");
    setOncelik("Tümü");
    setHizli(null);
  }

  const toneCls = {
    err: "bg-[#FBEDEE] border-[#EFD3D6] text-[#97323B]",
    warn: "bg-[#FDF4E3] border-[#EFDFBE] text-[#8A5F0F]",
    info: "bg-[#F6F9FE] border-[#DDE5F0] text-[#3C4657]",
  };

  return (
    <div>
      <PageTitle
        title="Operasyon takibi"
        sub="Marmara Bölgesi görevlerinin anlık durumu."
      />

      <Card className="mb-[18px] px-[18px] py-4">
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          <Field label="İl" htmlFor="k-il">
            <select
              id="k-il"
              value={il}
              onChange={(e) => setIl(e.target.value)}
              className={CONTROL}
            >
              {iller.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sorumlu" htmlFor="k-sorumlu">
            <select
              id="k-sorumlu"
              value={sorumlu}
              onChange={(e) => setSorumlu(e.target.value)}
              className={CONTROL}
            >
              {sorumlular.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Durum" htmlFor="k-durum">
            <select
              id="k-durum"
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
          <Field label="Öncelik" htmlFor="k-oncelik">
            <select
              id="k-oncelik"
              value={oncelik}
              onChange={(e) => setOncelik(e.target.value)}
              className={CONTROL}
            >
              {["Tümü", "Kritik", "Yüksek", "Orta", "Düşük"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-[#E9EFF9] pt-3.5">
          {HIZLI.map((h) => (
            <FilterChip
              key={h}
              active={hizli === h}
              onClick={() => setHizli((v) => (v === h ? null : h))}
            >
              {h}
            </FilterChip>
          ))}
          <button
            type="button"
            onClick={temizle}
            className="ml-auto text-[13px] text-[#667085] underline"
          >
            Filtreleri temizle
          </button>
        </div>
      </Card>

      {hizli === "Eksik malzeme" || hizli === "Fazla malzeme" ? (
        <Card className="mb-[18px] border-[#C8D8F0]">
          <CardHead
            title="AI destekli malzeme eşleştirme"
            hint="Demo verisi · stok hareketi önerisi"
          />
          <div className="grid gap-4 p-[18px] xl:grid-cols-[1fr_auto_1fr] xl:items-center">
            <div className="rounded-lg border border-[#EFD3D6] bg-[#FFF7F7] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#97323B]">
                Eksik malzeme
              </p>
              <h3 className="mt-1 text-sm font-semibold text-[#14213D]">
                {eksikMalzeme?.atolye}
              </h3>
              <p className="mt-1 text-sm text-[#3C4657]">
                {eksikMalzeme?.malzeme} · {eksikMalzeme?.adet} adet eksik
              </p>
              <p className="mt-1 text-xs text-[#667085]">
                {eksikMalzeme?.il} / {eksikMalzeme?.ilce}
              </p>
            </div>

            <div className="text-center text-xs font-semibold text-[#356AE6]">
              <span className="block text-lg">→</span>
              En yakın uygun stok
            </div>

            <div className="rounded-lg border border-[#C7E4D6] bg-[#F4FBF7] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#106B4A]">
                Fazla malzeme
              </p>
              <h3 className="mt-1 text-sm font-semibold text-[#14213D]">
                {enYakinFazla?.atolye}
              </h3>
              <p className="mt-1 text-sm text-[#3C4657]">
                {enYakinFazla?.malzeme} · {enYakinFazla?.adet} adet fazla
              </p>
              <p className="mt-1 text-xs text-[#667085]">
                {enYakinFazla?.il} / {enYakinFazla?.ilce} · Yakın stok önerisi
              </p>
            </div>
          </div>
          <div className="border-t border-[#DDE5F0] px-[18px] py-3 text-xs text-[#3C4657]">
            <span className="font-semibold text-[#14213D]">
              Sistem önerisi:{" "}
            </span>
            {eksikMalzeme?.atolye} için {enYakinFazla?.atolye} stokundaki{" "}
            {enYakinFazla?.malzeme} kullanılabilir. Öneri; malzeme adı, stok
            miktarı ve ilçe yakınlığına göre oluşturuldu.
          </div>
          {hizli === "Fazla malzeme" ? (
            <div className="border-t border-[#DDE5F0] px-[18px] py-3 text-xs text-[#667085]">
              Fazla stok bulunan atölyeler listeleniyor; eksik malzeme
              filtresine dönerek eşleştirme önerisini görüntüleyebilirsiniz.
            </div>
          ) : null}
        </Card>
      ) : null}

      <div className="grid gap-[18px] xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHead
            title={
              hizli === "Fazla malzeme"
                ? "Fazla stok bulunan atölyeler"
                : hizli === "Eksik malzeme"
                  ? "Eksik malzeme bulunan atölyeler"
                  : "Görev takibi"
            }
            hint={
              hizli === "Fazla malzeme" || hizli === "Eksik malzeme"
                ? `${malzemeSonuclari.length} atölye listeleniyor`
                : `${satirlar.length} görev listeleniyor`
            }
          />
          {hizli === "Fazla malzeme" || hizli === "Eksik malzeme" ? (
            <Table
              head={[
                "Atölye",
                "İl / İlçe",
                "Malzeme",
                hizli === "Eksik malzeme" ? "Eksik adet" : "Fazla adet",
                "Durum",
              ]}
              minWidth={680}
            >
              {malzemeSonuclari.map((item) => (
                <tr className={TR} key={`${item.atolye}-${item.malzeme}`}>
                  <td className={`${TD} font-medium text-[#14213D]`}>
                    {item.atolye}
                  </td>
                  <td className={`${TD} text-[#667085]`}>
                    {item.il} / {item.ilce}
                  </td>
                  <td className={TD}>{item.malzeme}</td>
                  <td className={TD}>{item.adet}</td>
                  <td className={TD}>
                    <Chip>{item.durum}</Chip>
                  </td>
                </tr>
              ))}
            </Table>
          ) : null}
          {hizli !== "Fazla malzeme" && hizli !== "Eksik malzeme" ? (
            satirlar.length === 0 ? (
              <div className="p-[18px]">
                <Empty
                  title="Bu kriterlere uygun görev bulunamadı."
                  sub="Filtreleri değiştirerek yeniden deneyin."
                  action={
                    <Secondary className="py-2 text-[13px]" onClick={temizle}>
                      Filtreleri temizle
                    </Secondary>
                  }
                />
              </div>
            ) : (
              <Table
                head={[
                  "Görev",
                  "İl / Atölye",
                  "Sorumlu",
                  "Durum",
                  "Öncelik",
                  "Termin",
                  "Gecikme",
                  "Son güncelleme",
                ]}
                minWidth={1000}
              >
                {satirlar.map((c) => (
                  <tr key={c.id} className={TR}>
                    <td className={TD}>{c.ad}</td>
                    <td className={`${TD} text-[#667085]`}>
                      {c.il} / {c.atolye}
                    </td>
                    <td className={TD}>{c.sorumlu}</td>
                    <td className={TD}>
                      <Chip>{c.durum}</Chip>
                    </td>
                    <td className={TD}>
                      <Chip>{c.oncelik}</Chip>
                    </td>
                    <td className={`${TD} whitespace-nowrap`}>{c.termin}</td>
                    <td
                      className={`${TD} ${c.gecikme === "—" ? "text-[#667085]" : "text-[#9B2C2C]"}`}
                    >
                      {c.gecikme}
                    </td>
                    <td className={`${TD} text-[#667085]`}>{c.guncelleme}</td>
                  </tr>
                ))}
              </Table>
            )
          ) : null}
        </Card>

        <Card className="p-[18px]">
          <h2 className="m-0 mb-3 text-base font-semibold text-[#14213D]">
            Risk özeti
          </h2>
          <div className="grid gap-2.5">
            {RISKLER.map((r) => (
              <div
                key={r.metin}
                className={`rounded-lg border px-3.5 py-3 ${toneCls[r.tone]}`}
              >
                <div className="text-sm">{r.metin}</div>
              </div>
            ))}
          </div>
          <Link
            href="/koordinator-paneli/raporlar"
            className="mt-3.5 block no-underline"
          >
            <Primary className="w-full">Raporu görüntüle</Primary>
          </Link>
        </Card>
      </div>
    </div>
  );
}
