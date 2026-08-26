"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card, CardHead, Chip, Notice, PageTitle, Primary, RowButton, Table, TD, TR,
} from "@/components/atolye/ui";
import {
  DOKUMANLAR, EGITIM_SATIRLARI, HAZIRLIK_KONTROL, type EgitimSatiri,
} from "@/lib/demo/atolye";

export default function HazirlikClient() {
  const [secili, setSecili] = useState<EgitimSatiri | null>(null);
  const [onaylar, setOnaylar] = useState<Record<string, string>>({ B: "18 Eylül 2026, 14:35" });

  const kontrolDurumu = (row: EgitimSatiri, i: number) => {
    if (i === 0) return "Tamamlandı";
    if (i === 1) return row.egitmenHazirlik === "Tamamlandı" ? "Tamamlandı" : "Bekliyor";
    if (i === 2) return row.malzeme === "Uygun" ? "Tamamlandı" : "Eksik";
    return onaylar[row.id] ? "Tamamlandı" : "Bekliyor";
  };

  const onaylanabilir = (row: EgitimSatiri) =>
    row.egitmenHazirlik === "Tamamlandı" && row.malzeme === "Uygun" && !onaylar[row.id];

  return (
    <div>
      <PageTitle
        title="Eğitim hazırlığı"
        sub="Eğitim dokümanları, eğitmen hazırlıkları ve atölye onay durumu."
      />

      <Card className="mb-[18px] p-[18px]">
        <h2 className="m-0 text-base font-semibold text-[#14213D]">Eğitim dokümanları</h2>
        <p className="mt-1.5 mb-3.5 text-[13px] text-[#667085]">
          Dokümanlar Merkez Operasyon tarafından yüklendi.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {DOKUMANLAR.map((d) => (
            <div key={d.ad} className="flex items-center gap-3 rounded-lg border border-[#DDE5F0] p-3.5">
              <span className="grid h-[38px] w-8 shrink-0 place-items-center rounded-md border border-[#DDE5F0] text-[10px] text-[#667085]">
                PDF
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] text-[#14213D]">{d.ad}</div>
                <div className="mt-0.5 text-xs text-[#667085]">{d.meta}</div>
              </div>
              <div className="flex gap-1.5">
                <RowButton type="button">Görüntüle</RowButton>
                <RowButton type="button">İndir</RowButton>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHead title="Eğitim ve eğitmen hazırlık durumları" />
        <Table
          head={["Eğitim", "Grup", "Eğitmen", "Süre", "Eğitmen hazırlığı", "Malzeme durumu", "Atölye hazırlığı", "İşlem"]}
          minWidth={980}
        >
          {EGITIM_SATIRLARI.map((e) => {
            const durum = onaylar[e.id] ? "Onaylandı" : e.atolyeHazirlik;
            return (
              <tr key={e.id} className={TR}>
                <td className={TD}>{e.egitim}</td>
                <td className={TD}>{e.grup}</td>
                <td className={TD}>{e.egitmen}</td>
                <td className={`${TD} whitespace-nowrap`}>{e.sure}</td>
                <td className={TD}><Chip>{e.egitmenHazirlik}</Chip></td>
                <td className={TD}><Chip>{e.malzeme}</Chip></td>
                <td className={TD}><Chip>{durum}</Chip></td>
                <td className={TD}>
                  <RowButton type="button" onClick={() => setSecili(e)}>
                    Kontrol listesini aç
                  </RowButton>
                </td>
              </tr>
            );
          })}
        </Table>
      </Card>

      {secili ? (
        <Card className="mt-[18px] p-[18px]">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="m-0 text-base font-semibold text-[#14213D]">Hazırlık kontrol listesi</h2>
            <span className="text-[13px] text-[#667085]">
              {secili.egitim} · {secili.grup}
            </span>
            <button
              type="button"
              onClick={() => setSecili(null)}
              className="ml-auto text-[13px] text-[#667085] underline"
            >
              Kapat
            </button>
          </div>

          <div className="mt-3.5">
            {HAZIRLIK_KONTROL.map((k, i) => {
              const d = kontrolDurumu(secili, i);
              return (
                <div
                  key={k}
                  className="flex items-center gap-3 border-b border-[#14213D]/[.07] py-2.5 text-sm last:border-0"
                >
                  <span className="text-[#14213D]">{k}</span>
                  <span className="ml-auto"><Chip>{d}</Chip></span>
                </div>
              );
            })}
          </div>

          {secili.malzeme !== "Uygun" ? (
            <div className="mt-3.5">
              <Notice tone="warn">
                Malzeme uygunluğu sağlanmadan atölye hazırlığı onaylanamaz.
              </Notice>
            </div>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2.5">
            <Primary
              disabled={!onaylanabilir(secili)}
              onClick={() =>
                setOnaylar((o) => ({ ...o, [secili.id]: "Şimdi" }))
              }
            >
              {onaylar[secili.id] ? "Onaylandı" : "Atölye hazırlığını onayla"}
            </Primary>
            {secili.malzeme !== "Uygun" ? (
              <Link
                href="/atolye-paneli/malzeme"
                className="rounded-lg border border-[#DDE5F0] bg-white px-[15px] py-2.5 text-sm text-[#243B64] hover:bg-[#F6F9FE]"
              >
                Malzeme kontrolüne git
              </Link>
            ) : null}
          </div>

          {onaylar[secili.id] ? (
            <div className="mt-3.5 border-t border-[#14213D]/[.08] pt-3.5 text-[13px] text-[#3C4657]">
              <div>
                Atölye hazırlığı {onaylar[secili.id]} tarihinde Zeynep Yıldız tarafından onaylandı.
              </div>
              <div className="mt-1 text-[#667085]">
                Bilgilendirilen birimler: İl Sorumlusu, Koordinatör, Merkez Operasyon, Yetkili Yönetici
              </div>
            </div>
          ) : null}
        </Card>
      ) : null}
    </div>
  );
}
