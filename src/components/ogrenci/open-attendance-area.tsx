import type { OpenAttendance } from "@/data/demo/ogrenci";

interface OpenAttendanceAreaProps {
  attendances: OpenAttendance[];
  onJoin: (attendanceId: string) => void;
}

export function OpenAttendanceArea({
  attendances,
  onJoin,
}: OpenAttendanceAreaProps) {
  if (attendances.length === 0) {
    return (
      <section className="rounded-xl border border-[#E4EAF2] bg-white p-8 text-center">
        <p className="text-sm text-[#667085]">
          Şu anda açık yoklama bulunmamaktadır.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {attendances.map((attendance) => (
        <article
          key={attendance.id}
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-emerald-900">
                  {attendance.courseName}
                </h3>
                <span className="rounded-full bg-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  📍 Açık
                </span>
              </div>

              <div className="mt-3 grid gap-2 text-sm text-emerald-800">
                <div>
                  <span className="font-medium">Grup:</span> {attendance.group}
                </div>
                <div>
                  <span className="font-medium">Tarih & Saat:</span>{" "}
                  {attendance.date} {attendance.time}
                </div>
                <div>
                  <span className="font-medium">Konusu:</span>{" "}
                  {attendance.subject}
                </div>
                <div>
                  <span className="font-medium">Hafta:</span> {attendance.week}
                </div>
              </div>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-200 flex-shrink-0">
              <span className="text-xl">✓</span>
            </div>
          </div>

          {attendance.isSubmitted ? (
            <div className="mt-4 rounded-lg bg-emerald-100 px-4 py-2 text-center">
              <p className="text-xs font-semibold text-emerald-700">
                ✓ Yoklamaya katıldınız
              </p>
              <p className="text-xs text-emerald-600">
                Katılım saati: {attendance.submittedAt}
              </p>
            </div>
          ) : (
            <button
              className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              onClick={() => onJoin(attendance.id)}
            >
              Yoklamaya Katıl
            </button>
          )}
        </article>
      ))}
    </section>
  );
}
