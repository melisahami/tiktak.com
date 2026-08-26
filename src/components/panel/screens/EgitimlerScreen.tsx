import { Card, CardHead, Chip, PageTitle, Table, TD, TR } from "@/components/panel/ui";
import { EGITIMLER, EGITIM_BASLANGICLARI } from "@/lib/demo/operasyon";

/* Merkez ve Yönetici panellerinin paylaştığı eğitim hazırlık ekranı. */
export default function EgitimlerScreen() {
  return (
    <div>
      <PageTitle title="Eğitimler" sub="Dönem eğitimlerinin atölye bazlı hazırlık dağılımı." />

      <div className="mb-[18px] grid gap-[18px] xl:grid-cols-3">
        {EGITIMLER.map((e) => {
          const y = (n: number) => `${(n / e.atolye) * 100}%`;
          return (
            <Card key={e.ad} className="p-[18px]">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="text-[15px] font-semibold text-[#14213D]">{e.ad}</span>
                <span className="text-[13px] text-[#667085]">{e.donem}</span>
              </div>
              <div className="mt-1 text-[13px] text-[#667085]">{e.atolye} atölye</div>

              <div className="my-3.5 flex h-2.5 overflow-hidden rounded-[5px]">
                <div style={{ width: y(e.hazir), background: "#16845B" }} />
                <div style={{ width: y(e.eksik), background: "#C78A14" }} />
                <div style={{ width: y(e.devam), background: "#356AE6" }} />
              </div>

              <div className="flex flex-wrap gap-4 text-[13px] text-[#3C4657]">
                <span><span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-[#16845B]" />{e.hazir} hazır</span>
                <span><span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-[#C78A14]" />{e.eksik} eksik</span>
                <span><span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-[#356AE6]" />{e.devam} devam ediyor</span>
              </div>

              <div className="mt-3 text-[13px] text-[#667085]">Kalan süre: {e.kalanGun} gün</div>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHead title="Yaklaşan eğitim başlangıçları" />
        <Table head={["Eğitim", "Başlangıç ve kapsam", "Durum"]} minWidth={560}>
          {EGITIM_BASLANGICLARI.map((u) => (
            <tr key={u.ad} className={TR}>
              <td className={`${TD} text-[#14213D]`}>{u.ad}</td>
              <td className={`${TD} text-[#667085]`}>{u.meta}</td>
              <td className={TD}><Chip>{u.durum}</Chip></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
