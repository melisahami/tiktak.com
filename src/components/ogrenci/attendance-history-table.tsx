import type { Attendance } from "@/data/demo/ogrenci";

interface AttendanceHistoryTableProps {
  attendances: Attendance[];
}

export function AttendanceHistoryTable({
  attendances,
}: AttendanceHistoryTableProps) {
  if (attendances.length === 0) {
    return (
      <section className="rounded-xl border border-[#E4EAF2] bg-white p-8 text-center">
        <p className="text-sm text-[#667085]">
          Yoklama geçmişi bulunmamaktadır.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-x-auto rounded-xl border border-[#E4EAF2] bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E4EAF2] bg-[#F8FAFC]">
            <th className="px-6 py-4 text-left font-semibold text-[#172033]">
              Ders
            </th>
            <th className="px-6 py-4 text-left font-semibold text-[#172033]">
              Grup
            </th>
            <th className="px-6 py-4 text-left font-semibold text-[#172033]">
              Hafta
            </th>
            <th className="px-6 py-4 text-left font-semibold text-[#172033]">
              Konusu
            </th>
            <th className="px-6 py-4 text-left font-semibold text-[#172033]">
              Tarih
            </th>
            <th className="px-6 py-4 text-left font-semibold text-[#172033]">
              Durum
            </th>
            <th className="px-6 py-4 text-left font-semibold text-[#172033]">
              Katılım Saati
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E4EAF2]">
          {attendances.map((attendance) => (
            <tr key={attendance.id} className="transition hover:bg-[#F8FAFC]">
              <td className="px-6 py-4 font-medium text-[#172033]">
                {attendance.courseName}
              </td>
              <td className="px-6 py-4 text-[#667085]">{attendance.group}</td>
              <td className="px-6 py-4 text-[#667085]">{attendance.week}</td>
              <td className="px-6 py-4 text-[#667085]">{attendance.subject}</td>
              <td className="px-6 py-4 text-[#667085]">{attendance.date}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    attendance.status === "katıldı"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {attendance.status === "katıldı" ? "✓" : "✗"}{" "}
                  {attendance.status.charAt(0).toUpperCase() +
                    attendance.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-[#667085]">
                {attendance.attendedAt || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {attendances.length > 0 && (
        <div className="border-t border-[#E4EAF2] px-6 py-4">
          <p className="text-xs text-[#667085]">
            Toplam {attendances.length} yoklama kaydı.
          </p>
        </div>
      )}
    </section>
  );
}
