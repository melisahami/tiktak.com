type Status =
  | "Bekliyor"
  | "Devam ediyor"
  | "Eksik var"
  | "Hazır"
  | "Tamamlandı"
  | "Gecikti"
  | "Başlatılmadı"
  | "Planlandı"
  | "Açık"
  | "Teslim alındı";

type StatusBadgeProps = {
  status: Status;
};

const statusStyles: Record<Status, string> = {
  Bekliyor: "border-slate-200 bg-slate-100 text-slate-700",
  "Devam ediyor": "border-blue-200 bg-blue-50 text-blue-700",
  "Eksik var": "border-amber-200 bg-[#FFF6DF] text-[#9A6700]",
  Hazır: "border-emerald-200 bg-[#EAF7F0] text-[#17845B]",
  Tamamlandı: "border-emerald-200 bg-[#EAF7F0] text-[#17845B]",
  Gecikti: "border-rose-200 bg-[#FFF0F1] text-[#C2414B]",
  Başlatılmadı: "border-amber-200 bg-[#FFF6DF] text-[#9A6700]",
  Planlandı: "border-slate-200 bg-slate-100 text-slate-700",
  Açık: "border-blue-200 bg-blue-50 text-blue-700",
  "Teslim alındı": "border-emerald-200 bg-[#EAF7F0] text-[#17845B]",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}