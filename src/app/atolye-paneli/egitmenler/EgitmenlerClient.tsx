"use client";

import { useState } from "react";
import {
  Card, CardHead, Chip, Empty, Notice, PageTitle, Primary, RowButton,
  Table, Tabs, TD, TR,
} from "@/components/atolye/ui";
import {
  DERS_OTURUMLARI, EGITMEN_DURUMLARI, EGITMEN_YOKLAMALARI, OGRENCILER,
  YOKLAMA_ISLEM_GECMISI,
} from "@/lib/demo/atolye";

const SEKMELER = ["Ders yoklaması", "Eğitmen yoklaması"] as const;
const OGR_SIRA = ["Katıldı", "Geç katıldı", "Katılmadı", "Bekleniyor"];

export default function EgitmenlerClient() {
  const [sekme, setSekme] = useState<(typeof SEKMELER)[number]>("Ders yoklaması");

  /* Ders yoklaması: atölye sorumlusu gerektiğinde manuel yoklama alır. */
  const [manuel, setManuel] = useState<string | null>(null);
  const [ogrenciler, setOgrenciler] = useState(() => OGRENCILER.map((o) => ({ ...o })));
  const [gecmis, setGecmis] = useState(YOKLAMA_ISLEM_GECMISI);

  /* Eğitmen yoklaması: atölye sorumlusunun kendi kaydı. */
  const [egitmenKayit, setEgitmenKayit] = useState(
    () => EGITMEN_YOKLAMALARI.map((e) => ({ ...e }))
  );

  const katilan = ogrenciler.filter(
    (o) => o.durum === "Katıldı" || o.durum === "Geç katıldı"
  ).length;

  function ogrenciDurumDegistir(id: string) {
    setOgrenciler((l) =>
      l.map((o) => {
        if (o.id !== id) return o;
        const yeni = OGR_SIRA[(OGR_SIRA.indexOf(o.durum) + 1) % OGR_SIRA.length];
        return {
          ...o,
          durum: yeni,
          saat: yeni === "Bekleniyor" || yeni === "Katılmadı" ? "–" : o.saat === "–" ? "10:00" : o.saat,
        };
      })
    );
  }

  function manuelKaydet() {
    setGecmis((g) => [
      {
        zaman: "Şimdi",
        aktor: "Zeynep Yıldız (Atölye Sorumlusu)",
        degisiklik: `Manuel yoklama alındı: ${katilan}/${ogrenciler.length} öğrenci katıldı.`,
        gerekce: "Eğitmen ders saatinde yoklama başlatmadı.",
        bilgilendirilen: "Eğitmen, İl Sorumlusu, Koordinatör",
      },
      ...g,
    ]);
    setManuel(null);
  }

  function egitmenDurumDegistir(id: string) {
    setEgitmenKayit((l) =>
      l.map((e) => {
        if (e.id !== id) return e;
        const i = EGITMEN_DURUMLARI.indexOf(e.durum as (typeof EGITMEN_DURUMLARI)[number]);
        const yeni = EGITMEN_DURUMLARI[(i + 1) % EGITMEN_DURUMLARI.length];
        return {
          ...e,
          durum: yeni,
          gelis: yeni === "Bekleniyor" || yeni === "Katılmadı" ? "–" : e.gelis === "–" ? e.saat : e.gelis,
          guncelleyen: "Zeynep Yıldız, şimdi",
        };
      })
    );
  }

  return (
    <div>
      <PageTitle
        title="Eğitmenler"
        sub="Ders yoklamalarını izleyin; eğitmenin görevde bulunma kaydını siz tutarsınız."
      />

      <Tabs items={SEKMELER} value={sekme} onChange={setSekme} />

      {sekme === "Ders yoklaması" ? (
        <div className="grid gap-[18px]">
          <Card>
            <CardHead
              title="Ders oturumları"
              hint="Öğrenci yoklaması eğitmen tarafından yürütülür; gerektiğinde manuel alınır."
            />
            <Table
              head={["Eğitmen", "Eğitim", "Grup", "Tarih ve saat", "Öğrenci", "Yoklama durumu", "Katılım", "İşlem"]}
              minWidth={980}
            >
              {DERS_OTURUMLARI.map((d) => (
                <tr key={d.id} className={TR}>
                  <td className={TD}>{d.egitmen}</td>
                  <td className={TD}>{d.egitim}</td>
                  <td className={TD}>{d.grup}</td>
                  <td className={`${TD} whitespace-nowrap`}>{d.tarih}, {d.saat}</td>
                  <td className={TD}>{d.ogrenciSayisi}</td>
                  <td className={TD}><Chip>{d.yoklamaDurumu}</Chip></td>
                  <td className={TD}>{d.katilim}</td>
                  <td className={TD}>
                    <RowButton
                      type="button"
                      disabled={d.yoklamaDurumu === "Tamamlandı"}
                      onClick={() => setManuel(d.id)}
                    >
                      {d.yoklamaDurumu === "Tamamlandı" ? "Kayıt tamamlandı" : "Manuel yoklama al"}
                    </RowButton>
                  </td>
                </tr>
              ))}
            </Table>
          </Card>

          {manuel ? (
            <Card>
              <CardHead title="Manuel yoklama" hint={`${katilan}/${ogrenciler.length} öğrenci katıldı`}>
                <Primary className="py-2 text-sm" onClick={manuelKaydet}>
                  Manuel yoklamayı kaydet
                </Primary>
                <RowButton type="button" onClick={() => setManuel(null)}>Vazgeç</RowButton>
              </CardHead>
              <div className="px-[18px] pt-3.5">
                <Notice tone="warn">
                  Manuel yoklama, eğitmenin yoklama başlatmadığı durumlar için kullanılır.
                  Kayıt eğitmene ve üst rollere bildirilir.
                </Notice>
              </div>
              <div className="mt-3.5">
                <Table head={["Öğrenci", "Öğrenci numarası", "Katılım durumu", "Katılım zamanı", "İşlem"]} minWidth={660}>
                  {ogrenciler.map((o) => (
                    <tr key={o.id} className={TR}>
                      <td className={TD}>{o.ad}</td>
                      <td className={`${TD} text-[#667085]`}>{o.no}</td>
                      <td className={TD}><Chip>{o.durum}</Chip></td>
                      <td className={`${TD} text-[#667085]`}>{o.saat}</td>
                      <td className={TD}>
                        <RowButton type="button" onClick={() => ogrenciDurumDegistir(o.id)}>
                          Durumu değiştir
                        </RowButton>
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </Card>
          ) : null}

          <Card className="p-[18px]">
            <h2 className="m-0 text-base font-semibold text-[#14213D]">Yoklama işlem geçmişi</h2>
            <p className="mt-1.5 mb-3 text-[13px] text-[#667085]">
              Manuel işlemler ve sonradan yapılan değişiklikler kayda alınır, eğitmene ve üst rollere bildirilir.
            </p>
            {gecmis.length === 0 ? (
              <Empty title="Kayıtlı bir yoklama işlemi bulunmuyor." />
            ) : (
              gecmis.map((h, i) => (
                <div key={i} className="mb-2.5 rounded-lg border border-[#DDE5F0] px-3.5 py-3">
                  <div className="text-[13px] text-[#667085]">{h.zaman} · {h.aktor}</div>
                  <div className="mt-1 text-sm text-[#14213D]">{h.degisiklik}</div>
                  <div className="mt-1 text-[13px] text-[#3C4657]">Gerekçe: {h.gerekce}</div>
                  <div className="mt-1.5 text-xs text-[#8B95A6]">
                    Bilgilendirilen birimler: {h.bilgilendirilen}
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>
      ) : (
        <div className="grid gap-[18px]">
          <Notice tone="info">
            Eğitmen yoklaması, ders oturumunda eğitmenin görevde bulunma durumunu kaydetmek için
            Atölye Sorumlusu tarafından yürütülür.
          </Notice>

          <Card>
            <CardHead title="Eğitmen görev kaydı" />
            <Table
              head={["Eğitmen", "Eğitim", "Grup", "Tarih ve saat", "Durum", "Geliş saati", "Not", "İşlem"]}
              minWidth={1000}
            >
              {egitmenKayit.map((e) => (
                <tr key={e.id} className={TR}>
                  <td className={TD}>{e.egitmen}</td>
                  <td className={TD}>{e.egitim}</td>
                  <td className={TD}>{e.grup}</td>
                  <td className={`${TD} whitespace-nowrap`}>{e.tarih}, {e.saat}</td>
                  <td className={TD}><Chip>{e.durum}</Chip></td>
                  <td className={`${TD} text-[#667085]`}>{e.gelis}</td>
                  <td className={`${TD} text-[#667085]`}>{e.not}</td>
                  <td className={TD}>
                    <RowButton type="button" onClick={() => egitmenDurumDegistir(e.id)}>
                      Durumu değiştir
                    </RowButton>
                  </td>
                </tr>
              ))}
            </Table>
          </Card>

          <div className="grid gap-[18px] xl:grid-cols-2">
            <Card className="p-[18px]">
              <h2 className="m-0 text-base font-semibold text-[#14213D]">
                Eğitmen yoklama değişiklik geçmişi
              </h2>
              <p className="mt-1.5 mb-3 text-[13px] text-[#667085]">
                Kayıtlar korunur, değişiklikler eğitmene ve yetkili rollere bildirilir.
              </p>
              {egitmenKayit
                .filter((e) => e.guncelleyen !== "–")
                .map((e) => (
                  <div key={e.id} className="mb-2.5 rounded-lg border border-[#DDE5F0] px-3.5 py-3">
                    <div className="text-[13px] text-[#667085]">{e.guncelleyen}</div>
                    <div className="mt-1 text-sm text-[#14213D]">
                      {e.egitmen} · {e.egitim} / {e.grup} → {e.durum}
                    </div>
                  </div>
                ))}
              {egitmenKayit.every((e) => e.guncelleyen === "–") ? (
                <Empty title="Henüz eğitmen yoklama değişikliği kaydedilmedi." />
              ) : null}
            </Card>

            <Card className="p-[18px]">
              <h2 className="m-0 text-base font-semibold text-[#14213D]">
                Dikkat gerektiren eğitmen durumları
              </h2>
              <div className="mt-3 grid gap-2.5">
                {egitmenKayit.filter((e) => e.durum === "Bekleniyor").length === 0 ? (
                  <Empty title="Dikkat gerektiren eğitmen durumu bulunmuyor." />
                ) : (
                  egitmenKayit
                    .filter((e) => e.durum === "Bekleniyor")
                    .map((e) => (
                      <div
                        key={e.id}
                        className="rounded-lg border border-[#EFDFBE] bg-[#FDF4E3] px-3.5 py-3 text-sm text-[#8A5F0F]"
                      >
                        {e.egitmen} için {e.egitim} / {e.grup} ({e.tarih}, {e.saat}) kaydı
                        henüz alınmadı.
                      </div>
                    ))
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
