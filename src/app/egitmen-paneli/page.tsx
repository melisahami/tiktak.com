"use client";

import { useState } from "react";

import { LogoutButton } from "@/components/auth/logout-button";
import { SessionGuard } from "@/components/auth/session-guard";
import { InstructorPanelShell } from "@/components/egitmen/panel-shell";
import {
  Card,
  CardHead,
  Chip,
  PrimaryButton,
  StatCard,
} from "@/components/egitmen/ui";
import {
  MOCK_ACTIVE_ATTENDANCES,
  MOCK_INSTRUCTOR_COURSES,
  MOCK_INSTRUCTOR_NOTIFICATIONS,
  MOCK_INSTRUCTOR_STUDENTS,
  MOCK_PAST_ATTENDANCES,
} from "@/data/demo/ogrenci";
import { readSession } from "@/lib/auth/session";

type ActiveAttendance = (typeof MOCK_ACTIVE_ATTENDANCES)[number] & {
  pin: string;
};

export default function InstructorPanelPage() {
  const session = readSession();
  const instructorName = session?.user?.fullName ?? "Eğitmen";
  const [courses, setCourses] = useState(MOCK_INSTRUCTOR_COURSES);
  const [activeAttendances, setActiveAttendances] = useState(
    MOCK_ACTIVE_ATTENDANCES.map((attendance) => ({
      ...attendance,
      pin: "4827",
    })) as ActiveAttendance[],
  );
  const [students, setStudents] = useState(MOCK_INSTRUCTOR_STUDENTS);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(
    MOCK_ACTIVE_ATTENDANCES[0]?.courseId ?? null,
  );
  const [attendanceFilter, setAttendanceFilter] = useState<
    "all" | "attended" | "missing"
  >("all");

  const totalStudents = new Set(students.map((student) => student.id)).size;
  const averageAttendance = Math.round(
    (students.filter((student) => student.attendanceStatus === "katıldı")
      .length /
      totalStudents) *
      100,
  );
  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId,
  );
  const selectedStudents = students.filter(
    (student) => student.courseId === selectedCourseId,
  );

  const toggleAttendance = (courseId: string) => {
    const course = courses.find((item) => item.id === courseId);
    if (!course) return;

    setCourses((current) =>
      current.map((item) =>
        item.id === courseId
          ? {
              ...item,
              attendanceStatus:
                item.attendanceStatus === "open" ? "closed" : "open",
            }
          : item,
      ),
    );
    if (course.attendanceStatus === "open") {
      setActiveAttendances((current) =>
        current.filter((attendance) => attendance.courseId !== courseId),
      );
      setFeedback(`${course.name} yoklaması kapatıldı.`);
      setActiveCourseId(null);
      return;
    }

    setActiveAttendances((current) => [
      ...current,
      {
        id: `active-${course.id}`,
        courseId: course.id,
        courseName: course.name,
        group: course.group,
        openedAt: new Date().toLocaleDateString("tr-TR"),
        openedTime: new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        remainingMinutes: 120,
        pin: String(Math.floor(1000 + Math.random() * 9000)),
      },
    ]);
    setActiveCourseId(course.id);
    setFeedback(`${course.name} için yoklama açıldı.`);
  };

  const toggleStudentAttendance = (studentId: string) => {
    const student = students.find((item) => item.id === studentId);
    setStudents((current) =>
      current.map((item) =>
        item.id === studentId
          ? {
              ...item,
              attendanceStatus:
                item.attendanceStatus === "katıldı" ? "katılmadı" : "katıldı",
              attendanceTime:
                item.attendanceStatus === "katıldı"
                  ? undefined
                  : new Date().toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
            }
          : item,
      ),
    );
    setFeedback(
      `${student?.name ?? "Öğrenci"} için katılım durumu güncellendi. Öğrenciye bildirim gönderildi.`,
    );
  };

  return (
    <SessionGuard allow={["instructor"]}>
      <InstructorPanelShell
        instructorName={instructorName}
        logout={<LogoutButton />}
      >
        <div className="mx-auto max-w-7xl space-y-6">
          {feedback ? (
            <div
              aria-live="polite"
              className="rounded-lg border border-[#C7E4D6] bg-[#E9F5EF] px-4 py-3 text-sm text-[#106B4A]"
            >
              {feedback}
            </div>
          ) : null}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#8A5F0F]">
              Eğitmen çalışma alanı
            </p>
            <h1 className="mt-1 text-[22px] font-semibold text-[#14213D]">
              Ana sayfa
            </h1>
            <p className="mt-1.5 text-sm text-[#667085]">
              Dersleriniz, yoklamalarınız ve son gelişmeler tek yerde.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Toplam ders sayısı"
              value={String(courses.length)}
              note="Güz Dönemi 2026"
            />
            <StatCard
              label="Toplam öğrenci sayısı"
              value={String(totalStudents)}
              note="Aktif kayıtlar"
            />
            <StatCard
              label="Ortalama katılım oranı"
              value={`%${averageAttendance}`}
              note="Mevcut dersleriniz"
            />
            <StatCard
              label="Aktif yoklama sayısı"
              value={String(activeAttendances.length)}
              note="Şu anda açık"
            />
          </div>

          <section id="derslerim">
            <CardHead title="Derslerim" hint={`${courses.length} ders`} />
            <div className="grid gap-3 pt-3 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-[#14213D]">
                        {course.name}
                      </h2>
                      <p className="mt-1 text-xs text-[#667085]">
                        {course.group} · Güz 2026
                      </p>
                    </div>
                    <Chip>
                      {course.attendanceStatus === "open" ? "Açık" : "Kapandı"}
                    </Chip>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <dt className="text-[#667085]">Hafta</dt>
                      <dd className="mt-1 font-medium text-[#3C4657]">
                        {course.currentWeek} / {course.totalWeeks}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#667085]">Öğrenci</dt>
                      <dd className="mt-1 font-medium text-[#3C4657]">
                        {course.activeStudents}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-[#667085]">Sonraki ders</dt>
                      <dd className="mt-1 font-medium text-[#3C4657]">
                        {course.nextLessonDate} · {course.nextLessonTime}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <PrimaryButton onClick={() => toggleAttendance(course.id)}>
                      {course.attendanceStatus === "open"
                        ? "Yoklamayı kapat"
                        : "Yoklama aç"}
                    </PrimaryButton>
                    <button
                      className="rounded-lg border border-[#DDE5F0] px-3 py-2 text-xs text-[#243B64] hover:bg-[#F6F9FE]"
                      onClick={() => setSelectedCourseId(course.id)}
                    >
                      Öğrenci listesini görüntüle
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHead
                title="Aktif Yoklamalar"
                hint={`${activeAttendances.length} açık`}
              />
              <div className="space-y-4 p-4">
                {activeAttendances.length === 0 ? (
                  <p className="text-sm text-[#667085]">
                    Şu anda açık yoklama bulunmuyor.
                  </p>
                ) : (
                  activeAttendances.map((attendance) => (
                    <div
                      key={attendance.id}
                      className={`rounded-xl border p-4 transition ${activeCourseId === attendance.courseId ? "border-[#F59E4A] bg-[#FFF9ED]" : "border-[#DDE5F0] bg-[#F6F9FE]"}`}
                      onClick={() => setActiveCourseId(attendance.courseId)}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-[#14213D]">
                            {attendance.courseName} · {attendance.group}
                          </p>
                          <p className="mt-1 text-xs text-[#667085]">
                            Açılış: {attendance.openedAt},{" "}
                            {attendance.openedTime} · Kalan:{" "}
                            {attendance.remainingMinutes} dk
                          </p>
                        </div>
                        <div className="rounded-lg border border-[#EFDFBE] bg-[#FFF9ED] px-4 py-2 text-center">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A5F0F]">
                            Yoklama PIN
                          </p>
                          <p className="mt-0.5 text-2xl font-bold tracking-[0.28em] text-[#14213D]">
                            {attendance.pin}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#DDE5F0] pt-3">
                        <div className="flex gap-2 text-xs">
                          <span className="rounded-full bg-[#E9F5EF] px-2.5 py-1 font-medium text-[#106B4A]">
                            {
                              students.filter(
                                (student) =>
                                  student.courseId === attendance.courseId &&
                                  student.attendanceStatus === "katıldı",
                              ).length
                            }{" "}
                            katıldı
                          </span>
                          <span className="rounded-full bg-[#FBEDEE] px-2.5 py-1 font-medium text-[#9B2C2C]">
                            {
                              students.filter(
                                (student) =>
                                  student.courseId === attendance.courseId &&
                                  student.attendanceStatus === "katılmadı",
                              ).length
                            }{" "}
                            girmedi
                          </span>
                        </div>
                        <button
                          className="rounded-lg bg-[#FBEDEE] px-3 py-2 text-xs font-semibold text-[#9B2C2C] transition hover:bg-[#F4DDE0]"
                          onClick={() => toggleAttendance(attendance.courseId)}
                        >
                          Yoklamayı kapat
                        </button>
                      </div>
                    </div>
                  ))
                )}
                {activeAttendances.length > 0 ? (
                  <div className="border-t border-[#DDE5F0] pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
                        Katılım durumu
                      </p>
                      <div className="flex gap-1 rounded-lg bg-[#F6F9FE] p-1">
                        {(
                          [
                            ["all", "Tümü"],
                            ["attended", "Katılanlar"],
                            ["missing", "Girmeyenler"],
                          ] as const
                        ).map(([value, label]) => (
                          <button
                            key={value}
                            className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${attendanceFilter === value ? "bg-[#14213D] text-white" : "text-[#667085] hover:bg-white"}`}
                            onClick={() => setAttendanceFilter(value)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      {students
                        .filter(
                          (student) =>
                            student.courseId === activeCourseId &&
                            (attendanceFilter === "all" ||
                              (attendanceFilter === "attended"
                                ? student.attendanceStatus === "katıldı"
                                : student.attendanceStatus === "katılmadı")),
                        )
                        .map((student) => (
                          <div
                            className="flex items-center justify-between rounded-lg bg-[#F6F9FE] px-3 py-2.5"
                            key={student.id}
                          >
                            <div>
                              <p className="text-sm font-medium text-[#14213D]">
                                {student.name}
                              </p>
                              <p className="text-xs text-[#667085]">
                                {student.email}
                              </p>
                            </div>
                            <div className="text-right">
                              <Chip>
                                {student.attendanceStatus === "katıldı"
                                  ? "Katıldı"
                                  : "Katılmadı"}
                              </Chip>
                              <p className="mt-1 text-[11px] text-[#8B95A6]">
                                {student.attendanceTime ?? "Henüz giriş yok"}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Card>
            <Card>
              <CardHead
                title="Bildirimler"
                hint={`${MOCK_INSTRUCTOR_NOTIFICATIONS.length} bildirim`}
              />
              <div className="divide-y divide-[#DDE5F0]">
                {MOCK_INSTRUCTOR_NOTIFICATIONS.map((notification) => (
                  <div key={notification.id} className="p-4">
                    <p className="text-sm font-semibold text-[#14213D]">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-[#3C4657]">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card>
            <CardHead title="Son Yoklamalar" />
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

          {selectedCourse ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-[#DDE5F0] p-5">
                  <div>
                    <h2 className="font-semibold text-[#14213D]">
                      Öğrenci listesi
                    </h2>
                    <p className="mt-1 text-sm text-[#667085]">
                      {selectedCourse.name} · {selectedCourse.group}
                    </p>
                  </div>
                  <button
                    aria-label="Kapat"
                    className="text-xl text-[#667085]"
                    onClick={() => setSelectedCourseId(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="overflow-x-auto p-5">
                  <table className="w-full min-w-[620px] text-sm">
                    <thead>
                      <tr className="border-b border-[#DDE5F0] text-left text-xs text-[#667085]">
                        <th className="pb-3">Ad soyad</th>
                        <th className="pb-3">E-posta</th>
                        <th className="pb-3">Durum</th>
                        <th className="pb-3">Katılım saati</th>
                        <th className="pb-3">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStudents.map((student) => (
                        <tr
                          className="border-b border-[#DDE5F0]"
                          key={student.id}
                        >
                          <td className="py-3">{student.name}</td>
                          <td className="py-3 text-[#667085]">
                            {student.email}
                          </td>
                          <td className="py-3">
                            <Chip>
                              {student.attendanceStatus === "katıldı"
                                ? "Katıldı"
                                : "Katılmadı"}
                            </Chip>
                          </td>
                          <td className="py-3 text-[#667085]">
                            {student.attendanceTime ?? "-"}
                          </td>
                          <td className="py-3">
                            <button
                              className="rounded-lg border border-[#DDE5F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#243B64] shadow-sm transition hover:border-[#B7C7DE] hover:bg-[#F6F9FE]"
                              onClick={() =>
                                toggleStudentAttendance(student.id)
                              }
                            >
                              Durumu güncelle
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </InstructorPanelShell>
    </SessionGuard>
  );
}
