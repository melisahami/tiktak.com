"use client";

import { SessionGuard } from "@/components/auth/session-guard";
import { AttendanceDetailModal } from "@/components/ogrenci/attendance-detail-modal";
import { AttendanceHistoryTable } from "@/components/ogrenci/attendance-history-table";
import { AttendanceRateCard } from "@/components/ogrenci/attendance-rate-card";
import { CourseCard } from "@/components/ogrenci/course-card";
import { OpenAttendanceArea } from "@/components/ogrenci/open-attendance-area";
import { PersonalNotifications } from "@/components/ogrenci/personal-notifications";
import { RecentAttendances } from "@/components/ogrenci/recent-attendances";
import { StudentHeader } from "@/components/ogrenci/student-header";
import {
  MOCK_ATTENDANCES,
  MOCK_COURSES,
  MOCK_NOTIFICATIONS,
  MOCK_OPEN_ATTENDANCES,
  MOCK_OVERALL_ATTENDANCE_RATE,
  type Course,
  type OpenAttendance,
} from "@/data/demo/ogrenci";
import { readSession } from "@/lib/auth/session";
import { getPin, getAllPins } from "@/lib/demo/pin-store";
import { useState } from "react";

export default function StudentHomePage() {
  const session = readSession();
  const studentName = session?.user?.fullName ?? "Öğrenci";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
  const [selectedOpenAttendance, setSelectedOpenAttendance] = useState<
    OpenAttendance | undefined
  >();
  const [activeTab, setActiveTab] = useState<"overview" | "history">(
    "overview",
  );
  const [openAttendances, setOpenAttendances] = useState(MOCK_OPEN_ATTENDANCES);

  const handleViewCourseDetails = (courseId: string) => {
    const course = MOCK_COURSES.find((c) => c.id === courseId);
    setSelectedCourse(course);
    setSelectedOpenAttendance(undefined);
    setIsModalOpen(true);
  };

  const handleJoinOpenAttendance = (attendanceId: string) => {
    const attendance = MOCK_OPEN_ATTENDANCES.find((a) => a.id === attendanceId);
    const course = MOCK_COURSES.find((c) => c.id === attendance?.courseId);
    setSelectedOpenAttendance(attendance);
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleJoinCourseAttendance = (courseId: string) => {
    const course = MOCK_COURSES.find((c) => c.id === courseId);
    const openAttendance = MOCK_OPEN_ATTENDANCES.find(
      (a) => a.courseId === courseId,
    );
    setSelectedCourse(course);
    setSelectedOpenAttendance(openAttendance);
    setIsModalOpen(true);
  };

  const handleSubmitAttendancePin = async (pin: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Önce eğitmenin localStorage'a yazdığı gerçek zamanlı PIN'i kontrol et
    if (selectedOpenAttendance?.courseId) {
      const livePin = getPin(selectedOpenAttendance.courseId);
      if (livePin && livePin.pin === pin) {
        const currentTime = new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        setOpenAttendances((prev) =>
          prev.map((a) =>
            a.id === selectedOpenAttendance.id
              ? { ...a, isSubmitted: true, submittedAt: currentTime }
              : a,
          ),
        );
        return true;
      }
    }

    // Fallback: mock veri PIN'i kontrol et
    if (selectedOpenAttendance?.pin === pin) {
      const currentTime = new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setOpenAttendances((prev) =>
        prev.map((a) =>
          a.id === selectedOpenAttendance.id
            ? {
                ...a,
                isSubmitted: true,
                submittedAt: currentTime,
              }
            : a,
        ),
      );

      return true;
    }

    return false;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(undefined);
    setSelectedOpenAttendance(undefined);
  };

  return (
    <SessionGuard allow={["student"]}>
      <div className="flex min-h-screen flex-col bg-[#F5F7FB]">
        <StudentHeader studentName={studentName} />

        <div className="flex flex-1">
          <main className="flex-1 px-6 py-8 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
              {/* Hero Section */}
              <section className="rounded-2xl bg-gradient-to-r from-[#14213D] to-[#243B64] px-6 py-8 text-white md:px-8">
                <p className="text-sm font-medium text-[#F4A261]">
                  Öğrenci Paneli
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  Hoşgeldiniz, {studentName}!
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                  Derslerinizi yönetin, yoklamalara katılın ve gelişiminizi
                  takip edin.
                </p>
              </section>

              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-[#E4EAF2]">
                <button
                  className={`px-4 py-3 text-sm font-semibold transition ${
                    activeTab === "overview"
                      ? "border-b-2 border-[#F4A261] text-[#14213D]"
                      : "text-[#667085] hover:text-[#172033]"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Genel Bakış
                </button>
                <button
                  className={`px-4 py-3 text-sm font-semibold transition ${
                    activeTab === "history"
                      ? "border-b-2 border-[#F4A261] text-[#14213D]"
                      : "text-[#667085] hover:text-[#172033]"
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  Yoklama Geçmişi
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Notifications Section */}
                  <section>
                    <h2 className="mb-4 text-lg font-semibold text-[#172033]">
                      📢 Kişisel Bildirimler
                    </h2>
                    <PersonalNotifications notifications={MOCK_NOTIFICATIONS} />
                  </section>

                  {/* Open Attendances Section */}
                  <section>
                    <h2 className="mb-4 text-lg font-semibold text-[#172033]">
                      ✓ Açık Yoklamalar
                    </h2>
                    <OpenAttendanceArea
                      attendances={openAttendances}
                      onJoin={handleJoinOpenAttendance}
                    />
                  </section>

                  {/* Attendance Rate and Recent Attendances */}
                  <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <h2 className="mb-4 text-lg font-semibold text-[#172033]">
                        📊 Katılım Oranı
                      </h2>
                      <AttendanceRateCard rate={MOCK_OVERALL_ATTENDANCE_RATE} />
                    </div>

                    <div className="lg:col-span-2">
                      <h2 className="mb-4 text-lg font-semibold text-[#172033]">
                        📋 Son Katılım Durumları
                      </h2>
                      <RecentAttendances attendances={MOCK_ATTENDANCES} />
                    </div>
                  </div>

                  {/* Courses Section */}
                  <section>
                    <h2 className="mb-4 text-lg font-semibold text-[#172033]">
                      📚 Derslerim
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {MOCK_COURSES.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onJoinAttendance={handleJoinCourseAttendance}
                          onViewDetails={handleViewCourseDetails}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* History Tab */}
              {activeTab === "history" && (
                <section>
                  <h2 className="mb-4 text-lg font-semibold text-[#172033]">
                    📅 Tüm Yoklama Geçmişi
                  </h2>
                  <AttendanceHistoryTable attendances={MOCK_ATTENDANCES} />
                </section>
              )}

              {/* Footer */}
              <footer className="border-t border-[#E4EAF2] pt-8 text-center text-xs text-[#667085]">
                <p>
                  © 2026 TikTakTürkiye. Tüm hakları saklıdır.{" "}
                  <a className="underline hover:text-[#172033]" href="#">
                    Yardım & Destek
                  </a>
                </p>
              </footer>
            </div>
          </main>
        </div>

        {/* Attendance Detail Modal */}
        <AttendanceDetailModal
          course={selectedCourse}
          isOpen={isModalOpen}
          openAttendance={selectedOpenAttendance}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAttendancePin}
        />
      </div>
    </SessionGuard>
  );
}
