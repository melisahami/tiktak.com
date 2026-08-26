import { LogoutButton } from "@/components/auth/logout-button";
import { SessionGuard } from "@/components/auth/session-guard";
import { InstructorPanelShell } from "@/components/egitmen/panel-shell";
import { Card, CardHead, Chip } from "@/components/egitmen/ui";
import { MOCK_INSTRUCTOR_COURSES } from "@/data/demo/ogrenci";
import { readSession } from "@/lib/auth/session";

export default function InstructorCoursesPage() {
  const session = readSession();
  const instructorName = session?.user?.fullName ?? "Eğitmen";

  return (
    <SessionGuard allow={["instructor"]}>
      <InstructorPanelShell
        instructorName={instructorName}
        logout={<LogoutButton />}
      >
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-[22px] font-semibold text-[#14213D]">
              Derslerim
            </h1>
            <p className="mt-1.5 text-sm text-[#667085]">
              Size atanan tüm ders ve gruplar.
            </p>
          </div>
          <Card>
            <CardHead
              title="Atanan dersler"
              hint={`${MOCK_INSTRUCTOR_COURSES.length} ders`}
            />
            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
              {MOCK_INSTRUCTOR_COURSES.map((course) => (
                <article
                  className="rounded-lg border border-[#DDE5F0] p-4"
                  key={course.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-[#14213D]">
                      {course.name}
                    </h2>
                    <Chip>
                      {course.attendanceStatus === "open" ? "Açık" : "Kapandı"}
                    </Chip>
                  </div>
                  <p className="mt-2 text-sm text-[#667085]">
                    {course.group} · Güz 2026
                  </p>
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
                      <dd>
                        {course.nextLessonDate} · {course.nextLessonTime}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </Card>
        </div>
      </InstructorPanelShell>
    </SessionGuard>
  );
}
