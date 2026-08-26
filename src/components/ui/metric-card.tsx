type MetricTone = "navy" | "amber" | "success" | "danger";

type MetricCardProps = {
  label: string;
  value: string;
  description?: string;
  tone?: MetricTone;
};

const toneStyles: Record<MetricTone, string> = {
  navy: "border-[#D9E1EE] bg-white",
  amber: "border-[#F5D2A8] bg-[#FFF8F0]",
  success: "border-emerald-200 bg-[#F3FBF6]",
  danger: "border-rose-200 bg-[#FFF6F6]",
};

const valueStyles: Record<MetricTone, string> = {
  navy: "text-[#14213D]",
  amber: "text-[#B65A12]",
  success: "text-[#17845B]",
  danger: "text-[#C2414B]",
};

export function MetricCard({
  label,
  value,
  description,
  tone = "navy",
}: MetricCardProps) {
  return (
    <article
      className={`rounded-xl border p-5 shadow-sm ${toneStyles[tone]}`}
    >
      <p className="text-sm font-medium text-[#667085]">{label}</p>

      <p className={`mt-3 text-3xl font-semibold ${valueStyles[tone]}`}>
        {value}
      </p>

      {description ? (
        <p className="mt-2 text-sm leading-6 text-[#667085]">
          {description}
        </p>
      ) : null}
    </article>
  );
}