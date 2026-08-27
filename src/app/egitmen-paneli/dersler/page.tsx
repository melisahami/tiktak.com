"use client";

import { useState } from "react";
import { LogoutButton } from "@/components/auth/logout-button";
import { SessionGuard } from "@/components/auth/session-guard";
import { InstructorPanelShell } from "@/components/egitmen/panel-shell";
import { Card, CardHead, Chip } from "@/components/egitmen/ui";
import { MOCK_INSTRUCTOR_COURSES, type InstructorCourse } from "@/data/demo/ogrenci";
import { readSession } from "@/lib/auth/session";

function DokumenKart({ doc }: { doc: { ad: string; meta: string } }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#DDE5F0] p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FBEDEE]">
        <span className="text-[10px] font-bold text-[#9B2C2C]">PDF</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#14213D] leading-snug">{doc.ad}</p>
        <p className="mt-0.5 text-[12px] text-[#667085]">{doc.meta}</p>
        <button className="mt-2 rounded-md border border-[#DDE5F0] bg-[#F6F9FE] px-2.5 py-1 text-[11px] text-[#243B64] hover:bg-[#E9EFF9]" type="button">
          Görüntüle / İndir
        </button>
      </div>
    </div>
  );
}

function DersDetay({ course }: { course: InstructorCourse }) {
  const [seciliHafta, setSeciliHafta] = useState(0);
  const docs = course.haftaDokumanlari ?? [];
  const hafta = docs[seciliHafta];

  return (
    <div className="mt-4 rounded-xl border border-[#DDE5F0] bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-[17px] font-semibold text-[#14213D]">{course.name}</h2>
          <p className="mt-1 text-sm text-[#667085]">{course.group} · Güz Dönemi 2026 · {course.totalWeeks} hafta</p>
        </div>
        <Chip>{course.attendanceStatus === "open" ? "Açık" : "Kapandı"}</Chip>
      </div>

      {docs.length === 0 ? (
        <p className="mt-4 text-sm text-[#667085]">Bu ders için henüz doküman yüklenmemiş.</p>
      ) : (
        <>
          {/* Hafta sekmeleri */}
          <div className="mt-5 flex flex-wrap gap-2 border-b border-[#DDE5F0] pb-3">
            {docs.map((d, i) => (
              <button
                key={d.hafta}
                type="button"
                onClick={() => setSeciliHafta(i)}
                className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition ${seciliHafta === i ? "bg-[#14213D] text-white" : "border border-[#DDE5F0] text-[#3C4657] hover:bg-[#F6F9FE]"}`}
              >
                Hafta {d.hafta}
              </button>
            ))}
          </div>

          {hafta ? (
            <div className="mt-4">
              <p className="mb-3 text-sm font-semibold text-[#14213D]">
                Hafta {hafta.hafta} — {hafta.konu}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#667085]">📓 Ders Notu</p>
                  <DokumenKart doc={hafta.dersnotu} />
                </div>
                <div>
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#667085]">📦 Malzeme Dokümanı</p>
                  <DokumenKart doc={hafta.malzeme} />
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default function InstructorCoursesPage() {
  const session = readSession();
  const instructorName = session?.user?.fullName ?? "Eğitmen";
  const [secilenId, setSecilenId] = useState<string | null>(null);
  const secilenDers = MOCK_INSTRUCTOR_COURSES.find((c) => c.id === secilenId) ?? null;

  return (
    <SessionGuard allow={["instructor"]}>
      <InstructorPanelShell instructorName={instructorName} logout={<LogoutButton />}>
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-[22px] font-semibold text-[#14213D]">Derslerim</h1>
            <p className="mt-1.5 text-sm text-[#667085]">
              Size atanan tüm dersler ve haftalık dokümanlar.
            </p>
          </div>
          <Card>
            <CardHead title="Atanan dersler" hint={`${MOCK_INSTRUCTOR_COURSES.length} ders`} />
            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
              {MOCK_INSTRUCTOR_COURSES.map((course) => (
                <article
                  className={`rounded-lg border p-4 transition cursor-pointer ${secilenId === course.id ? "border-[#F59E4A] bg-[#FFF9ED]" : "border-[#DDE5F0] hover:bg-[#F6F9FE]"}`}
                  key={course.id}
                  onClick={() => setSecilenId(secilenId === course.id ? null : course.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-[#14213D]">{course.name}</h2>
                    <Chip>{course.attendanceStatus === "open" ? "Açık" : "Kapandı"}</Chip>
                  </div>
                  <p className="mt-2 text-sm text-[#667085]">{course.group} · Güz 2026</p>
                  <dl className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-[#667085]">Toplam hafta</dt>
                      <dd>{course.totalWeeks}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#667085]">Mevcut hafta</dt>
                      <dd>{course.currentWeek}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#667085]">Aktif öğrenci</dt>
                      <dd>{course.activeStudents}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#667085]">Sonraki ders</dt>
                      <dd>{course.nextLessonDate} · {course.nextLessonTime}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[#356AE6]">
                    <span>{(course.haftaDokumanlari ?? []).length} hafta dokümanı mevcut</span>
                    <span>{secilenId === course.id ? "▲" : "▼"}</span>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          {secilenDers ? <DersDetay course={secilenDers} /> : null}
        </div>
      </InstructorPanelShell>
    </SessionGuard>
  );
}
