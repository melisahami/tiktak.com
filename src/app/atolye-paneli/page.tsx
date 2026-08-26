import Link from "next/link";
import {
  Card, CardHead, Chip, PageTitle, Progress, StatCard, Table, TD, TR,
} from "@/components/atolye/ui";
import {
  BILDIRIMLER, DERS_OTURUMLARI, GOREVLER, MALZEMELER, UYARILAR, YAKLASAN,
} from "@/lib/demo/atolye";

export default function AtolyeGenelBakis() {
  const eksikKalem = MALZEMELER.filter((m) => m.mevcut < m.gerekli);
  const eksikAdet = eksikKalem.reduce((t, m) => t + (m.gerekli - m.mevcut), 0);
  const acikGorev = GOREVLER.filter((g) => g.durum !== "Tamamlandı").length;
  const okunmayan = BILDIRIMLER.filter((b) => !b.okundu).length;
  const bekleyenYoklama = DERS_OTURUMLARI.filter((d) => d.yoklamaDurumu !== "Tamamlandı").length;

  const toneCls = {
    err: "bg-[#FBEDEE] border-[#EFD3D6] text-[#9B2C2C]",
    warn: "bg-[#FDF4E3] border-[#EFDFBE] text-[#8A5F0F]",
    info: "bg-[#F6F9FE] border-[#DDE5F0] text-[#3C4657]",
  };

  return (
    <div>
      <PageTitle
        title="Genel bakış"
        sub="Atölyenizin görev, hazırlık ve malzeme durumu tek ekranda."
      />

      <div className="mb-[18px] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Açık görev" value={String(acikGorev)} note="1 görevde kritik öncelik" />
        <StatCard label="Eksik malzeme kalemi" value={String(eksikKalem.length)} note={`Toplam ${eksikAdet} adet eksik`} />
        <StatCard label="Bekleyen yoklama" value={String(bekleyenYoklama)} note="Ders oturumu" />
        <StatCard label="Okunmamış bildirim" value={String(okunmayan)} note="Son 7 gün" />
      </div>

      <Card className="mb-[18px]">
        <CardHead title="Görevlerim" hint="Üsküdar Atölyesi görevleri" />
        <Table
          head={["Görev adı", "İlgili eğitim", "Termin", "Öncelik", "Durum", "İlerleme", "İşlem"]}
          minWidth={900}
        >
          {GOREVLER.map((g) => (
            <tr key={g.ad} className={TR}>
              <td className={TD}>{g.ad}</td>
              <td className={`${TD} text-[#667085]`}>{g.egitim}</td>
              <td className={`${TD} whitespace-nowrap`}>{g.termin}</td>
              <td className={TD}><Chip>{g.oncelik}</Chip></td>
              <td className={TD}><Chip>{g.durum}</Chip></td>
              <td className={`${TD} min-w-[130px]`}><Progress pct={g.ilerleme} /></td>
              <td className={TD}>
                <Link
                  href={g.hedef}
                  className="whitespace-nowrap rounded-lg border border-[#DDE5F0] px-3 py-1.5 text-[13px] text-[#243B64] hover:bg-[#F6F9FE]"
                >
                  Görevi aç
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <div className="grid gap-[18px] xl:grid-cols-2">
        <Card className="p-[18px]">
          <h2 className="m-0 text-base font-semibold text-[#14213D]">Yaklaşan işlemler</h2>
          <div className="mt-2.5">
            {YAKLASAN.map((y) => (
              <div
                key={y.islem}
                className="flex flex-wrap items-center gap-3.5 border-b border-[#E9EFF9] py-2.5 text-sm last:border-0"
              >
                <span className="min-w-[130px] font-semibold text-[#14213D]">{y.zaman}</span>
                <span className="text-[#3C4657]">{y.islem}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-[18px]">
          <h2 className="m-0 text-base font-semibold text-[#14213D]">Dikkat gerektiren durumlar</h2>
          <div className="mt-3 grid gap-2.5">
            {UYARILAR.map((u) => (
              <div key={u.metin} className={`rounded-lg border px-3.5 py-3 ${toneCls[u.tone]}`}>
                <div className="text-sm">{u.metin}</div>
                <Link href={u.hedef} className="mt-2 inline-block text-[13px] text-[#14213D] underline">
                  {u.eylem}
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
