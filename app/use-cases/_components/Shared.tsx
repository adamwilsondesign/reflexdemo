import Link from "next/link";
import clsx from "clsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";

/* ------------------------------------------------------------------
   Building blocks shared by the use-case pages.
   ------------------------------------------------------------------ */

export const USE_CASES: { slug: string; name: string; job: string; href: string; icon: IconName }[] = [
  { slug: "portfolio-monitoring", name: "Portfolio Monitoring", job: "Know what moved your book, and why it reached you.", href: "/use-cases/portfolio-monitoring", icon: "signal" },
  { slug: "deep-research", name: "Deep Research", job: "Turn one question into a cited research memo.", href: "/use-cases/deep-research", icon: "lattice" },
  { slug: "thematic-exposure", name: "Thematic Exposure", job: "Find every company a theme moves.", href: "/use-cases/thematic-exposure", icon: "venn" },
  { slug: "scenario-stress-testing", name: "Scenario & Stress Testing", job: "Test a hypothesis before you commit capital.", href: "/use-cases/scenario-stress-testing", icon: "rings" },
];

/** "The old workflow": a quiet before/after contrast. */
export function Contrast({
  before,
  after,
  className,
}: {
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
  className?: string;
}) {
  return (
    <Stagger className={clsx("grid gap-px overflow-hidden rounded-[16px] bg-ink/10 md:grid-cols-2", className)}>
      <StaggerItem className="bg-paper p-7 md:p-10">
        <p className="t-ui text-ink/45">{before.label}</p>
        <ul className="mt-7 space-y-4">
          {before.items.map((t) => (
            <li key={t} className="flex gap-3.5 text-[16px] leading-relaxed text-ink/60">
              <span aria-hidden="true" className="mt-[11px] h-px w-4 shrink-0 bg-ink/30" />
              {t}
            </li>
          ))}
        </ul>
      </StaggerItem>
      <StaggerItem className="relative bg-white p-7 md:p-10">
        <p className="t-ui text-lake-700">{after.label}</p>
        <ul className="mt-7 space-y-4">
          {after.items.map((t) => (
            <li key={t} className="flex gap-3.5 text-[16px] leading-relaxed text-ink/85">
              <svg viewBox="0 0 16 16" className="mt-[5px] h-4 w-4 shrink-0 text-pine-500" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-6.5" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </StaggerItem>
    </Stagger>
  );
}

export type Audience = { name: string; body: string; href: string };

/** Who it is for: buyer types prominent, the first one featured. */
export function Audiences({ items, onDark = false }: { items: Audience[]; onDark?: boolean }) {
  return (
    <Stagger className={clsx("grid gap-px overflow-hidden rounded-[16px] sm:grid-cols-2 lg:grid-cols-4", onDark ? "bg-white/10" : "bg-ink/10")}>
      {items.map((a, i) => (
        <StaggerItem key={a.name}>
          <Link
            href={a.href}
            className={clsx(
              "group flex h-full flex-col p-6 transition-colors duration-500 md:p-8",
              onDark ? "bg-lake-900 hover:bg-[#2a3a4f]" : "bg-paper hover:bg-white",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="t-h3">{a.name}</h3>
              {i === 0 && (
                <span className={clsx("t-ui shrink-0 rounded-full px-2.5 py-1 text-[10px]", onDark ? "bg-white/10 text-paper/80" : "bg-ink/[0.06] text-ink/70")}>Core fit</span>
              )}
            </div>
            <p className={clsx("t-body mt-3", onDark ? "text-paper/68" : "text-ink/65")}>{a.body}</p>
            <span className="mt-auto flex items-center gap-2 pt-8 font-display text-[15px] font-medium">
              <span className="link-underline">For {a.name.toLowerCase()}</span> <Arrow />
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Contextual cross-links to the other use cases (and the product pages behind them). */
export function RelatedUseCases({ current, extra }: { current: string; extra?: { name: string; job: string; href: string; icon: IconName } }) {
  const items = USE_CASES.filter((u) => u.slug !== current);
  const list = extra ? [...items, extra] : items;
  return (
    <div>
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="t-h3">Related workflows</h2>
        <Link href="/use-cases" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
          <span className="link-underline">All use cases</span> <Arrow />
        </Link>
      </Reveal>
      <Stagger className={clsx("mt-8 grid gap-4 sm:grid-cols-2", list.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
        {list.map((u) => (
          <StaggerItem key={u.href}>
            <Link href={u.href} className="group flex h-full items-start gap-4 rounded-[14px] border border-ink/10 bg-white/50 p-5 transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:border-ink/25 hover:bg-white">
              <PrecisionIcon name={u.icon} className="h-9 w-9 shrink-0 text-ink transition-transform duration-700 ease-[var(--ease-out-expo)]" />
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-display text-[16px] font-semibold">
                  {u.name} <Arrow />
                </span>
                <span className="t-small mt-1 block text-ink/60">{u.job}</span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** Small label used under every illustrative product example. */
export function IllustrativeNote({ children, onDark = false, className }: { children: React.ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p className={clsx("flex items-start gap-2 text-[12.5px] leading-relaxed", onDark ? "text-paper/50" : "text-ink/50", className)}>
      <span aria-hidden="true" className={clsx("mt-[3px] inline-flex h-[14px] shrink-0 items-center rounded-[3px] px-1 font-mono text-[9px] uppercase tracking-[0.06em]", onDark ? "bg-white/10 text-paper/70" : "bg-ink/[0.07] text-ink/60")}>
        Illustrative
      </span>
      <span>{children}</span>
    </p>
  );
}
