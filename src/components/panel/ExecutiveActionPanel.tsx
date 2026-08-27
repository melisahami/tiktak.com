"use client";

import { useEffect, useState } from "react";
import {
  ATOLYELER,
  GOREVLER,
  ILLER,
  RISKLER,
  type Bulgu,
} from "@/lib/demo/operasyon";

const COORDINATOR_ALERT_KEY = "tiktak.coordinator.material-task-alert.v3";

export function ExecutiveActionPanel() {
  const [message, setMessage] = useState<string | null>(null);
  const [assignedKeys, setAssignedKeys] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(COORDINATOR_ALERT_KEY);
      if (!stored) return;

      try {
        const tasks = JSON.parse(stored) as Array<{ riskKey: string }>;
        const validKeys = RISKLER.map((r) => r.hedef);
        setAssignedKeys(
          tasks
            .map((task) => task.riskKey)
            .filter((key) => validKeys.includes(key)),
        );
      } catch {
        window.localStorage.removeItem(COORDINATOR_ALERT_KEY);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const assignVisitTask = (risk: Bulgu) => {
    const relatedTask = GOREVLER.find(
      (task) => risk.hedef === `gorev:${task.id}`,
    );
    const targetProvince =
      ILLER.find((province) => province.ad === relatedTask?.il) ??
      [...ILLER].sort((left, right) => {
        const readyLeft = Number(left.hazirAtolye.split("/")[0]);
        const readyRight = Number(right.hazirAtolye.split("/")[0]);
        return readyLeft - readyRight;
      })[0];
    const targetWorkshop =
      ATOLYELER.find((workshop) => workshop.ad === relatedTask?.atolye) ??
      ATOLYELER.find((workshop) => workshop.il === targetProvince.ad);
    const task = {
      id: `visit-${Date.now()}`,
      riskKey: risk.hedef,
      category: "Görevler",
      type: "Ziyaret görevi atandı",
      title: `${targetWorkshop?.ad} atölyesine ziyaret et görevi atandı.`,
      text: `${targetProvince.ad} İl Sorumlusuna, hazır atölye sayısı en düşük olan ${targetWorkshop?.ad} için saha ziyareti görevi oluşturuldu.`,
      related: `${targetProvince.ad} / ${targetWorkshop?.ad}`,
      time: new Date().toLocaleString("tr-TR"),
    };

    const stored = window.localStorage.getItem(COORDINATOR_ALERT_KEY);
    const previousTasks = stored
      ? (JSON.parse(stored) as Array<typeof task>)
      : [];
    const nextTasks = [
      ...previousTasks.filter(
        (previousTask) => previousTask.riskKey !== risk.hedef,
      ),
      task,
    ];
    window.localStorage.setItem(
      COORDINATOR_ALERT_KEY,
      JSON.stringify(nextTasks),
    );
    setAssignedKeys((current) => [
      ...current.filter((key) => key !== risk.hedef),
      risk.hedef,
    ]);
    setMessage(
      `${targetProvince.ad} İl Sorumlusuna ${targetWorkshop?.ad} atölyesine ziyaret görevi atandı. Koordinatöre bildirim gönderildi.`,
    );
    // State is already updated in-place — no reload needed.
  };

  const toneCls = {
    err: "bg-[#FBEDEE] border-[#EFD3D6] text-[#97323B]",
    warn: "bg-[#FDF4E3] border-[#EFDFBE] text-[#8A5F0F]",
    info: "bg-[#F6F9FE] border-[#DDE5F0] text-[#3C4657]",
  };

  return (
    <div className="grid gap-2.5">
      {RISKLER.map((risk) =>
        (() => {
          const isAssigned = assignedKeys.includes(risk.hedef);

          return (
            <button
              className={`rounded-lg border px-3.5 py-3 text-left transition hover:brightness-[.98] ${toneCls[risk.tone]}`}
              key={risk.metin}
              onClick={() => assignVisitTask(risk)}
              type="button"
            >
              <span className="block text-sm">{risk.metin}</span>
              <span className="mt-2 block text-xs font-semibold underline">
                {isAssigned
                  ? "Ziyaret görevi atandı · Koordinatöre bildirildi"
                  : "Aksiyon gerekli · Ziyaret görevi ata"}
              </span>
            </button>
          );
        })(),
      )}
      {assignedKeys.length > 0 ? (
        <div className="rounded-lg border border-[#C7E4D6] bg-[#E9F5EF] px-3.5 py-3 text-sm font-semibold text-[#106B4A]">
          Ziyaret görevi atandı. Yönetici paneli güncellendi ve koordinatöre
          bildirim gönderildi.
        </div>
      ) : null}
      {message ? (
        <div className="rounded-lg border border-[#C7E4D6] bg-[#E9F5EF] px-3.5 py-3 text-sm text-[#106B4A]">
          {message}
        </div>
      ) : null}
    </div>
  );
}
