import { Card, CardHead, Chip, PageTitle, Progress, Table, TD, TR } from "@/components/panel/ui";
import { ATOLYELER } from "@/lib/demo/operasyon";

export default function AtolyelerSayfasi() {
  const liste = ATOLYELER.filter((a) => a.il === "İstanbul");

  return (
    <div>
      <PageTitle title="Atölyeler" sub="İlinizdeki atölyelerin hazırlık, malzeme ve yoklama durumu." />
      <Card>
        <CardHead title="Atölye listesi" hint={`${liste.length} atölye`} />
        <Table
          head={["Atölye", "Sorumlu", "Eğitim", "Kapsam", "Eksik kalem", "Öğrenci yoklaması", "Eğitmen yoklaması", "Durum"]}
          minWidth={1040}
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
              <td className={`${TD} min-w-[150px]`}>
                <Progress pct={a.ogrenciYoklama} />
              </td>
              <td className={`${TD} min-w-[150px]`}>
                <Progress pct={a.egitmenYoklama} />
              </td>
              <td className={TD}><Chip>{a.durum}</Chip></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}