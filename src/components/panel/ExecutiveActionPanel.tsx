"use client";

import { useEffect, useState } from "react";
import { ATOLYELER, ILLER, RISKLER } from "@/lib/demo/operasyon";

const COORDINATOR_ALERT_KEY = "tiktak.coordinator.material-task-alert.v2";

export function ExecutiveActionPanel() {
  const [message, setMessage] = useState<string | null>(null);
  const [assigned, setAssigned] = useState(false);
  const targetProvince = [...ILLER].sort((left, right) => {
    const readyLeft = Number(left.hazirAtolye.split("/")[0]);
    const readyRight = Number(right.hazirAtolye.split("/")[0]);
    return readyLeft - readyRight;
  })[0];
  const targetWorkshop = ATOLYELER.find(
    (workshop) => workshop.il === targetProvince.ad,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAssigned(Boolean(window.localStorage.getItem(COORDINATOR_ALERT_KEY)));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const assignVisitTask = () => {
    const task = {
      id: `visit-${Date.now()}`,
      category: "Görevler",
      type: "Ziyaret görevi atandı",
      title: `${targetWorkshop?.ad} atölyesine ziyaret et görevi atandı.`,
      text: `${targetProvince.ad} İl Sorumlusuna, hazır atölye sayısı en düşük olan ${targetWorkshop?.ad} için saha ziyareti görevi oluşturuldu.`,
      related: `${targetProvince.ad} / ${targetWorkshop?.ad}`,
      time: new Date().toLocaleString("tr-TR"),
    };

    window.localStorage.setItem(COORDINATOR_ALERT_KEY, JSON.stringify(task));
    setAssigned(true);
    setMessage(
      `${targetProvince.ad} İl Sorumlusuna ${targetWorkshop?.ad} atölyesine ziyaret görevi atandı. Koordinatöre bildirim gönderildi.`,
    );
    window.setTimeout(() => window.location.reload(), 800);
  };

  const toneCls = {
    err: "bg-[#FBEDEE] border-[#EFD3D6] text-[#97323B]",
    warn: "bg-[#FDF4E3] border-[#EFDFBE] text-[#8A5F0F]",
    info: "bg-[#F6F9FE] border-[#DDE5F0] text-[#3C4657]",
  };

  return (
    <div className="grid gap-2.5">
      {RISKLER.map((risk) => (
        <button
          className={`rounded-lg border px-3.5 py-3 text-left transition hover:brightness-[.98] ${toneCls[risk.tone]}`}
          key={risk.metin}
          onClick={assignVisitTask}
          type="button"
        >
          <span className="block text-sm">{risk.metin}</span>
          <span className="mt-2 block text-xs font-semibold underline">
            {assigned
              ? "Ziyaret görevi atandı · Koordinatöre bildirildi"
              : "Aksiyon gerekli · Ziyaret görevi ata"}
          </span>
        </button>
      ))}
      {assigned ? (
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
