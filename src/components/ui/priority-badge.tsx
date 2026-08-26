type Priority = "Düşük" | "Orta" | "Kritik";

type PriorityBadgeProps = {
  priority: Priority;
};

const priorityStyles: Record<Priority, string> = {
  Düşük: "border-slate-200 bg-slate-100 text-slate-700",
  Orta: "border-amber-200 bg-[#FFF6DF] text-[#9A6700]",
  Kritik: "border-rose-200 bg-[#FFF0F1] text-[#C2414B]",
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
}