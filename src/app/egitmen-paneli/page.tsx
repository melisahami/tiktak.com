"use client";

import { useEffect, useRef, useState } from "react";

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
  MOCK_INSTRUCTOR_COURSES,
  MOCK_INSTRUCTOR_NOTIFICATIONS,
  MOCK_INSTRUCTOR_STUDENTS,
  MOCK_INSTRUCTOR_TASKS,
  MOCK_PAST_ATTENDANCES,
  type InstructorTask,
} from "@/data/demo/ogrenci";
import { readSession } from "@/lib/auth/session";
import { generatePin, setPin, clearPin } from "@/lib/demo/pin-store";
import { getTamamlananGorevler, goreviTamamla } from "@/lib/demo/gorev-store";

/** Her aktif yoklama için tutulan state */
type ActiveSession = {
  courseId: string;
  courseName: string;
  group: string;
  pin: string;
  openedAt: string;
  /** ms cinsinden ne zaman süresi dolacak (Date.now() + 15dk) */
  expiresAt: number;
};

function useYoklamaStore() {
  const [sessions, setSessions] = useState<ActiveSession[]>([]);

  const startSession = (courseId: string, courseName: string, group: string) => {
    const pin = generatePin();
    const expiresAt = Date.now() + 15 * 60 * 1000;
    setPin(courseId, courseName, pin);
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.courseId !== courseId);
      return [
        ...filtered,
        {
          courseId,
          courseName,
          group,
          pin,
          openedAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          expiresAt,
        },
      ];
    });
    return pin;
  };

  const renewPin = (courseId: string) => {
    const pin = generatePin();
    const expiresAt = Date.now() + 15 * 60 * 1000;
    setSessions((prev) =>
      prev.map((s) =>
        s.courseId === courseId ? { ...s, pin, expiresAt } : s
      )
    );
    setPin(courseId, sessions.find(s => s.courseId === courseId)?.courseName ?? "", pin);
    return pin;
  };

  const endSession = (courseId: string) => {
    clearPin(courseId);
    setSessions((prev) => prev.filter((s) => s.courseId !== courseId));
  };

  return { sessions, startSession, renewPin, endSession };
}

/** Tek bir aktif yoklama kartı — PIN geri sayım + 15dk yenileme */
function ActiveSessionCard({
  session,
  students,
  onRenew,
  onClose,
  onToggleStudent,
}: {
  session: ActiveSession;
  students: typeof MOCK_INSTRUCTOR_STUDENTS;
  onRenew: () => void;
  onClose: () => void;
  onToggleStudent: (id: string) => void;
}) {
  const [remaining, setRemaining] = useState(
    Math.max(0, Math.round((session.expiresAt - Date.now()) / 1000))
  );
  const [filter, setFilter] = useState<"all" | "attended" | "missing">("all");

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = Math.max(0, Math.round((session.expiresAt - Date.now()) / 1000));
      setRemaining(secs);
      if (secs === 0) {
        onRenew();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [session.expiresAt, onRenew]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const courseStudents = students.filter((s) => s.courseId === session.courseId);
  const attended = courseStudents.filter((s) => s.attendanceStatus === "katıldı");
  const missing = courseStudents.filter((s) => s.attendanceStatus === "katılmadı");
  const displayed =
    filter === "attended"
      ? attended
      : filter === "missing"
      ? missing
      : courseStudents;

  return (
    <div className="rounded-xl border border-[#F59E4A] bg-[#FFF9ED] p-4 space-y-4">
      {/* Ders başlığı + kapat */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-[#14213D]">
            {session.courseName} · {session.group}
          </p>
          <p className="mt-1 text-xs text-[#667085]">
            Açılış: {session.openedAt}
          </p>
        </div>
        <button
          className="rounded-lg bg-[#FBEDEE] px-3 py-2 text-xs font-semibold text-[#9B2C2C] hover:bg-[#F4DDE0]"
          onClick={onClose}
          type="button"
        >
          Yoklamayı kapat
        </button>
      </div>

      {/* PIN kutusu + geri sayım */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="rounded-lg border border-[#EFDFBE] bg-white px-6 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A5F0F]">
            Yoklama PIN
          </p>
          <p className="mt-1 text-3xl font-bold tracking-[0.28em] text-[#14213D]">
            {session.pin}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[10px] text-[#667085]">Yenilemeye kalan</p>
          <p className={
            remaining < 60
              ? "text-xl font-bold text-[#9B2C2C]"
              : "text-xl font-bold text-[#14213D]"
          }>
            {mm}:{ss}
          </p>
          <button
            className="mt-1 rounded-md border border-[#DDE5F0] bg-white px-2.5 py-1 text-[11px] text-[#243B64] hover:bg-[#F6F9FE]"
            onClick={onRenew}
            type="button"
          >
            Yenile
          </button>
        </div>
      </div>

      {/* Katılım listesi */}
      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
            Katılım durumu
          </p>
          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-[#E9F5EF] px-2.5 py-1 font-medium text-[#106B4A]">
              {attended.length} katıldı
            </span>
            <span className="rounded-full bg-[#FBEDEE] px-2.5 py-1 font-medium text-[#9B2C2C]">
              {missing.length} girmedi
            </span>
          </div>
        </div>
        <div className="flex gap-1 rounded-lg bg-[#F6F9FE] p-1 mb-3">
          {([["all", "Tümü"], ["attended", "Katılanlar"], ["missing", "Girmeyenler"]] as const).map(
            ([val, label]) => (
              <button
                key={val}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${filter === val ? "bg-[#14213D] text-white" : "text-[#667085] hover:bg-white"}`}
                onClick={() => setFilter(val)}
                type="button"
              >
                {label}
              </button>
            )
          )}
        </div>
        <div className="space-y-2">
          {displayed.map((student) => (
            <div
              className="flex items-center justify-between rounded-lg bg-white border border-[#DDE5F0] px-3 py-2.5"
              key={student.id}
            >
              <div>
                <p className="text-sm font-medium text-[#14213D]">{student.name}</p>
                <p className="text-xs text-[#667085]">{student.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${student.attendanceStatus === "katıldı" ? "text-[#106B4A]" : "text-[#667085]"}`}>
                  {student.attendanceStatus === "katıldı"
                    ? `✓ ${student.attendanceTime ?? ""}`
                    : "—"}
                </span>
                <button
                  className="rounded-md border border-[#DDE5F0] bg-[#F6F9FE] px-2 py-1 text-[11px] text-[#243B64] hover:bg-[#E9EFF9]"
                  onClick={() => onToggleStudent(student.id)}
                  type="button"
                >
                  Değiştir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Görevlerim kartı */
function GorevlerimCard({ tasks }: { tasks: InstructorTask[] }) {
  const [tamamlananlar, setTamamlananlar] = useState<Record<string, { zaman: string; kapatan: string }>>({});
  const [localCompleted, setLocalCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTamamlananlar(getTamamlananGorevler());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const tamamla = (task: InstructorTask) => {
    goreviTamamla(`egitmen-${task.id}`, task.title);
    setTamamlananlar(getTamamlananGorevler());
    setLocalCompleted((prev) => new Set([...prev, task.id]));
  };

  const priorityColor: Record<string, string> = {
    Kritik: "bg-[#FBEDEE] text-[#9B2C2C] border-[#EFD3D6]",
    Orta: "bg-[#FDF4E3] text-[#8A5F0F] border-[#EFDFBE]",
    Düşük: "bg-[#E9EFF9] text-[#4A5568] border-[#DDE4EF]",
  };

  return (
    <Card>
      <CardHead title="Görevlerim" hint={`${tasks.filter(t => !localCompleted.has(t.id) && t.status !== "Tamamlandı").length} açık görev`} />
      <div className="divide-y divide-[#DDE5F0]">
        {tasks.map((task) => {
          const done = localCompleted.has(task.id) || task.status === "Tamamlandı" || `egitmen-${task.id}` in tamamlananlar;
          return (
            <div
              key={task.id}
              className={`flex flex-wrap items-start gap-3 p-4 ${done ? "opacity-60" : ""}`}
            >
              <div className="flex-1 min-w-[200px]">
                <p className={`font-semibold text-sm ${done ? "line-through text-[#667085]" : "text-[#14213D]"}`}>
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-[#667085]">
                  {task.course} · Termin: {task.dueDate}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`rounded-md border px-2 py-0.5 text-[11px] ${priorityColor[task.priority] ?? priorityColor["Düşük"]}`}>
                    {task.priority}
                  </span>
                  {/* Progress bar */}
                  <div className="h-1.5 flex-1 overflow-hidden rounded-sm bg-[#E9EFF9]">
                    <div
                      className="h-full rounded-sm bg-[#14213D]"
                      style={{ width: `${done ? 100 : task.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#667085]">%{done ? 100 : task.progress}</span>
                </div>
              </div>
              {done ? (
                <span className="text-[13px] text-[#106B4A] font-semibold">
                  ✓ Tamamlandı
                </span>
              ) : (
                <button
                  className="rounded-lg border border-[#C7E4D6] bg-[#E9F5EF] px-3 py-1.5 text-[13px] font-semibold text-[#106B4A] hover:bg-[#D4EFE2]"
                  onClick={() => tamamla(task)}
                  type="button"
                >
                  Tamamlandı
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function InstructorPanelPage() {
  const session = readSession();
  const instructorName = session?.user?.fullName ?? "Eğitmen";
  const [courses, setCourses] = useState(MOCK_INSTRUCTOR_COURSES);
  const [students, setStudents] = useState(MOCK_INSTRUCTOR_STUDENTS);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { sessions, startSession, renewPin, endSession } = useYoklamaStore();

  const toggleAttendance = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
    const isOpen = sessions.some((s) => s.courseId === courseId);
    if (isOpen) {
      endSession(courseId);
      setCourses((prev) =>
        prev.map((c) => c.id === courseId ? { ...c, attendanceStatus: "closed" as const } : c)
      );
    } else {
      startSession(courseId, course.name, course.group);
      setCourses((prev) =>
        prev.map((c) => c.id === courseId ? { ...c, attendanceStatus: "open" as const } : c)
      );
    }
  };

  const toggleStudentAttendance = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              attendanceStatus: s.attendanceStatus === "katıldı" ? "katılmadı" : "katıldı",
              attendanceTime:
                s.attendanceStatus === "katıldı"
                  ? undefined
                  : new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
            }
          : s
      )
    );
  };

  const totalStudents = new Set(students.map((s) => s.id)).size;
  const averageAttendance = Math.round(
    (students.filter((s) => s.attendanceStatus === "katıldı").length / totalStudents) * 100
  );
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const selectedStudents = students.filter((s) => s.courseId === selectedCourseId);

  return (
    <SessionGuard allow={["instructor"]}>
      <InstructorPanelShell instructorName={instructorName} logout={<LogoutButton />}>
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Başlık */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#8A5F0F]">
              Eğitmen çalışma alanı
            </p>
            <h1 className="mt-1 text-[22px] font-semibold text-[#14213D]">Ana sayfa</h1>
            <p className="mt-1.5 text-sm text-[#667085]">
              Dersleriniz, yoklamalarınız ve görevleriniz tek yerde.
            </p>
          </div>

          {/* İstatistikler */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Toplam ders sayısı" value={String(courses.length)} note="Güz Dönemi 2026" />
            <StatCard label="Toplam öğrenci sayısı" value={String(totalStudents)} note="Aktif kayıtlar" />
            <StatCard label="Ortalama katılım oranı" value={`%${averageAttendance}`} note="Mevcut dersleriniz" />
            <StatCard label="Aktif yoklama" value={String(sessions.length)} note="şu anda açık" />
          </div>

          {/* Görevlerim */}
          <GorevlerimCard tasks={MOCK_INSTRUCTOR_TASKS} />

          {/* Derslerim kartları */}
          <section id="derslerim">
            <CardHead title="Derslerim" hint={`${courses.length} ders`} />
            <div className="grid gap-3 pt-3 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => {
                const activeSession = sessions.find((s) => s.courseId === course.id);
                return (
                  <Card key={course.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-[#14213D]">{course.name}</h2>
                        <p className="mt-1 text-xs text-[#667085]">{course.group} · Güz 2026</p>
                      </div>
                      <Chip>{activeSession ? "Açık" : "Kapandı"}</Chip>
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <dt className="text-[#667085]">Hafta</dt>
                        <dd className="mt-1 font-medium text-[#3C4657]">{course.currentWeek} / {course.totalWeeks}</dd>
                      </div>
                      <div>
                        <dt className="text-[#667085]">Öğrenci</dt>
                        <dd className="mt-1 font-medium text-[#3C4657]">{course.activeStudents}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-[#667085]">Sonraki ders</dt>
                        <dd className="mt-1 font-medium text-[#3C4657]">{course.nextLessonDate} · {course.nextLessonTime}</dd>
                      </div>
                    </dl>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <PrimaryButton onClick={() => toggleAttendance(course.id)}>
                        {activeSession ? "Yoklamayı kapat" : "Yoklama aç"}
                      </PrimaryButton>
                      <button
                        className="rounded-lg border border-[#DDE5F0] px-3 py-2 text-xs text-[#243B64] hover:bg-[#F6F9FE]"
                        onClick={() => setSelectedCourseId(course.id)}
                        type="button"
                      >
                        Öğrenci listesini görüntüle
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Aktif yoklamalar */}
          {sessions.length > 0 ? (
            <section>
              <CardHead title="Aktif yoklamalar" hint={`${sessions.length} açık`} />
              <div className="mt-3 space-y-4">
                {sessions.map((session) => (
                  <ActiveSessionCard
                    key={session.courseId}
                    session={session}
                    students={students}
                    onRenew={() => renewPin(session.courseId)}
                    onClose={() => toggleAttendance(session.courseId)}
                    onToggleStudent={toggleStudentAttendance}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {/* Geçmiş yoklamalar */}
          <Card>
            <CardHead title="Son Yoklamalar" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-sm">
                <thead className="bg-[#F6F9FE]">
                  <tr>
                    {["Ders", "Grup", "Hafta", "Konu", "Tarih", "Açılış", "Kapanış", "Katılan"].map((h) => (
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#14213D]" key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PAST_ATTENDANCES.map((a) => (
                    <tr className="border-t border-[#DDE5F0]" key={a.id}>
                      <td className="px-4 py-3">{a.courseName}</td>
                      <td className="px-4 py-3">{a.group}</td>
                      <td className="px-4 py-3">{a.week}</td>
                      <td className="px-4 py-3">{a.subject}</td>
                      <td className="px-4 py-3">{a.date}</td>
                      <td className="px-4 py-3">{a.openedTime}</td>
                      <td className="px-4 py-3">{a.closedTime}</td>
                      <td className="px-4 py-3 font-semibold">{a.studentsAttended}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Bildirimler */}
          <Card>
            <CardHead title="Bildirimler" hint={`${MOCK_INSTRUCTOR_NOTIFICATIONS.length} bildirim`} />
            <div className="divide-y divide-[#DDE5F0]">
              {MOCK_INSTRUCTOR_NOTIFICATIONS.map((n) => (
                <div key={n.id} className="p-4">
                  <p className="text-sm font-semibold text-[#14213D]">{n.title}</p>
                  <p className="mt-1 text-sm text-[#3C4657]">{n.message}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Öğrenci listesi modal */}
          {selectedCourse ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-[#DDE5F0] p-5">
                  <div>
                    <h2 className="font-semibold text-[#14213D]">Öğrenci listesi</h2>
                    <p className="mt-1 text-sm text-[#667085]">{selectedCourse.name} · {selectedCourse.group}</p>
                  </div>
                  <button aria-label="Kapat" className="text-xl text-[#667085]" onClick={() => setSelectedCourseId(null)}>×</button>
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
                        <tr className="border-b border-[#DDE5F0]" key={student.id}>
                          <td className="py-3">{student.name}</td>
                          <td className="py-3 text-[#667085]">{student.email}</td>
                          <td className="py-3">
                            <Chip>{student.attendanceStatus === "katıldı" ? "Katıldı" : "Katılmadı"}</Chip>
                          </td>
                          <td className="py-3 text-[#667085]">{student.attendanceTime ?? "-"}</td>
                          <td className="py-3">
                            <button
                              className="rounded-lg border border-[#DDE5F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#243B64] hover:bg-[#F6F9FE]"
                              onClick={() => toggleStudentAttendance(student.id)}
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
