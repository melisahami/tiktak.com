"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card, CardHead, CONTROL, Field, Notice, PageTitle, Primary, Secondary,
} from "@/components/panel/ui";
import { EGITIMLER, ILLER } from "@/lib/demo/operasyon";

export default function GorevOlusturClient() {
  const [baslik, setBaslik] = useState(
    "Robotik ve Kodlama Güz Dönemi eğitim öncesi hazırlık ve malzeme kontrolü"
  );
  const [egitim, setEgitim] = useState(EGITIMLER[0].ad);
  const [oncelik, setOncelik] = useState("Kritik");
  const [termin, setTermin] = useState("2026-09-20");
  const [secilenIller, setSecilenIller] = useState<string[]>(["İstanbul"]);
  const [altGorev, setAltGorev] = useState(true);
  const [aciklama, setAciklama] = useState("");
  const [kaydedildi, setKaydedildi] = useState(false);

  const gecerli = baslik.trim().length > 8 && secilenIller.length > 0;

  return (
    <div className="max-w-[920px]">
      <Link href="/merkez-paneli/gorevler" className="text-[13px] text-[#243B64] underline">
        Görevlere dön
      </Link>
      <div className="mt-3">
        <PageTitle title="Görev oluştur" sub="Görev, seçilen illerin sorumlularına atanır." />
      </div>

      {kaydedildi ? (
        <div className="mb-[18px]">
          <Notice tone="ok">
            Görev oluşturuldu ve {secilenIller.length} il sorumlusuna atandı.
            {altGorev ? " Atölye alt görevleri otomatik üretildi." : ""}
          </Notice>
        </div>
      ) : null}

      <Card className="mb-[18px] p-5">
        <div className="grid gap-4">
          <Field label="Görev başlığı" htmlFor="f-baslik">
            <input
              id="f-baslik"
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              className={CONTROL}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="İlgili eğitim" htmlFor="f-egitim">
              <select id="f-egitim" value={egitim} onChange={(e) => setEgitim(e.target.value)} className={CONTROL}>
                {EGITIMLER.map((e) => (<option key={e.ad} value={e.ad}>{e.ad}</option>))}
              </select>
            </Field>
            <Field label="Öncelik" htmlFor="f-oncelik">
              <select id="f-oncelik" value={oncelik} onChange={(e) => setOncelik(e.target.value)} className={CONTROL}>
                {["Kritik", "Yüksek", "Orta", "Düşük"].map((o) => (<option key={o} value={o}>{o}</option>))}
              </select>
            </Field>
            <Field label="Termin" htmlFor="f-termin">
              <input id="f-termin" type="date" value={termin} onChange={(e) => setTermin(e.target.value)} className={CONTROL} />
            </Field>
          </div>

          <Field label="Açıklama" htmlFor="f-aciklama">
            <textarea
              id="f-aciklama"
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
              placeholder="Görevin kapsamını ve beklenen çıktıyı yazın."
              className={`${CONTROL} min-h-[86px]`}
            />
          </Field>
        </div>
      </Card>

      <Card className="mb-[18px]">
        <CardHead title="Atanacak iller" hint={`${secilenIller.length} il seçildi`} />
        <div className="grid gap-2.5 p-[18px] sm:grid-cols-2 xl:grid-cols-3">
          {ILLER.map((i) => {
            const secili = secilenIller.includes(i.ad);
            return (
              <label
                key={i.ad}
                className={
                  secili
                    ? "flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#14213D] bg-[#F6F9FE] px-3.5 py-3"
                    : "flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#DDE5F0] px-3.5 py-3"
                }
              >
                <input
                  type="checkbox"
                  checked={secili}
                  onChange={() =>
                    setSecilenIller((s) =>
                      s.includes(i.ad) ? s.filter((x) => x !== i.ad) : [...s, i.ad]
                    )
                  }
                  className="h-4 w-4 accent-[#14213D]"
                />
                <span className="min-w-0">
                  <span className="block text-sm text-[#14213D]">{i.ad}</span>
                  <span className="block text-xs text-[#667085]">
                    {i.sorumlu} · {i.atolyeSayisi} atölye
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <div className="border-t border-[#DDE5F0] px-[18px] py-3.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={altGorev}
              onChange={(e) => setAltGorev(e.target.checked)}
              className="h-4 w-4 accent-[#14213D]"
            />
            <span>Atölye bazlı alt görevleri otomatik oluştur</span>
          </label>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2.5">
        <Primary disabled={!gecerli} onClick={() => setKaydedildi(true)}>
          Görevi oluştur ve ata
        </Primary>
        <Secondary onClick={() => setKaydedildi(false)}>Taslak olarak kaydet</Secondary>
        {!gecerli ? (
          <span className="self-center text-[13px] text-[#8A5F0F]">
            Başlık ve en az bir il gerekli.
          </span>
        ) : null}
      </div>
    </div>
  );
}
