"use client";

import { useState } from "react";
import { Card, Empty, FilterChip, PageTitle } from "@/components/panel/ui";
import { BILDIRIMLER, BILDIRIM_FILTRELERI } from "@/lib/demo/operasyon";

/* Dört panelin paylaştığı bildirim ekranı. */
export default function BildirimlerScreen({ sub }: { sub: string }) {
  const [filtre, setFiltre] = useState("Tümü");
  const [okunanlar, setOkunanlar] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(BILDIRIMLER.filter((b) => b.okundu).map((b) => [b.id, true]))
  );

  const liste = BILDIRIMLER.filter((b) => filtre === "Tümü" || b.kategori === filtre);

  return (
    <div className="max-w-[960px]">
      <PageTitle title="Bildirimler" sub={sub} />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {BILDIRIM_FILTRELERI.map((f) => (
          <FilterChip key={f} active={filtre === f} onClick={() => setFiltre(f)}>
            {f}
          </FilterChip>
        ))}
        <button
          type="button"
          onClick={() => setOkunanlar(Object.fromEntries(BILDIRIMLER.map((b) => [b.id, true])))}
          className="ml-auto text-[13px] text-[#667085] underline"
        >
          Tümünü okundu işaretle
        </button>
      </div>

      {liste.length === 0 ? (
        <Empty title="Bu kategoride bildirim bulunmuyor." />
      ) : (
        <div className="grid gap-2.5">
          {liste.map((b) => {
            const okundu = !!okunanlar[b.id];
            return (
              <Card key={b.id} className={okundu ? "p-4" : "border-l-[3px] border-l-[#F59E4A] p-4"}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-[#CFDDF3] bg-[#E6EEFA] px-2 py-[3px] text-xs text-[#1F3D77]">
                    {b.tur}
                  </span>
                  <span className="text-xs text-[#8B95A6]">{b.zaman}</span>
                  {!okundu ? <span className="text-xs font-semibold text-[#8A5F0F]">Yeni</span> : null}
                </div>
                <div className="mt-2 text-[15px] font-semibold text-[#14213D]">{b.baslik}</div>
                <div className="mt-1 text-sm text-[#3C4657]">{b.metin}</div>
                <div className="mt-1.5 text-[13px] text-[#667085]">{b.ilgili}</div>
                {!okundu ? (
                  <button
                    type="button"
                    onClick={() => setOkunanlar((o) => ({ ...o, [b.id]: true }))}
                    className="mt-3 rounded-lg border border-[#DDE5F0] px-3 py-1.5 text-[13px] text-[#243B64] hover:bg-[#F6F9FE]"
                  >
                    Okundu işaretle
                  </button>
                ) : null}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
