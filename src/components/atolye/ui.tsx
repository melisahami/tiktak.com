import type { ReactNode } from "react";

/* Mevcut panel dili: lacivert/beyaz, hairline kenarlık,
   turuncu (#F59E4A) yalnızca vurgu ve kritik durumlar. */

const CIP: Record<string, string> = {
  "Bekliyor": "bg-[#E9EFF9] text-[#4A5568] border-[#DDE4EF]",
  "Bekleniyor": "bg-[#E9EFF9] text-[#4A5568] border-[#DDE4EF]",
  "Planlanan": "bg-[#E9EFF9] text-[#4A5568] border-[#DDE4EF]",
  "Başlatılmadı": "bg-[#E9EFF9] text-[#4A5568] border-[#DDE4EF]",
  "Devam ediyor": "bg-[#E6EEFA] text-[#1F3D77] border-[#CFDDF3]",
  "Transfer planlandı": "bg-[#E6EEFA] text-[#1F3D77] border-[#CFDDF3]",
  "Orta": "bg-[#E6EEFA] text-[#1F3D77] border-[#CFDDF3]",
  "Açık": "bg-[#FDF4E3] text-[#8A5F0F] border-[#EFDFBE]",
  "Eksik": "bg-[#FDF4E3] text-[#8A5F0F] border-[#EFDFBE]",
  "Eksik var": "bg-[#FDF4E3] text-[#8A5F0F] border-[#EFDFBE]",
  "Geç katıldı": "bg-[#FDF4E3] text-[#8A5F0F] border-[#EFDFBE]",
  "Yüksek": "bg-[#FDF4E3] text-[#8A5F0F] border-[#EFDFBE]",
  "Gecikti": "bg-[#FBEDEE] text-[#9B2C2C] border-[#EFD3D6]",
  "Kritik": "bg-[#FBEDEE] text-[#9B2C2C] border-[#EFD3D6]",
  "Kritik eksik": "bg-[#FBEDEE] text-[#9B2C2C] border-[#EFD3D6]",
  "Katılmadı": "bg-[#FBEDEE] text-[#9B2C2C] border-[#EFD3D6]",
  "Tamamlandı": "bg-[#E9F5EF] text-[#106B4A] border-[#C7E4D6]",
  "Onaylandı": "bg-[#E9F5EF] text-[#106B4A] border-[#C7E4D6]",
  "Hazır": "bg-[#E9F5EF] text-[#106B4A] border-[#C7E4D6]",
  "Uygun": "bg-[#E9F5EF] text-[#106B4A] border-[#C7E4D6]",
  "Katıldı": "bg-[#E9F5EF] text-[#106B4A] border-[#C7E4D6]",
  "Teslim alındı": "bg-[#E9F5EF] text-[#106B4A] border-[#C7E4D6]",
  "Kapandı": "bg-[#E9F5EF] text-[#106B4A] border-[#C7E4D6]",
  "Düşük": "bg-[#E9EFF9] text-[#4A5568] border-[#DDE4EF]",
};

export function Chip({ children }: { children: string }) {
  const c = CIP[children] ?? CIP["Bekliyor"];
  return (
    <span className={`inline-block rounded-md border px-2 py-[3px] text-xs whitespace-nowrap ${c}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-[#DDE5F0] bg-white ${className}`}>{children}</section>;
}

export function CardHead({
  title, hint, children,
}: { title: string; hint?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 border-b border-[#DDE5F0] px-[18px] py-[15px]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-[#F59E4A]" />
      <h2 className="m-0 text-base font-semibold text-[#14213D]">{title}</h2>
      {hint ? <span className="text-xs text-[#667085]">{hint}</span> : null}
      {children ? <div className="ml-auto flex flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-[18px]">
      <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-[#14213D]">{title}</h1>
      {sub ? <p className="mt-1.5 mb-0 text-sm text-[#667085]">{sub}</p> : null}
    </div>
  );
}

export function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl border border-[#DDE5F0] bg-white p-4">
      <div className="text-[13px] text-[#667085]">{label}</div>
      <div className="mt-1 text-[22px] font-semibold text-[#14213D]">{value}</div>
      {note ? <div className="mt-1 text-xs text-[#8B95A6]">{note}</div> : null}
    </div>
  );
}

export const TH =
  "px-3 py-[11px] text-left text-[13px] font-semibold text-[#14213D] first:pl-[18px] last:pr-[18px]";
export const TD = "px-3 py-3 align-middle first:pl-[18px] last:pr-[18px]";
export const TR = "border-t border-[#DDE5F0] hover:bg-[#F6F9FE]";

export function Table({
  head, children, minWidth = 720,
}: { head: string[]; children: ReactNode; minWidth?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        <thead>
          <tr className="bg-[#F6F9FE]">
            {head.map((h) => (<th key={h} scope="col" className={TH}>{h}</th>))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Progress({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-sm bg-[#E9EFF9]">
        <div className="h-full rounded-sm bg-[#14213D]" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[13px] text-[#667085]">%{pct}</span>
    </div>
  );
}

export function Primary(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`rounded-lg bg-[#14213D] px-[15px] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B2C52] disabled:cursor-not-allowed disabled:bg-[#E9EFF9] disabled:text-[#8B95A6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E4A] ${className}`}
    />
  );
}

export function Secondary(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`rounded-lg border border-[#DDE5F0] bg-white px-[15px] py-2.5 text-sm text-[#243B64] transition-colors hover:bg-[#F6F9FE] disabled:cursor-not-allowed disabled:text-[#8B95A6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E4A] ${className}`}
    />
  );
}

export function RowButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`whitespace-nowrap rounded-lg border border-[#DDE5F0] bg-white px-2.5 py-1.5 text-[13px] text-[#243B64] transition-colors hover:bg-[#F6F9FE] disabled:cursor-not-allowed disabled:text-[#8B95A6] ${className}`}
    />
  );
}

export function Notice({
  tone = "warn", children,
}: { tone?: "warn" | "ok" | "err" | "info"; children: ReactNode }) {
  const t = {
    warn: "bg-[#FDF4E3] border-[#EFDFBE] text-[#8A5F0F]",
    ok: "bg-[#E9F5EF] border-[#C7E4D6] text-[#106B4A]",
    err: "bg-[#FBEDEE] border-[#EFD3D6] text-[#9B2C2C]",
    info: "bg-[#F6F9FE] border-[#DDE5F0] text-[#3C4657]",
  }[tone];
  return <div className={`rounded-lg border px-3.5 py-3 text-sm ${t}`}>{children}</div>;
}

export function Empty({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[#D9E2EE] px-5 py-11 text-center">
      <div className="text-[15px] font-semibold text-[#14213D]">{title}</div>
      {sub ? <div className="mt-1.5 text-[13px] text-[#667085]">{sub}</div> : null}
    </div>
  );
}

export function Field({
  label, htmlFor, children,
}: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[13px] text-[#667085]">{label}</label>
      {children}
    </div>
  );
}

export const CONTROL =
  "mt-1.5 w-full rounded-lg border border-[#DDE5F0] bg-white px-2.5 py-2 text-[13px] text-[#3C4657] outline-none focus-visible:border-[#F59E4A]";

export function Tabs<T extends string>({
  items, value, onChange,
}: { items: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="tablist" className="mb-5 flex flex-wrap gap-1 border-b border-[#DDE5F0]">
      {items.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={value === t}
          onClick={() => onChange(t)}
          className={
            value === t
              ? "border-b-2 border-[#F59E4A] px-3.5 py-2.5 text-sm font-semibold text-[#14213D]"
              : "border-b-2 border-transparent px-3.5 py-2.5 text-sm text-[#667085] hover:text-[#14213D]"
          }
        >
          {t}
        </button>
      ))}
    </div>
  );
}
