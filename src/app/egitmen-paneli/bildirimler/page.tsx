"use client";

import { useState } from "react";

import { LogoutButton } from "@/components/auth/logout-button";
import { SessionGuard } from "@/components/auth/session-guard";
import { InstructorPanelShell } from "@/components/egitmen/panel-shell";
import { Card, CardHead } from "@/components/egitmen/ui";
import { MOCK_INSTRUCTOR_NOTIFICATIONS } from "@/data/demo/ogrenci";
import { readSession } from "@/lib/auth/session";

export default function InstructorNotificationsPage() {
  const session = readSession();
  const instructorName = session?.user?.fullName ?? "Eğitmen";
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set(["in3"]));
  const unreadCount = MOCK_INSTRUCTOR_NOTIFICATIONS.length - readIds.size;

  return (
    <SessionGuard allow={["instructor"]}>
      <InstructorPanelShell
        instructorName={instructorName}
        logout={<LogoutButton />}
      >
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <h1 className="text-[22px] font-semibold text-[#14213D]">
              Bildirimler
            </h1>
            <p className="mt-1.5 text-sm text-[#667085]">
              Ders, yoklama ve öğrenci hareketleri.
            </p>
          </div>
          <Card>
            <CardHead
              title="Eğitmen bildirimleri"
              hint={`${unreadCount} okunmadı · ${MOCK_INSTRUCTOR_NOTIFICATIONS.length} toplam`}
            />
            <div className="flex items-center justify-between border-b border-[#DDE5F0] px-5 py-3">
              <p className="text-xs text-[#667085]">
                Okunmamış bildirimler vurgulanır.
              </p>
              <button
                className="rounded-lg border border-[#DDE5F0] px-3 py-1.5 text-xs font-semibold text-[#243B64] transition hover:bg-[#F6F9FE]"
                onClick={() =>
                  setReadIds(
                    new Set(
                      MOCK_INSTRUCTOR_NOTIFICATIONS.map(
                        (notification) => notification.id,
                      ),
                    ),
                  )
                }
                type="button"
              >
                Tümünü okundu işaretle
              </button>
            </div>
            <div className="divide-y divide-[#DDE5F0]">
              {MOCK_INSTRUCTOR_NOTIFICATIONS.map((notification) => (
                <article
                  className={`border-l-4 p-5 transition ${readIds.has(notification.id) ? "border-l-transparent bg-white" : "border-l-[#F59E4A] bg-[#FFF9ED]"}`}
                  key={notification.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-[#14213D]">
                          {notification.title}
                        </h2>
                        {!readIds.has(notification.id) ? (
                          <span className="rounded-full bg-[#FDF4E3] px-2 py-0.5 text-[10px] font-semibold text-[#8A5F0F]">
                            Yeni
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {!readIds.has(notification.id) ? (
                      <button
                        className="rounded-lg border border-[#DDE5F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#243B64] hover:bg-[#F6F9FE]"
                        onClick={() =>
                          setReadIds((current) =>
                            new Set(current).add(notification.id),
                          )
                        }
                        type="button"
                      >
                        Okundu işaretle
                      </button>
                    ) : (
                      <span className="text-xs text-[#106B4A]">Okundu</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[#3C4657]">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-[#8B95A6]">
                    {new Date(notification.timestamp).toLocaleString("tr-TR")}
                  </p>
                </article>
              ))}
            </div>
          </Card>
        </div>
      </InstructorPanelShell>
    </SessionGuard>
  );
}
