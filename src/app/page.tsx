import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] px-6 py-16 text-[#172033]">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white shadow-sm">
        <div className="bg-[#14213D] px-8 py-10 text-white">
          <p className="text-sm font-medium text-[#F4A261]">
            TikTakTürkiye Operasyon
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Eğitim operasyonları için görev, hazırlık ve yoklama yönetimi
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Merkezden atölyeye uzanan görev süreçlerini, eğitim öncesi malzeme
            hazırlığını ve yoklama akışlarını tek bir görünür operasyon
            platformunda birleştiriyoruz.
          </p>
        </div>

        <div className="grid gap-4 p-8 sm:grid-cols-3">
          <article className="rounded-xl border border-[#E4EAF2] bg-[#F5F7FB] p-5">
            <p className="text-sm font-medium text-[#667085]">Operasyon</p>
            <h2 className="mt-2 text-lg font-semibold">Görev takibi</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Merkezden il ve atölyelere görev atayın, ilerlemeyi görün.
            </p>
          </article>

          <article className="rounded-xl border border-[#E4EAF2] bg-[#F5F7FB] p-5">
            <p className="text-sm font-medium text-[#667085]">
              Eğitim hazırlığı
            </p>
            <h2 className="mt-2 text-lg font-semibold">Malzeme kontrolü</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Eğitim başlamadan tüm dönem malzemelerinin yeterliliğini
              doğrulayın.
            </p>
          </article>

          <article className="rounded-xl border border-[#E4EAF2] bg-[#F5F7FB] p-5">
            <p className="text-sm font-medium text-[#667085]">Katılım</p>
            <h2 className="mt-2 text-lg font-semibold">Yoklama yönetimi</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Eğitmen ve öğrenci katılımını ders oturumları üzerinden yönetin.
            </p>
          </article>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E4EAF2] px-8 py-6">
          <div>
            <p className="text-sm font-semibold text-[#172033]">
              MVP kontrol merkezi
            </p>
            <p className="mt-1 text-sm text-[#667085]">
              Merkez operasyon ekranını demo verileriyle görüntüleyin.
            </p>
          </div>

          <Link
            className="rounded-lg bg-[#14213D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243B64]"
            href="/merkez-paneli"
          >
            Merkez operasyon panelini aç
          </Link>
        </div>
      </section>
    </main>
  );
}