import {
  Card, CardHead, Chip, PageTitle, Progress, StatCard, Table, TD, TR,
} from "@/components/panel/ui";
import { ILLER } from "@/lib/demo/operasyon";

/* Merkez, Koordinatör ve Yönetici panellerinin paylaştığı il tablosu. */
export default function IllerScreen({ kapsam }: { kapsam: string }) {
  const toplam = ILLER.reduce((t, i) => t + i.toplam, 0);
  const geciken = ILLER.reduce((t, i) => t + i.geciken, 0);
  const ortalama = Math.round(ILLER.reduce((t, i) => t + i.oran, 0) / ILLER.length);

  return (
    <div>
      <PageTitle title="İller" sub={`${kapsam} kapsamındaki il bazlı operasyon durumu.`} />

      <div className="mb-[18px] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="İl" value={String(ILLER.length)} />
        <StatCard label="Toplam görev" value={String(toplam)} />
        <StatCard label="Geciken görev" value={String(geciken)} note="Kritik takip" />
        <StatCard label="Ortalama tamamlanma" value={`%${ortalama}`} />
      </div>

      <Card>
        <CardHead title="İl bazlı operasyon durumu" />
        <Table
          head={["İl", "Sorumlu", "Toplam", "Tamamlanan", "Devam eden", "Geciken", "Hazır atölye", "Tamamlanma"]}
          minWidth={960}
        >
          {ILLER.map((i) => (
            <tr key={i.ad} className={TR}>
              <td className={TD}>
                <span className="flex flex-wrap items-center gap-2">
                  <span>{i.ad}</span>
                  {i.aksiyon ? <Chip>Aksiyon gerekli</Chip> : null}
                </span>
              </td>
              <td className={`${TD} text-[#667085]`}>{i.sorumlu}</td>
              <td className={TD}>{i.toplam}</td>
              <td className={TD}>{i.tamamlanan}</td>
              <td className={TD}>{i.devam}</td>
              <td className={`${TD} ${i.geciken > 0 ? "text-[#9B2C2C]" : "text-[#667085]"}`}>{i.geciken}</td>
              <td className={TD}>{i.hazirAtolye}</td>
              <td className={`${TD} min-w-[180px]`}><Progress pct={i.oran} /></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
