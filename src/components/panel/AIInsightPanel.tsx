"use client";

import { useState } from "react";

const EXAMPLE_QUERIES = [
  "Bu hafta gecikme riski en yüksek 3 ili listele",
  "Malzeme eksikliği ile yoklama aksamasını karşılaştır",
  "Eğitim başlangıcından önce hangi aksiyonlar alınmalı?",
];

const INSIGHTS = [
  {
    match: ["malzeme", "yoklama"],
    title: "Malzeme eksikliği yoklama hazırlığını etkiliyor",
    summary:
      "Üsküdar Atölyesi'ndeki 3 eksik kalem, Grup A yoklamasının başlatılmama uyarısıyla aynı zaman aralığında görünüyor.",
    evidence: ["İstanbul / Üsküdar", "3 eksik kalem", "Yoklama başlatılmadı"],
    action: "Malzeme taleplerini bugün onaylayın ve eğitmeni bilgilendirin.",
    score: 84,
  },
  {
    match: ["aksiyon", "başlangıç"],
    title: "Eğitim başlangıcı için iki kritik aksiyon bulundu",
    summary:
      "Bursa'daki geciken malzeme görevi ve İstanbul'daki eksik hazırlık birlikte ele alınırsa en yüksek etki burada oluşuyor.",
    evidence: [
      "Bursa · 4 gün gecikme",
      "İstanbul · %70 ilerleme",
      "10 gün kaldı",
    ],
    action:
      "Önce Bursa görevini eskale edin, ardından Üsküdar transferini teyit edin.",
    score: 78,
  },
  {
    match: ["gecikme", "risk", "il"],
    title: "Gecikme riski en yüksek iller",
    summary:
      "Mevcut görev durumu, hazırlık oranı ve termin yakınlığı birlikte değerlendirildiğinde ilk müdahale sırası belirlendi.",
    evidence: [
      "1. Bursa · %44 hazır",
      "2. İstanbul · %61 tamamlandı",
      "3. Kocaeli · %57 tamamlandı",
    ],
    action:
      "Bursa için bölgesel destek atayın; İstanbul'da malzeme transferini izleyin.",
    score: 84,
  },
];

const DEFAULT_INSIGHT = INSIGHTS[2];

export function AIInsightPanel() {
  const [query, setQuery] = useState(EXAMPLE_QUERIES[0]);
  const [insight, setInsight] = useState(DEFAULT_INSIGHT);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyze = () => {
    setIsAnalyzing(true);
    window.setTimeout(() => {
      const normalizedQuery = query.toLocaleLowerCase("tr-TR");
      const nextInsight =
        INSIGHTS.find((item) =>
          item.match.some((term) => normalizedQuery.includes(term)),
        ) ?? DEFAULT_INSIGHT;
      setInsight(nextInsight);
      setIsAnalyzing(false);
    }, 450);
  };

  return (
    <section className="mb-[18px] overflow-hidden rounded-xl border border-[#C8D8F0] bg-[#F5F8FE]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#DDE5F0] px-[18px] py-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="m-0 text-base font-semibold text-[#14213D]">
              AI karar destek
            </h2>
            <span className="rounded-full border border-[#BFD0EA] bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#356AE6]">
              Demo verisi
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[#667085]">
            Operasyon verisini doğal dille sorgulayın; risk ve öneriyi birlikte
            görün.
          </p>
        </div>
        <span className="text-xs font-medium text-[#356AE6]">
          Text-to-insight
        </span>
      </div>

      <div className="grid gap-4 p-[18px] lg:grid-cols-[1.1fr_1fr]">
        <div>
          <label
            className="text-xs font-semibold text-[#3C4657]"
            htmlFor="ai-query"
          >
            Ne öğrenmek istiyorsunuz?
          </label>
          <textarea
            className="mt-2 min-h-[94px] w-full resize-y rounded-lg border border-[#C8D8F0] bg-white px-3 py-2.5 text-sm text-[#14213D] outline-none transition focus:border-[#356AE6] focus:ring-2 focus:ring-[#356AE6]/15"
            id="ai-query"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {EXAMPLE_QUERIES.map((example) => (
              <button
                className="rounded-md border border-[#C8D8F0] bg-white px-2 py-1 text-left text-xs text-[#3C4657] transition hover:border-[#356AE6] hover:text-[#356AE6]"
                key={example}
                onClick={() => setQuery(example)}
                type="button"
              >
                {example}
              </button>
            ))}
          </div>
          <button
            className="mt-3 rounded-lg bg-[#14213D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243B64] disabled:cursor-wait disabled:opacity-60"
            disabled={!query.trim() || isAnalyzing}
            onClick={analyze}
            type="button"
          >
            {isAnalyzing ? "Analiz ediliyor..." : "İçgörü üret"}
          </button>
        </div>

        <div className="rounded-lg border border-[#DDE5F0] bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#356AE6]">
                Önerilen içgörü
              </p>
              <h3 className="mt-1 text-sm font-semibold text-[#14213D]">
                {insight.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xl font-semibold text-[#B65A12]">
                %{insight.score}
              </span>
              <span className="block text-[10px] text-[#667085]">
                risk skoru
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#3C4657]">
            {insight.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {insight.evidence.map((item) => (
              <span
                className="rounded-md bg-[#F6F9FE] px-2 py-1 text-xs text-[#3C4657]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-3 border-t border-[#E9EFF9] pt-3 text-xs leading-5 text-[#667085]">
            <span className="font-semibold text-[#14213D]">
              Önerilen aksiyon:{" "}
            </span>
            {insight.action}
          </div>
        </div>
      </div>
    </section>
  );
}
