"use client";

import Link from "next/link";

import { SessionGuard } from "@/components/auth/session-guard";
import { StudentHeader } from "@/components/ogrenci/student-header";
import { useSession } from "@/lib/auth/use-session";

export default function StudentProfilePage() {
  const { session } = useSession();
  const student = session?.user;

  return (
    <SessionGuard allow={["student"]}>
      <div className="min-h-screen bg-[#F5F7FB]">
        <StudentHeader studentName={student?.fullName ?? "Öğrenci"} />

        <main className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
          <Link
            className="text-sm font-medium text-[#243B64] transition hover:text-[#B65A12]"
            href="/ogrenci-ana-sayfa"
          >
            ← Ana sayfaya dön
          </Link>

          <section className="mt-6 rounded-2xl border border-[#E4EAF2] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-4 border-b border-[#E4EAF2] pb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4A261] text-lg font-semibold text-white">
                {student?.initials ?? "Ö"}
              </div>
              <div>
                <p className="text-sm font-medium text-[#667085]">Profil</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#172033]">
                  {student?.fullName ?? "Öğrenci"}
                </h1>
              </div>
            </div>

            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[#667085]">
                  E-posta
                </dt>
                <dd className="mt-1 text-sm font-medium text-[#172033]">
                  {student?.email ?? "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[#667085]">
                  Hesap türü
                </dt>
                <dd className="mt-1 text-sm font-medium text-[#172033]">
                  Öğrenci
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-[#667085]">
                  Eğitim bilgisi
                </dt>
                <dd className="mt-1 text-sm font-medium text-[#172033]">
                  {student?.organization ?? "-"}
                </dd>
              </div>
            </dl>
          </section>
        </main>
      </div>
    </SessionGuard>
  );
}
