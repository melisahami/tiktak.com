import Link from "next/link";
import {
  Card, CardHead, Chip, Notice, PageTitle, Progress, StatCard, Table, TD, TR,
} from "@/components/panel/ui";
import { ATOLYELER, GOREVLER, ILLER, MALZEME_TALEPLERI } from "@/lib/demo/operasyon";

const IL = "İstanbul";

export default function IlGenelBakis() {
  const il = ILLER.find((i) => i.ad === IL)!;
  const gorevler = GOREVLER.filter((g) => g.il === IL);
  const acikTalep = MALZEME_TALEPLERI.filter((t) => t.durum !== "Teslim alındı").length;

  return (
    <div>
      <PageTitle title="Genel bakış" sub={`${IL} ili operasyon durumu.`} />

      <div className="mb-5">
        <Notice
          tone="err"
          action={
            <Link href="/il-paneli/atolyeler" className="text-[13px] text-[#14213D] underline">
              Detayı aç
            </Link>
          }
        >
          Üsküdar Atölyesi için eğitim hazırlığı tamamlanmadı. Eğitime 10 gün kaldı.
        </Notice>
      </div>

      <div className="mb-[18px] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="İl görevi" value={String(il.toplam)} note={`${il.tamamlanan} tamamlandı`} />
        <StatCard label="Geciken görev" value={String(il.geciken)} note="Kritik takip" />
        <StatCard label="Hazır atölye" value={il.hazirAtolye} note={`${il.atolyeSayisi} atölye`} />
        <StatCard label="Açık malzeme talebi" value={String(acikTalep)} note="Havuzda bekliyor" />
      </div>

      <Card className="mb-5">
        <CardHead title="İl görevleri" />
        <Table head={["Görev", "Atölye", "Öncelik", "Termin", "İlerleme", "Durum"]} minWidth={860}>
          {gorevler.map((g) => (
            <tr key={g.id} className={TR}>
              <td className={TD}>{g.ad}</td>
              <td className={`${TD} text-[#667085]`}>{g.atolye}</td>
              <td className={TD}><Chip>{g.oncelik}</Chip></td>
              <td className={`${TD} whitespace-nowrap`}>{g.termin}</td>
              <td className={`${TD} min-w-[150px]`}><Progress pct={g.ilerleme} /></td>
              <td className={TD}><Chip>{g.durum}</Chip></td>
            </tr>
          ))}
        </Table>
      </Card>

      <div className="grid gap-[18px] xl:grid-cols-2">
        <Card className="p-[18px]">
          <h2 className="m-0 mb-3.5 text-base font-semibold text-[#14213D]">Atölye durumları</h2>
          {ATOLYELER.filter((a) => a.il === IL).map((a) => (
            <div
              key={a.ad}
              className="mb-2.5 flex flex-wrap items-start gap-3.5 rounded-lg border border-[#DDE5F0] px-4 py-3.5 last:mb-0"
            >
              <div className="min-w-[190px]">
                <div className="text-[15px] font-semibold text-[#14213D]">{a.ad}</div>
                <div className="mt-0.5 text-[13px] text-[#667085]">
                  {a.sorumlu} · {a.meta}
                </div>
                {/* Yoklama yüzdeleri */}
                <div className="mt-2.5 grid gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-[90px] shrink-0 text-[12px] text-[#667085]">Öğrenci yokl.</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-sm bg-[#E9EFF9]">
                      <div
                        className="h-full rounded-sm bg-[#356AE6]"
                        style={{ width: `${a.ogrenciYoklama}%` }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-[12px] font-semibold text-[#3C4657]">
                      %{a.ogrenciYoklama}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-[90px] shrink-0 text-[12px] text-[#667085]">Eğitmen yokl.</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-sm bg-[#E9EFF9]">
                      <div
                        className="h-full rounded-sm bg-[#14213D]"
                        style={{ width: `${a.egitmenYoklama}%` }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-[12px] font-semibold text-[#3C4657]">
                      %{a.egitmenYoklama}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <Chip>{a.durum}</Chip>
              </div>
              <Link
                href="/il-paneli/atolyeler"
                className="ml-auto rounded-lg border border-[#DDE5F0] px-3 py-1.5 text-[13px] text-[#243B64] no-underline hover:bg-[#F6F9FE]"
              >
                Detayı aç
              </Link>
            </div>
          ))}
        </Card>

        <Card className="p-[18px]">
          <h2 className="m-0 text-base font-semibold text-[#14213D]">Malzeme talep havuzu</h2>
          <p className="mt-1.5 mb-3.5 text-[13px] text-[#667085]">
            Atölyelerden gelen açık talepler
          </p>
          {MALZEME_TALEPLERI.filter((t) => t.durum !== "Teslim alındı").map((t) => (
            <div
              key={t.id}
              className="flex flex-wrap items-center gap-3 border-b border-[#E9EFF9] py-3 last:border-0"
            >
              <div className="min-w-[150px]">
                <div className="text-sm text-[#14213D]">{t.malzeme}</div>
                <div className="mt-0.5 text-xs text-[#667085]">
                  {t.adet} adet · {t.atolye}
                </div>
              </div>
              <span className="ml-auto"><Chip>{t.durum}</Chip></span>
            </div>
          ))}
          <Link
            href="/il-paneli/malzeme-talepleri"
            className="mt-3.5 inline-block text-[13px] text-[#243B64] underline"
          >
            Tüm talepleri yönet
          </Link>
        </Card>
      </div>
    </div>
  );
}
