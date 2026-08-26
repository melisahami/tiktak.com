import { LogoutButton } from "@/components/auth/logout-button";
import { MetricCard } from "@/components/ui/metric-card";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { StatusBadge } from "@/components/ui/status-badge";

const priorityActions = [
  {
    task: "Robotik ve Kodlama eğitim öncesi hazırlık",
    location: "İstanbul / Üsküdar Atölyesi",
    responsible: "Zeynep Yıldız",
    dueDate: "20 Eylül 2026",
    status: "Eksik var" as const,
    priority: "Kritik" as const,
    risk: "3 malzeme kalemi eksik",
  },
  {
    task: "Atölye operasyon kapanış kontrolü",
    location: "Bursa / Nilüfer Atölyesi",
    responsible: "Bursa İl Sorumlusu",
    dueDate: "16 Eylül 2026",
    status: "Gecikti" as const,
    priority: "Kritik" as const,
    risk: "4 gündür gecikiyor",
  },
  {
    task: "Eğitmen hazırlık durumlarını kontrol et",
    location: "İzmir / Konak Atölyesi",
    responsible: "İzmir İl Sorumlusu",
    dueDate: "22 Eylül 2026",
    status: "Devam ediyor" as const,
    priority: "Orta" as const,
    risk: "2 eğitim grubu bekliyor",
  },
];

const provinceReadiness = [
  {
    name: "İstanbul",
    workshops: "8 / 12 atölye hazır",
    shortages: "3 açık malzeme eksiği",
    completion: 67,
  },
  {
    name: "Ankara",
    workshops: "9 / 10 atölye hazır",
    shortages: "1 açık malzeme eksiği",
    completion: 90,
  },
  {
    name: "İzmir",
    workshops: "5 / 8 atölye hazır",
    shortages: "4 açık malzeme eksiği",
    completion: 63,
  },
  {
    name: "Bursa",
    workshops: "3 / 6 atölye hazır",
    shortages: "2 açık malzeme eksiği",
    completion: 50,
  },
  {
    name: "Kocaeli",
    workshops: "6 / 6 atölye hazır",
    shortages: "Açık eksik yok",
    completion: 100,
  },
];

const upcomingPrograms = [
  {
    name: "Robotik ve Kodlama",
    period: "Güz Dönemi 2026",
    date: "30 Eylül 2026",
    remaining: "10 gün kaldı",
    status: "Hazırlık devam ediyor",
  },
  {
    name: "Temel Elektronik",
    period: "Güz Dönemi 2026",
    date: "2 Ekim 2026",
    remaining: "12 gün kaldı",
    status: "Hazırlık planlandı",
  },
  {
    name: "Proje Geliştirme",
    period: "Güz Dönemi 2026",
    date: "20 Ekim 2026",
    remaining: "30 gün kaldı",
    status: "Dokümanlar hazırlanıyor",
  },
];

export default function CentralOperationsPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#172033]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 bg-[#14213D] px-4 py-6 text-white lg:block">
          <div className="border-b border-white/10 px-3 pb-6">
            <p className="text-sm font-medium text-[#F4A261]">TikTakTürkiye</p>
            <h1 className="mt-1 text-lg font-semibold">Operasyon</h1>
          </div>

          <nav className="mt-6 space-y-2 text-sm">
            <a
              className="flex items-center rounded-lg border-l-2 border-[#F4A261] bg-white/10 px-3 py-2.5 font-medium text-white"
              href="/merkez-paneli"
            >
              Genel bakış
            </a>

            <a
              className="flex items-center rounded-lg px-3 py-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              href="#gorevler"
            >
              Görevler
            </a>

            <a
              className="flex items-center rounded-lg px-3 py-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              href="#egitimler"
            >
              Eğitimler
            </a>

            <a
              className="flex items-center rounded-lg px-3 py-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              href="#iller"
            >
              İller
            </a>

            <a
              className="flex items-center rounded-lg px-3 py-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              href="#bildirimler"
            >
              Bildirimler
            </a>
          </nav>

          <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400">Aktif kullanıcı</p>
            <p className="mt-1 text-sm font-medium">Merkez Operasyon</p>
            <p className="mt-1 text-xs text-slate-400">
              81 il operasyon görünümü
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[#E4EAF2] bg-white px-6 py-4 lg:px-8">
            <div>
              <p className="text-xs font-medium text-[#667085]">
                Genel bakış / Merkez operasyon
              </p>
              <p className="mt-1 text-sm font-medium text-[#172033]">
                Türkiye geneli operasyon yönetimi
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="hidden rounded-lg border border-[#E4EAF2] bg-white px-3 py-2 text-sm font-medium text-[#667085] sm:inline-flex"
                type="button"
              >
                Bildirimler
              </button>

              <LogoutButton />

              <div className="hidden border-l border-[#E4EAF2] pl-3 text-right sm:block">
                <p className="text-sm font-medium text-[#172033]">
                  Merkez Operasyon
                </p>
                <p className="text-xs text-[#667085]">Sistem yöneticisi</p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF3E7] text-sm font-semibold text-[#B65A12]">
                MO
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <section className="rounded-2xl bg-gradient-to-r from-[#14213D] to-[#243B64] px-6 py-7 text-white md:px-8">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-medium text-[#F4A261]">
                    DENEYAP eğitim operasyonları
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    Merkez operasyon
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                    Eğitim hazırlıkları, görev ilerlemeleri ve il bazlı
                    operasyon risklerini tek ekrandan takip edin.
                  </p>
                </div>

                <button
                  className="rounded-lg bg-[#F4A261] px-4 py-2.5 text-sm font-semibold text-[#172033] transition hover:bg-[#F7B679]"
                  type="button"
                >
                  Yeni görev oluştur
                </button>
              </div>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Açık görevler"
                value="24"
                description="İşlem bekleyen operasyon görevleri"
                tone="navy"
              />

              <MetricCard
                label="Geciken görevler"
                value="4"
                description="Termin tarihi geçmiş açık görevler"
                tone="danger"
              />

              <MetricCard
                label="Kritik riskler"
                value="3"
                description="Öncelikli aksiyon gerektiren durumlar"
                tone="amber"
              />

              <MetricCard
                label="Eğitime hazır atölyeler"
                value="31 / 42"
                description="Tüm hazırlıkları tamamlanmış atölyeler"
                tone="success"
              />
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <article className="overflow-hidden rounded-xl border border-[#E4EAF2] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E4EAF2] px-5 py-4">
                  <div>
                    <h3 className="text-base font-semibold">
                      Öncelikli aksiyonlar
                    </h3>
                    <p className="mt-1 text-sm text-[#667085]">
                      Kritik, geciken veya eksik içeren görevler
                    </p>
                  </div>

                  <button
                    className="text-sm font-medium text-[#243B64] transition hover:text-[#B65A12]"
                    type="button"
                  >
                    Tüm görevleri görüntüle
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-[#F8FAFC] text-xs font-medium text-[#667085]">
                      <tr>
                        <th className="px-5 py-3">Görev</th>
                        <th className="px-5 py-3">Sorumlu</th>
                        <th className="px-5 py-3">Termin</th>
                        <th className="px-5 py-3">Durum</th>
                        <th className="px-5 py-3">Risk</th>
                      </tr>
                    </thead>

                    <tbody>
                      {priorityActions.map((item) => (
                        <tr
                          className="border-t border-[#E4EAF2] transition hover:bg-[#F8FAFC]"
                          key={item.task}
                        >
                          <td className="px-5 py-4">
                            <p className="font-medium text-[#172033]">
                              {item.task}
                            </p>
                            <p className="mt-1 text-xs text-[#667085]">
                              {item.location}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-[#667085]">
                            {item.responsible}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-[#667085]">
                            {item.dueDate}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex flex-col items-start gap-2">
                              <StatusBadge status={item.status} />
                              <PriorityBadge priority={item.priority} />
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-[#C2414B]">
                            {item.risk}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="rounded-xl border border-[#E4EAF2] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold">
                      Yaklaşan eğitim başlangıçları
                    </h3>
                    <p className="mt-1 text-sm text-[#667085]">
                      Hazırlık süreci devam eden programlar
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {upcomingPrograms.map((program) => (
                    <div
                      className="rounded-lg border border-[#E4EAF2] bg-[#F8FAFC] p-4"
                      key={program.name}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-[#172033]">
                            {program.name}
                          </p>
                          <p className="mt-1 text-xs text-[#667085]">
                            {program.period}
                          </p>
                        </div>

                        <span className="rounded-full bg-[#FFF3E7] px-2.5 py-1 text-xs font-medium text-[#B65A12]">
                          {program.remaining}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span className="text-[#667085]">{program.date}</span>
                        <span className="font-medium text-[#243B64]">
                          {program.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="mt-8 rounded-xl border border-[#E4EAF2] bg-white p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-base font-semibold">
                    İl bazlı hazırlık durumu
                  </h3>
                  <p className="mt-1 text-sm text-[#667085]">
                    Eğitim başlangıcı öncesi atölye hazırlık ve malzeme
                    yeterlilik görünümü
                  </p>
                </div>

                <button
                  className="text-sm font-medium text-[#243B64] transition hover:text-[#B65A12]"
                  type="button"
                >
                  Tüm illeri görüntüle
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {provinceReadiness.map((province) => (
                  <article
                    className="rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] p-4"
                    key={province.name}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-[#172033]">
                        {province.name}
                      </h4>
                      <span className="text-sm font-semibold text-[#243B64]">
                        %{province.completion}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-[#667085]">
                      {province.workshops}
                    </p>

                    <p className="mt-1 text-xs text-[#B65A12]">
                      {province.shortages}
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E4EAF2]">
                      <div
                        className="h-full rounded-full bg-[#243B64]"
                        style={{ width: `${province.completion}%` }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
