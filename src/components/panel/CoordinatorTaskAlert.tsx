"use client";

import { useEffect, useState } from "react";

const COORDINATOR_ALERT_KEY = "tiktak.coordinator.material-task-alert.v3";

type TaskAlert = {
  id: string;
  riskKey: string;
  type: string;
  title: string;
  text: string;
  related: string;
  time: string;
};

export function CoordinatorTaskAlert() {
  const [alerts, setAlerts] = useState<TaskAlert[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(COORDINATOR_ALERT_KEY);
      if (!stored) return;

      try {
        const parsed = JSON.parse(stored) as TaskAlert | TaskAlert[];
        setAlerts(Array.isArray(parsed) ? parsed : [parsed]);
      } catch {
        window.localStorage.removeItem(COORDINATOR_ALERT_KEY);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="mb-4 grid gap-2.5">
      {alerts.map((alert) => (
        <div
          className="rounded-lg border border-[#C7E4D6] bg-[#E9F5EF] px-4 py-3 text-sm text-[#106B4A]"
          key={alert.id}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-[#B4D9C4] bg-white px-2 py-1 text-xs font-semibold">
              {alert.type}
            </span>
            <span className="text-xs text-[#667085]">{alert.time}</span>
          </div>
          <p className="mt-2 font-semibold">{alert.title}</p>
          <p className="mt-1">{alert.text}</p>
          <p className="mt-1 text-xs">İlgili alan: {alert.related}</p>
        </div>
      ))}
    </div>
  );
}
