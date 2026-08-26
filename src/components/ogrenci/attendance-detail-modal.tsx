"use client";

import type { Course, OpenAttendance } from "@/data/demo/ogrenci";
import { useState } from "react";

interface AttendanceDetailModalProps {
  isOpen: boolean;
  course?: Course;
  openAttendance?: OpenAttendance;
  onClose: () => void;
  onSubmit?: (pin: string) => Promise<boolean>;
}

type ModalMode = "details" | "pin-entry" | "success";

export function AttendanceDetailModal({
  isOpen,
  course,
  openAttendance,
  onClose,
  onSubmit,
}: AttendanceDetailModalProps) {
  const [mode, setMode] = useState<ModalMode>("details");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setMode("details");
    setPin("");
    setError("");
    onClose();
  };

  const handleStartPinEntry = () => {
    setError("");
    setPin("");
    setMode("pin-entry");
  };

  const handleSubmitPin = async () => {
    if (pin.length !== 4) {
      setError("PIN 4 hane olmalıdır.");
      return;
    }

    if (!openAttendance || !onSubmit) {
      setError("Bir hata oluştu. Lütfen sayfayı yenileyin.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const success = await onSubmit(pin);
      if (success) {
        setMode("success");
      } else {
        setError("PIN hatalı. Lütfen tekrar deneyin.");
        setPin("");
      }
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setPin("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
    if (error) setError("");
  };

  const displayCourse = openAttendance || course;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Details Mode */}
        {mode === "details" && (
          <>
            <div className="border-b border-[#E4EAF2] px-6 py-4">
              <h2 className="text-lg font-semibold text-[#172033]">
                Ders Detayları
              </h2>
            </div>

            <div className="px-6 py-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-[#667085]">Ders Adı</p>
                  <p className="mt-1 text-sm font-semibold text-[#172033]">
                    {openAttendance?.courseName || course?.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#667085]">Grup</p>
                  <p className="mt-1 text-sm font-semibold text-[#172033]">
                    {displayCourse?.group}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#667085]">Konusu</p>
                  <p className="mt-1 text-sm text-[#172033]">
                    {openAttendance?.subject || course?.subject}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#667085]">
                    Tarih ve Saat
                  </p>
                  <p className="mt-1 text-sm text-[#172033]">
                    {openAttendance?.date || course?.nextLessonDate}{" "}
                    {openAttendance?.time || course?.nextLessonTime}
                  </p>
                </div>

                {openAttendance && (
                  <div>
                    <p className="text-xs font-medium text-[#667085]">Hafta</p>
                    <p className="mt-1 text-sm text-[#172033]">
                      {openAttendance.week}
                    </p>
                  </div>
                )}

                {course && !openAttendance && (
                  <div>
                    <p className="text-xs font-medium text-[#667085]">
                      İlerleme
                    </p>
                    <p className="mt-1 text-sm text-[#172033]">
                      Hafta {course.currentWeek} / {course.totalWeeks}
                    </p>
                  </div>
                )}

                <div className="rounded-lg bg-[#F5F7FB] p-3">
                  <p className="text-xs text-[#667085]">
                    <span className="font-medium">Eğitmen:</span>{" "}
                    {course?.instructorName || "Bilgi bulunamadı"}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  className="flex-1 rounded-lg border border-[#E4EAF2] px-4 py-2.5 text-sm font-semibold text-[#172033] transition hover:bg-[#F5F7FB]"
                  onClick={handleClose}
                >
                  Kapat
                </button>
                {openAttendance && (
                  <button
                    className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    onClick={handleStartPinEntry}
                  >
                    Yoklamaya Katıl
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* PIN Entry Mode */}
        {mode === "pin-entry" && (
          <>
            <div className="border-b border-[#E4EAF2] px-6 py-4">
              <h2 className="text-lg font-semibold text-[#172033]">
                PIN ile Onay
              </h2>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm text-[#667085]">
                Katılımı onaylamak için eğitmen tarafından verilen 4 haneli PIN
                kodunu girin.
              </p>

              <div className="mt-6">
                <label
                  className="block text-sm font-medium text-[#344054]"
                  htmlFor="pin-input"
                >
                  PIN Kodu
                </label>
                <input
                  autoFocus
                  className="mt-2 h-12 w-full rounded-lg border border-[#E4EAF2] bg-white px-4 text-center text-2xl font-bold tracking-widest text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#243B64] focus:ring-2 focus:ring-[#243B64]/15"
                  disabled={isSubmitting}
                  id="pin-input"
                  inputMode="numeric"
                  maxLength={4}
                  onChange={handlePinChange}
                  placeholder="••••"
                  type="password"
                  value={pin}
                />
              </div>

              {error && (
                <div className="mt-4 rounded-lg border border-[#F3C7CB] bg-[#FFF0F1] px-4 py-3 text-sm text-[#93242E]">
                  {error}
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <button
                  className="flex-1 rounded-lg border border-[#E4EAF2] px-4 py-2.5 text-sm font-semibold text-[#172033] transition hover:bg-[#F5F7FB] disabled:opacity-50"
                  disabled={isSubmitting}
                  onClick={() => setMode("details")}
                >
                  Geri Dön
                </button>
                <button
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                  disabled={isSubmitting || pin.length !== 4}
                  onClick={handleSubmitPin}
                >
                  {isSubmitting ? "Doğrulanıyor..." : "Onayla"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Success Mode */}
        {mode === "success" && (
          <>
            <div className="border-b border-[#E4EAF2] px-6 py-4">
              <h2 className="text-lg font-semibold text-emerald-700">
                ✓ Başarılı
              </h2>
            </div>

            <div className="px-6 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>

              <h3 className="text-lg font-semibold text-[#172033]">
                Katılımınız Kaydedildi
              </h3>

              <div className="mt-6 space-y-3 rounded-lg bg-[#F5F7FB] p-4">
                <div>
                  <p className="text-xs text-[#667085]">
                    {openAttendance?.courseName}
                  </p>
                  <p className="text-sm font-semibold text-[#172033]">
                    {openAttendance?.subject}
                  </p>
                </div>

                <div className="border-t border-[#E4EAF2] pt-3">
                  <p className="text-xs text-[#667085]">Hafta</p>
                  <p className="text-sm font-semibold text-[#172033]">
                    {openAttendance?.week}
                  </p>
                </div>

                <div className="border-t border-[#E4EAF2] pt-3">
                  <p className="text-xs text-[#667085]">Katılım Saati</p>
                  <p className="text-sm font-semibold text-emerald-700">
                    {new Date().toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <button
                className="mt-8 w-full rounded-lg bg-[#14213D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243B64]"
                onClick={handleClose}
              >
                Kapat
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
