import {
  Card,
  CardHead,
  Chip,
  PageTitle,
  Progress,
  Table,
  TD,
  TR,
} from "@/components/panel/ui";
import { EGITIMLER, EGITIM_BASLANGICLARI } from "@/lib/demo/operasyon";

const HAFTALIK_KATILIM = [
  { egitim: "Robotik ve Kodlama", haftalar: [91, 88, 86, 84] },
  { egitim: "Havacılık ve Uzay", haftalar: [94, 92, null, 89] },
  { egitim: "Temel Elektronik", haftalar: [87, 85, 83, 81] },
  { egitim: "Tasarım ve Üretim", haftalar: [82, null, 79, 76] },
];

const ILCE_KATILIM = [
  {
    il: "İstanbul",
    ilce: "Üsküdar",
    egitim: "Robotik ve Kodlama",
    oran: 86,
    yoklama: "Tam",
  },
  {
    il: "İstanbul",
    ilce: "Kadıköy",
    egitim: "Havacılık ve Uzay",
    oran: null,
    yoklama: "Eksik yoklama",
  },
  {
    il: "Ankara",
    ilce: "Keçiören",
    egitim: "Temel Elektronik",
    oran: 83,
    yoklama: "Tam",
  },
  {
    il: "Bursa",
    ilce: "Nilüfer",
    egitim: "Robotik ve Kodlama",
    oran: 68,
    yoklama: "Tam",
  },
  {
    il: "İzmir",
    ilce: "Karşıyaka",
    egitim: "Tasarım ve Üretim",
    oran: null,
    yoklama: "Eksik yoklama",
  },
] as const;

/* Merkez ve Yönetici panellerinin paylaştığı eğitim hazırlık ekranı. */
export default function EgitimlerScreen() {
  return (
    <div>
      <PageTitle
        title="Eğitimler"
        sub="Dönem eğitimlerinin atölye bazlı hazırlık dağılımı."
      />

      <div className="mb-[18px] grid gap-[18px] xl:grid-cols-3">
        {EGITIMLER.map((e) => {
          const y = (n: number) => `${(n / e.atolye) * 100}%`;
          return (
            <Card key={e.ad} className="p-[18px]">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="text-[15px] font-semibold text-[#14213D]">
                  {e.ad}
                </span>
                <span className="text-[13px] text-[#667085]">{e.donem}</span>
              </div>
              <div className="mt-1 text-[13px] text-[#667085]">
                {e.atolye} atölye
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

              <div className="mt-3 text-[13px] text-[#667085]">
                Kalan süre: {e.kalanGun} gün
              </div>
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
              <td className={TD}>
                <Chip>{u.durum}</Chip>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Card className="mt-[18px]">
        <CardHead
          title="Aylık eğitim katılım oranı"
          hint="Eylül 2026 · haftalık öğrenci katılımı"
        />
        <Table
          head={[
            "Eğitim",
            "1. hafta",
            "2. hafta",
            "3. hafta",
            "4. hafta",
            "Aylık ortalama",
          ]}
          minWidth={820}
        >
          {HAFTALIK_KATILIM.map((row) => {
            const tamamlanan = row.haftalar.filter(
              (oran): oran is number => oran !== null,
            );
            const ortalama = tamamlanan.length
              ? Math.round(
                  tamamlanan.reduce((toplam, oran) => toplam + oran, 0) /
                    tamamlanan.length,
                )
              : null;

            return (
              <tr className={TR} key={row.egitim}>
                <td className={`${TD} font-medium text-[#14213D]`}>
                  {row.egitim}
                </td>
                {row.haftalar.map((oran, index) => (
                  <td className={TD} key={`${row.egitim}-${index}`}>
                    {oran === null ? (
                      <span className="font-medium text-[#9B2C2C]">
                        Eksik yoklama
                      </span>
                    ) : (
                      <span className="font-medium text-[#106B4A]">
                        %{oran}
                      </span>
                    )}
                  </td>
                ))}
                <td className={TD}>
                  {ortalama === null ? "-" : <Progress pct={ortalama} />}
                </td>
              </tr>
            );
          })}
        </Table>
        <div className="border-t border-[#E9EFF9] px-[18px] py-3 text-xs text-[#667085]">
          Eksik haftalar, aylık ortalamaya dahil edilmez ve tamamlanması için
          uyarı olarak işaretlenir.
        </div>
      </Card>

      <Card className="mt-[18px]">
        <CardHead
          title="İl ve ilçe bazında katılım"
          hint="Eğitim bazlı öğrenci katılım görünümü"
        />
        <Table
          head={[
            "İl",
            "İlçe / atölye",
            "Eğitim",
            "Katılım oranı",
            "Yoklama durumu",
          ]}
          minWidth={800}
        >
          {ILCE_KATILIM.map((row) => (
            <tr className={TR} key={`${row.il}-${row.ilce}-${row.egitim}`}>
              <td className={`${TD} font-medium text-[#14213D]`}>{row.il}</td>
              <td className={TD}>{row.ilce}</td>
              <td className={`${TD} text-[#667085]`}>{row.egitim}</td>
              <td className={TD}>
                {row.oran === null ? (
                  <span className="font-medium text-[#9B2C2C]">
                    Hesaplanamadı
                  </span>
                ) : (
                  <Progress pct={row.oran} />
                )}
              </td>
              <td className={TD}>
                {row.yoklama === "Eksik yoklama" ? (
                  <span className="rounded-md border border-[#EFD3D6] bg-[#FBEDEE] px-2 py-1 text-xs font-medium text-[#97323B]">
                    Eksik yoklama
                  </span>
                ) : (
                  <span className="rounded-md border border-[#C7E4D6] bg-[#E9F5EF] px-2 py-1 text-xs font-medium text-[#106B4A]">
                    Tamamlandı
                  </span>
                )}
              </td>
            </tr>
          ))}
        </Table>
        <div className="border-t border-[#E9EFF9] px-[18px] py-3 text-xs text-[#97323B]">
          Uyarı: Kadıköy ve Karşıyaka kayıtlarında en az bir haftanın öğrenci
          yoklaması eksik.
        </div>
      </Card>
    </div>
  );
}
