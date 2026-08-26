"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card, CardHead, Chip, CONTROL, Empty, Field, FilterChip, PageTitle,
  Primary, Secondary, Table, TD, TR,
} from "@/components/panel/ui";
import { GOREVLER, ILLER, RISKLER } from "@/lib/demo/operasyon";

const HIZLI = ["Geciken", "Kritik öncelik", "Eksik malzeme", "Tamamlanan"] as const;

export default function OperasyonTakibiClient() {
  const [il, setIl] = useState("Tümü");
  const [sorumlu, setSorumlu] = useState("Tümü");
  const [durum, setDurum] = useState("Tümü");
  const [oncelik, setOncelik] = useState("Tümü");
  const [hizli, setHizli] = useState<string | null>(null);

  const iller = ["Tümü", ...ILLER.map((i) => i.ad)];
  const sorumlular = ["Tümü", ...Array.from(new Set(GOREVLER.map((g) => g.sorumlu)))];
  const durumlar = ["Tümü", ...Array.from(new Set(GOREVLER.map((g) => g.durum)))];

  const satirlar = GOREVLER.filter((g) => {
    if (il !== "Tümü" && g.il !== il) return false;
    if (sorumlu !== "Tümü" && g.sorumlu !== sorumlu) return false;
    if (durum !== "Tümü" && g.durum !== durum) return false;
    if (oncelik !== "Tümü" && g.oncelik !== oncelik) return false;
    if (hizli === "Geciken" && g.durum !== "Gecikti") return false;
    if (hizli === "Kritik öncelik" && g.oncelik !== "Kritik") return false;
    if (hizli === "Eksik malzeme" && g.durum !== "Eksik var") return false;
    if (hizli === "Tamamlanan" && g.durum !== "Tamamlandı") return false;
    return true;
  });

  function temizle() {
    setIl("Tümü"); setSorumlu("Tümü"); setDurum("Tümü");
    setOncelik("Tümü"); setHizli(null);
  }

  const toneCls = {
    err: "bg-[#FBEDEE] border-[#EFD3D6] text-[#97323B]",
    warn: "bg-[#FDF4E3] border-[#EFDFBE] text-[#8A5F0F]",
    info: "bg-[#F6F9FE] border-[#DDE5F0] text-[#3C4657]",
  };

  return (
    <div>
      <PageTitle title="Operasyon takibi" sub="Marmara Bölgesi görevlerinin anlık durumu." />

      <Card className="mb-[18px] px-[18px] py-4">
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          <Field label="İl" htmlFor="k-il">
            <select id="k-il" value={il} onChange={(e) => setIl(e.target.value)} className={CONTROL}>
              {iller.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </Field>
          <Field label="Sorumlu" htmlFor="k-sorumlu">
            <select id="k-sorumlu" value={sorumlu} onChange={(e) => setSorumlu(e.target.value)} className={CONTROL}>
              {sorumlular.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </Field>
          <Field label="Durum" htmlFor="k-durum">
            <select id="k-durum" value={durum} onChange={(e) => setDurum(e.target.value)} className={CONTROL}>
              {durumlar.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </Field>
          <Field label="Öncelik" htmlFor="k-oncelik">
            <select id="k-oncelik" value={oncelik} onChange={(e) => setOncelik(e.target.value)} className={CONTROL}>
              {["Tümü", "Kritik", "Yüksek", "Orta", "Düşük"].map((o) => (<option key={o} value={o}>{o}</option>))}
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

      <div className="grid gap-[18px] xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHead title="Görev takibi" hint={`${satirlar.length} görev listeleniyor`} />
          {satirlar.length === 0 ? (
            <div className="p-[18px]">
              <Empty
                title="Bu kriterlere uygun görev bulunamadı."
                sub="Filtreleri değiştirerek yeniden deneyin."
                action={<Secondary className="py-2 text-[13px]" onClick={temizle}>Filtreleri temizle</Secondary>}
              />
            </div>
          ) : (
            <Table
              head={["Görev", "İl / Atölye", "Sorumlu", "Durum", "Öncelik", "Termin", "Gecikme", "Son güncelleme"]}
              minWidth={1000}
            >
              {satirlar.map((c) => (
                <tr key={c.id} className={TR}>
                  <td className={TD}>{c.ad}</td>
                  <td className={`${TD} text-[#667085]`}>{c.il} / {c.atolye}</td>
                  <td className={TD}>{c.sorumlu}</td>
                  <td className={TD}><Chip>{c.durum}</Chip></td>
                  <td className={TD}><Chip>{c.oncelik}</Chip></td>
                  <td className={`${TD} whitespace-nowrap`}>{c.termin}</td>
                  <td className={`${TD} ${c.gecikme === "—" ? "text-[#667085]" : "text-[#9B2C2C]"}`}>{c.gecikme}</td>
                  <td className={`${TD} text-[#667085]`}>{c.guncelleme}</td>
                </tr>
              ))}
            </Table>
          )}
        </Card>

        <Card className="p-[18px]">
          <h2 className="m-0 mb-3 text-base font-semibold text-[#14213D]">Risk özeti</h2>
          <div className="grid gap-2.5">
            {RISKLER.map((r) => (
              <div key={r.metin} className={`rounded-lg border px-3.5 py-3 ${toneCls[r.tone]}`}>
                <div className="text-sm">{r.metin}</div>
              </div>
            ))}
          </div>
          <Link href="/koordinator-paneli/raporlar" className="mt-3.5 block no-underline">
            <Primary className="w-full">Raporu görüntüle</Primary>
          </Link>
        </Card>
      </div>
    </div>
  );
}
