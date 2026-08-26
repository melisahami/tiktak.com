import { SessionGuard } from "@/components/auth/session-guard";
import { SessionSummary } from "@/components/auth/session-summary";
import { MetricCard } from "@/components/ui/metric-card";
import type { UserRole } from "@/types/auth";

interface Highlight {
  label: string;
  value: string;
  description: string;
  tone?: "navy" | "amber" | "success" | "danger";
}

interface Note {
  title: string;
  description: string;
}

interface RolePageShellProps {
  role: UserRole;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: readonly Highlight[];
  notes: readonly Note[];
}

/**
 * Rol panelleri için ortak, oturum korumalı sayfa iskeleti.
 * İçerik prototip aşamasında demo verilerle doldurulur.
 */
export function RolePageShell({
  role,
  breadcrumb,
  eyebrow,
  title,
  description,
  highlights,
  notes,
}: RolePageShellProps) {
  return (
    <SessionGuard allow={[role]}>
      <main className="min-h-screen bg-[#F5F7FB] text-[#172033]">
        <header className="border-b border-[#E4EAF2] bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
            <div>
              <p className="text-xs font-medium text-[#667085]">{breadcrumb}</p>
              <p className="mt-1 text-sm font-medium text-[#172033]">{title}</p>
            </div>

            <SessionSummary />
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <section className="rounded-2xl bg-gradient-to-r from-[#14213D] to-[#243B64] px-6 py-7 text-white md:px-8">
            <p className="text-sm font-medium text-[#F4A261]">{eyebrow}</p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
              {description}
            </p>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {highlights.map((highlight) => (
              <MetricCard
                description={highlight.description}
                key={highlight.label}
                label={highlight.label}
                tone={highlight.tone ?? "navy"}
                value={highlight.value}
              />
            ))}
          </section>

          <section className="mt-8 rounded-xl border border-[#E4EAF2] bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold">Sıradaki adımlar</h2>
            <p className="mt-1 text-sm text-[#667085]">
              Bu ekran prototip aşamasındadır; aşağıdaki akışlar sırayla
              geliştirilecektir.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {notes.map((note) => (
                <article
                  className="rounded-lg border border-[#E4EAF2] bg-[#F8FAFC] p-4"
                  key={note.title}
                >
                  <h3 className="text-sm font-semibold text-[#172033]">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#667085]">
                    {note.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </SessionGuard>
  );
}
