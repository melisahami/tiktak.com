import type { Attendance } from "@/data/demo/ogrenci";

interface RecentAttendancesProps {
  attendances: Attendance[];
}

export function RecentAttendances({ attendances }: RecentAttendancesProps) {
  const recentAttendances = attendances.slice(-5).reverse();

  if (recentAttendances.length === 0) {
    return (
      <section className="rounded-xl border border-[#E4EAF2] bg-white p-8 text-center">
        <p className="text-sm text-[#667085]">
          Henüz bir yoklama kaydı bulunmamaktadır.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="space-y-3">
        {recentAttendances.map((attendance) => (
          <article
            key={attendance.id}
            className="rounded-lg border border-[#E4EAF2] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#172033]">
                  {attendance.courseName}
                </h4>
                <div className="mt-2 grid gap-1 text-xs text-[#667085]">
                  <div>
                    <span className="font-medium">Grup:</span> {attendance.group}
                  </div>
                  <div>
                    <span className="font-medium">Hafta:</span> {attendance.week}{" "}
                    - {attendance.subject}
                  </div>
                  <div>
                    <span className="font-medium">Tarih:</span>{" "}
                    {attendance.date}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    attendance.status === "katıldı"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {attendance.status === "katıldı" ? "✓" : "✗"}{" "}
                  {attendance.status.charAt(0).toUpperCase() +
                    attendance.status.slice(1)}
                </span>
                {attendance.attendedAt && (
                  <span className="text-xs text-[#667085]">
                    {attendance.attendedAt}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
