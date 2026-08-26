import Link from "next/link";
import {
  Card, CardHead, Chip, HeroStrip, PageTitle, Progress, Table, TD, TR,
} from "@/components/panel/ui";
import {
  DONEM_GOREVI, EGITIM_BASLANGICLARI, GOREVLER, ILLER,
} from "@/lib/demo/operasyon";

export default function MerkezGenelBakis() {
  const oncelikli = GOREVLER.filter(
    (g) => g.oncelik === "Kritik" || g.durum === "Gecikti"
  );

  return (
    <div>
      <PageTitle title="Genel bakış" sub="Dönem görevinin ülke genelindeki durumu." />

      <HeroStrip
        kicker="Aktif dönem görevi"
        title={DONEM_GOREVI.ad}
        meta={`Termin: ${DONEM_GOREVI.termin} · Eğitim başlangıcı: ${DONEM_GOREVI.egitimBaslangici}`}
        stats={[
          { label: "Genel tamamlanma", value: `%${DONEM_GOREVI.tamamlanma}` },
          { label: "Atanan il", value: String(DONEM_GOREVI.atananIl) },
          { label: "Öncelik", value: DONEM_GOREVI.oncelik, accent: true },
        ]}
        action={
          <Link
            href="/merkez-paneli/gorevler"
            className="self-center rounded-lg border border-white/[.28] bg-white/10 px-3.5 py-2 text-[13px] text-white no-underline hover:bg-white/[.16]"
          >
            Görevi aç
          </Link>
        }
      />

      <Card className="mb-5">
        <CardHead title="Öncelikli aksiyonlar" hint="Kritik ve geciken görevler" />
        <Table head={["Görev", "İl", "Sorumlu", "Termin", "Durum", "Risk"]} minWidth={860}>
          {oncelikli.map((g) => (
            <tr key={g.id} className={TR}>
              <td className={`${TD} text-[#14213D]`}>{g.ad}</td>
              <td className={TD}>{g.il}</td>
              <td className={TD}>{g.sorumlu}</td>
              <td className={`${TD} whitespace-nowrap`}>{g.termin}</td>
              <td className={TD}><Chip>{g.durum}</Chip></td>
              <td className={TD}><Chip>{g.risk}</Chip></td>
            </tr>
          ))}
        </Table>
      </Card>

      <div className="grid gap-[18px] xl:grid-cols-2">
        <Card>
          <CardHead title="İl bazlı hazırlık durumu" />
          <div className="px-[18px] pb-3.5 pt-1.5">
            {ILLER.map((p) => (
              <div key={p.ad} className="border-b border-[#E9EFF9] py-3.5 last:border-0">
                <div className="flex flex-wrap items-baseline gap-3 text-sm">
                  <span className="min-w-[74px] font-medium text-[#14213D]">{p.ad}</span>
                  <span className="text-[13px] text-[#667085]">
                    {p.atolyeSayisi} atölye · {p.hazirAtolye} hazır
                  </span>
                </div>
                <div className="mt-2"><Progress pct={p.oran} /></div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Yaklaşan eğitim başlangıçları" />
          <div className="px-[18px] pb-3.5 pt-1">
            {EGITIM_BASLANGICLARI.map((u) => (
              <div key={u.ad} className="border-b border-[#E9EFF9] py-3.5 last:border-0">
                <div className="text-sm font-medium text-[#14213D]">{u.ad}</div>
                <div className="mt-1 text-[13px] text-[#667085]">{u.meta}</div>
                <div className="mt-2"><Chip>{u.durum}</Chip></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
