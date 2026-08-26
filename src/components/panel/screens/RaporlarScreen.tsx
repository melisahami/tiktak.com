import {
  Card, CardHead, PageTitle, Progress, StatCard, Table, TD, TR,
} from "@/components/panel/ui";
import { EGITIMLER, ILLER, RAPOR_OZETI } from "@/lib/demo/operasyon";

/* Koordinatör ve Yönetici panellerinin paylaştığı rapor ekranı. */
export default function RaporlarScreen({ kapsam }: { kapsam: string }) {
  return (
    <div>
      <PageTitle title="Raporlar" sub={`${kapsam} · Güz Dönemi 2026 operasyon raporu.`} />

      <div className="mb-[18px] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {RAPOR_OZETI.map((o) => (
          <StatCard key={o.etiket} label={o.etiket} value={o.deger} note={o.not} />
        ))}
      </div>

      <Card className="mb-[18px]">
        <CardHead title="İl bazlı tamamlanma" />
        <Table head={["İl", "Atölye", "Geciken", "Hazır atölye", "Tamamlanma"]} minWidth={720}>
          {ILLER.map((i) => (
            <tr key={i.ad} className={TR}>
              <td className={TD}>{i.ad}</td>
              <td className={TD}>{i.atolyeSayisi}</td>
              <td className={`${TD} ${i.geciken > 0 ? "text-[#9B2C2C]" : "text-[#667085]"}`}>{i.geciken}</td>
              <td className={TD}>{i.hazirAtolye}</td>
              <td className={`${TD} min-w-[200px]`}><Progress pct={i.oran} /></td>
            </tr>
          ))}
        </Table>
      </Card>

      <Card>
        <CardHead title="Eğitim bazlı hazırlık" />
        <Table head={["Eğitim", "Atölye", "Hazır", "Eksik", "Devam eden", "Kalan süre"]} minWidth={720}>
          {EGITIMLER.map((e) => (
            <tr key={e.ad} className={TR}>
              <td className={TD}>{e.ad}</td>
              <td className={TD}>{e.atolye}</td>
              <td className={`${TD} text-[#106B4A]`}>{e.hazir}</td>
              <td className={`${TD} text-[#8A5F0F]`}>{e.eksik}</td>
              <td className={TD}>{e.devam}</td>
              <td className={`${TD} text-[#667085]`}>{e.kalanGun} gün</td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
