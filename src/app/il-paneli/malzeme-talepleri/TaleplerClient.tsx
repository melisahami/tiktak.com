"use client";

import { useState } from "react";
import {
  Card, CardHead, Chip, CONTROL, Empty, FilterChip, Notice, PageTitle,
  Table, TD, TR,
} from "@/components/panel/ui";
import { MALZEME_TALEPLERI, type Talep } from "@/lib/demo/operasyon";

const DURUMLAR: Talep["durum"][] = ["Açık", "Transfer planlandı", "Teslim alındı"];

export default function TaleplerClient() {
  const [talepler, setTalepler] = useState(() => MALZEME_TALEPLERI.map((t) => ({ ...t })));
  const [filtre, setFiltre] = useState<"Tümü" | Talep["durum"]>("Tümü");
  const [mesaj, setMesaj] = useState<string | null>(null);

  const liste = talepler.filter((t) => filtre === "Tümü" || t.durum === filtre);
  const acik = talepler.filter((t) => t.durum === "Açık");

  function durumDegistir(id: number, d: Talep["durum"]) {
    setTalepler((l) => l.map((t) => (t.id === id ? { ...t, durum: d } : t)));
    setMesaj("Talep durumu güncellendi; atölye sorumlusu ve merkez bilgilendirildi.");
  }

  return (
    <div>
      <PageTitle
        title="Malzeme talepleri"
        sub="Atölyelerden gelen eksik malzeme taleplerini yönetin."
      />

      <div className="mb-[18px] grid gap-2.5">
        {acik.length > 0 ? (
          <Notice tone="warn">
            {acik.length} talep hâlâ açık. Eğitim başlangıcına 10 gün kaldı.
          </Notice>
        ) : (
          <Notice tone="ok">Açık malzeme talebi bulunmuyor.</Notice>
        )}
        {mesaj ? <Notice tone="info">{mesaj}</Notice> : null}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["Tümü", ...DURUMLAR] as const).map((d) => (
          <FilterChip key={d} active={filtre === d} onClick={() => setFiltre(d)}>
            {d}
          </FilterChip>
        ))}
      </div>

      <Card>
        <CardHead title="Talep havuzu" hint={`${liste.length} talep`} />
        {liste.length === 0 ? (
          <div className="p-[18px]">
            <Empty title="Bu durumda talep bulunmuyor." sub="Filtreyi değiştirerek yeniden deneyin." />
          </div>
        ) : (
          <Table
            head={["Malzeme", "Adet", "Atölye", "Eğitim / grup", "Talep tarihi", "Durum", "İşlem"]}
            minWidth={900}
          >
            {liste.map((t) => (
              <tr key={t.id} className={TR}>
                <td className={TD}>{t.malzeme}</td>
                <td className={TD}>{t.adet}</td>
                <td className={TD}>{t.atolye}</td>
                <td className={`${TD} text-[#667085]`}>{t.egitim}</td>
                <td className={`${TD} whitespace-nowrap`}>{t.tarih}</td>
                <td className={TD}><Chip>{t.durum}</Chip></td>
                <td className={TD}>
                  <label className="sr-only" htmlFor={`d-${t.id}`}>Talep durumu</label>
                  <select
                    id={`d-${t.id}`}
                    value={t.durum}
                    onChange={(e) => durumDegistir(t.id, e.target.value as Talep["durum"])}
                    className={`${CONTROL} mt-0 min-w-[160px]`}
                  >
                    {DURUMLAR.map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}
