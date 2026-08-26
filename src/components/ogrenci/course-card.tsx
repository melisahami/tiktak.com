import type { Course } from "@/data/demo/ogrenci";

interface CourseCardProps {
  course: Course;
  onViewDetails: (courseId: string) => void;
  onJoinAttendance?: (courseId: string) => void;
}

export function CourseCard({
  course,
  onViewDetails,
  onJoinAttendance,
}: CourseCardProps) {
  const isAttendanceOpen = course.attendanceStatus === "open";

  return (
    <article className="rounded-xl border border-[#E4EAF2] bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#172033]">
              {course.name}
            </h3>
            {isAttendanceOpen && (
              <span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                ✓ Yoklama Açık
              </span>
            )}
          </div>

          <div className="mt-3 grid gap-2 text-xs text-[#667085]">
            <div>
              <span className="font-medium">Grup:</span> {course.group}
            </div>
            <div>
              <span className="font-medium">Dönem:</span> {course.semester}
            </div>
            <div>
              <span className="font-medium">Eğitmen:</span>{" "}
              {course.instructorName}
            </div>
            <div>
              <span className="font-medium">Konu:</span> {course.subject}
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-[#F5F7FB] p-3">
            <div className="text-xs text-[#667085]">
              <div className="mb-2">
                <span className="font-medium">İlerleme:</span> Hafta{" "}
                {course.currentWeek} / {course.totalWeeks}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#E4EAF2]">
                <div
                  className="h-full bg-[#14213D]"
                  style={{
                    width: `${(course.currentWeek / course.totalWeeks) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-[#667085]">
            <div>
              <span className="font-medium">Sonraki Ders:</span>{" "}
              {course.nextLessonDate} {course.nextLessonTime}
            </div>
          </div>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF8F0] flex-shrink-0">
          <span className="text-2xl">📚</span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          className="flex-1 rounded-lg bg-[#14213D] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#243B64]"
          onClick={() => onViewDetails(course.id)}
        >
          Ders Detayını Görüntüle
        </button>
        {isAttendanceOpen && onJoinAttendance && (
          <button
            className="flex-1 rounded-lg border border-[#F4A261] bg-[#FFF3E7] px-3 py-2.5 text-xs font-semibold text-[#B65A12] transition hover:bg-[#FFE8CE]"
            onClick={() => onJoinAttendance(course.id)}
          >
            Yoklamaya Katıl
          </button>
        )}
      </div>
    </article>
  );
}
