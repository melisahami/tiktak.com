import Link from "next/link";
import { AIInsightPanel } from "@/components/panel/AIInsightPanel";
import { ExecutiveActionPanel } from "@/components/panel/ExecutiveActionPanel";
import {
  Card,
  CardHead,
  Chip,
  PageTitle,
  Progress,
  StatCard,
  Table,
  TD,
  TR,
} from "@/components/panel/ui";
import { EGITIMLER, ILLER, RAPOR_OZETI } from "@/lib/demo/operasyon";

export default function YoneticiOzet() {
  const e = EGITIMLER[0];
  const y = (n: number) => `${(n / e.atolye) * 100}%`;

  return (
    <div>
      <PageTitle
        title="Operasyon özeti"
        sub="Türkiye geneli Güz Dönemi 2026 durumu."
      />

      <AIInsightPanel />

      <div className="mb-[18px] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {RAPOR_OZETI.map((o) => (
          <StatCard
            key={o.etiket}
            label={o.etiket}
            value={o.deger}
            note={o.not}
          />
        ))}
      </div>

      <Card className="mb-[18px]">
        <CardHead title="İl bazlı operasyon durumu" />
        <Table
          head={[
            "İl",
            "Toplam görev",
            "Tamamlanan",
            "Devam eden",
            "Geciken",
            "Hazır atölye",
            "Tamamlanma oranı",
          ]}
          minWidth={940}
        >
          {ILLER.map((i) => (
            <tr key={i.ad} className={TR}>
              <td className={TD}>
                <span className="flex flex-wrap items-center gap-2">
                  <span>{i.ad}</span>
                  {i.aksiyon ? <Chip>Aksiyon gerekli</Chip> : null}
                </span>
              </td>
              <td className={TD}>{i.toplam}</td>
              <td className={TD}>{i.tamamlanan}</td>
              <td className={TD}>{i.devam}</td>
              <td
                className={`${TD} ${i.geciken > 0 ? "text-[#9B2C2C]" : "text-[#667085]"}`}
              >
                {i.geciken}
              </td>
              <td className={TD}>{i.hazirAtolye}</td>
              <td className={`${TD} min-w-[180px]`}>
                <Progress pct={i.oran} />
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <div className="grid gap-[18px] xl:grid-cols-2">
        <Card className="p-[18px]">
          <h2 className="m-0 mb-3 text-base font-semibold text-[#14213D]">
            Aksiyon gerektiren alanlar
          </h2>
          <ExecutiveActionPanel />
          <Link
            href="/yonetici-paneli/raporlar"
            className="mt-3.5 inline-block text-[13px] text-[#243B64] underline"
          >
            Raporu görüntüle
          </Link>
        </Card>

        <Card className="p-[18px]">
          <h2 className="m-0 mb-3.5 text-base font-semibold text-[#14213D]">
            Eğitim hazırlık durumu
          </h2>
          <div className="rounded-lg border border-[#DDE5F0] p-4">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="text-[15px] font-semibold text-[#14213D]">
                {e.ad}
              </span>
              <span className="text-[13px] text-[#667085]">
                {e.donem} · {e.atolye} atölye
              </span>
            </div>
            <div className="my-3.5 flex h-2.5 overflow-hidden rounded-[5px]">
              <div style={{ width: y(e.hazir), background: "#16845B" }} />
              <div style={{ width: y(e.eksik), background: "#C78A14" }} />
              <div style={{ width: y(e.devam), background: "#356AE6" }} />
            </div>
            <div className="flex flex-wrap gap-4 text-[13px] text-[#3C4657]">
              <span>
                <span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-[#16845B]" />
                {e.hazir} hazır
              </span>
              <span>
                <span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-[#C78A14]" />
                {e.eksik} eksik
              </span>
              <span>
                <span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-[#356AE6]" />
                {e.devam} devam ediyor
              </span>
            </div>
          </div>
          <div className="mt-3 text-[13px] text-[#667085]">
            Eğitim başlangıcı: 30 Eylül 2026 · Kalan süre: {e.kalanGun} gün
          </div>
        </Card>
      </div>
    </div>
  );
}
