import { LogoutButton } from "@/components/auth/logout-button";
import { SessionGuard } from "@/components/auth/session-guard";
import { InstructorPanelShell } from "@/components/egitmen/panel-shell";
import { Card, CardHead, Chip } from "@/components/egitmen/ui";
import {
  MOCK_ACTIVE_ATTENDANCES,
  MOCK_PAST_ATTENDANCES,
} from "@/data/demo/ogrenci";
import { readSession } from "@/lib/auth/session";

export default function InstructorAttendancePage() {
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
              Yoklama
            </h1>
            <p className="mt-1.5 text-sm text-[#667085]">
              Açık ve geçmiş yoklamalarınızı yönetin.
            </p>
          </div>
          <Card>
            <CardHead
              title="Aktif yoklamalar"
              hint={`${MOCK_ACTIVE_ATTENDANCES.length} açık`}
            />
            <div className="space-y-3 p-4">
              {MOCK_ACTIVE_ATTENDANCES.map((attendance) => (
                <div
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#DDE5F0] p-4"
                  key={attendance.id}
                >
                  <div>
                    <h2 className="font-semibold text-[#14213D]">
                      {attendance.courseName}
                    </h2>
                    <p className="mt-1 text-sm text-[#667085]">
                      {attendance.group} · Açılış {attendance.openedAt},{" "}
                      {attendance.openedTime}
                    </p>
                  </div>
                  <Chip> Açık </Chip>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHead title="Yoklama geçmişi" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-sm">
                <thead className="bg-[#F6F9FE]">
                  <tr>
                    {[
                      "Ders",
                      "Grup",
                      "Hafta",
                      "Konu",
                      "Tarih",
                      "Açılış",
                      "Kapanış",
                      "Katılan",
                    ].map((heading) => (
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-[#14213D]"
                        key={heading}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PAST_ATTENDANCES.map((attendance) => (
                    <tr
                      className="border-t border-[#DDE5F0]"
                      key={attendance.id}
                    >
                      <td className="px-4 py-3">{attendance.courseName}</td>
                      <td className="px-4 py-3">{attendance.group}</td>
                      <td className="px-4 py-3">{attendance.week}</td>
                      <td className="px-4 py-3">{attendance.subject}</td>
                      <td className="px-4 py-3">{attendance.date}</td>
                      <td className="px-4 py-3">{attendance.openedTime}</td>
                      <td className="px-4 py-3">{attendance.closedTime}</td>
                      <td className="px-4 py-3 font-semibold">
                        {attendance.studentsAttended}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </InstructorPanelShell>
    </SessionGuard>
  );
}
