import { Card, CardHead, Chip, PageTitle, Table, TD, TR } from "@/components/panel/ui";
import { ATOLYELER } from "@/lib/demo/operasyon";

export default function AtolyelerSayfasi() {
  const liste = ATOLYELER.filter((a) => a.il === "İstanbul");

  return (
    <div>
      <PageTitle title="Atölyeler" sub="İlinizdeki atölyelerin hazırlık ve malzeme durumu." />
      <Card>
        <CardHead title="Atölye listesi" hint={`${liste.length} atölye`} />
        <Table
          head={["Atölye", "Sorumlu", "Eğitim", "Kapsam", "Eksik kalem", "Durum"]}
          minWidth={840}
        >
          {liste.map((a) => (
            <tr key={a.ad} className={TR}>
              <td className={TD}>{a.ad}</td>
              <td className={TD}>{a.sorumlu}</td>
              <td className={`${TD} text-[#667085]`}>{a.egitim}</td>
              <td className={`${TD} text-[#667085]`}>{a.meta}</td>
              <td className={`${TD} ${a.eksikKalem > 0 ? "text-[#9B2C2C]" : "text-[#667085]"}`}>
                {a.eksikKalem}
              </td>
              <td className={TD}><Chip>{a.durum}</Chip></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
