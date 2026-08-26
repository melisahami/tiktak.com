import type { ButtonHTMLAttributes, ReactNode } from "react";

const CHIP_STYLES: Record<string, string> = {
  Açık: "border-[#EFDFBE] bg-[#FDF4E3] text-[#8A5F0F]",
  Kapandı: "border-[#C7E4D6] bg-[#E9F5EF] text-[#106B4A]",
  Tamamlandı: "border-[#C7E4D6] bg-[#E9F5EF] text-[#106B4A]",
  Katıldı: "border-[#C7E4D6] bg-[#E9F5EF] text-[#106B4A]",
  Katılmadı: "border-[#EFD3D6] bg-[#FBEDEE] text-[#9B2C2C]",
  Gecikti: "border-[#EFD3D6] bg-[#FBEDEE] text-[#9B2C2C]",
};

export function Chip({ children }: { children: string }) {
  return (
    <span
      className={`inline-block rounded-md border px-2 py-1 text-xs ${CHIP_STYLES[children] ?? "border-[#DDE4EF] bg-[#E9EFF9] text-[#4A5568]"}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-[#DDE5F0] bg-white ${className}`}
    >
      {children}
    </section>
  );
}

export function CardHead({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#DDE5F0] px-5 py-4">
      <span className="h-1.5 w-1.5 rounded-sm bg-[#F59E4A]" />
      <h2 className="text-base font-semibold text-[#14213D]">{title}</h2>
      {hint ? <span className="text-xs text-[#667085]">{hint}</span> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-[#DDE5F0] bg-white p-4">
      <div className="text-sm text-[#667085]">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-[#14213D]">{value}</div>
      <div className="mt-1 text-xs text-[#8B95A6]">{note}</div>
    </div>
  );
}

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`rounded-lg bg-[#14213D] px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1B2C52] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    />
  );
}
