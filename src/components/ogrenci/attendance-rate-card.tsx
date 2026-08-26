interface AttendanceRateCardProps {
  rate: number;
}

export function AttendanceRateCard({ rate }: AttendanceRateCardProps) {
  const getColorClass = (rate: number) => {
    if (rate >= 85) return "bg-emerald-100 text-emerald-700";
    if (rate >= 70) return "bg-blue-100 text-blue-700";
    if (rate >= 50) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  const getStatusText = (rate: number) => {
    if (rate >= 85) return "Mükemmel";
    if (rate >= 70) return "İyi";
    if (rate >= 50) return "Orta";
    return "Düşük";
  };

  return (
    <article className="rounded-xl border border-[#E4EAF2] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#667085]">
            Dönemsel Katılım Oranı
          </p>
          <p className="mt-3 text-4xl font-bold text-[#14213D]">%{rate}</p>
          <p className={`mt-2 inline-block rounded-lg px-3 py-1 text-xs font-semibold ${getColorClass(rate)}`}>
            {getStatusText(rate)}
          </p>
        </div>

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#14213D] to-[#243B64]">
          <div className="text-center">
            <span className="text-2xl font-bold text-white">{rate}%</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-[#F5F7FB] p-4">
        <p className="text-xs text-[#667085]">
          <span className="font-medium">Bilgi:</span> Katılım oranı derslere
          katılım yüzdesini gösterir. Yüksek katılım başarıya katkı sağlar.
        </p>
      </div>
    </article>
  );
}
