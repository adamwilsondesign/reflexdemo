import clsx from "clsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LinkRows, LinkRowsBlock, TextLink } from "@/components/ui/Layouts";
import { SplitText } from "@/components/ui/SplitText";
import type { IconName } from "@/components/ui/PrecisionIcon";

/* ------------------------------------------------------------------
   Building blocks shared by the use-case pages.
   ------------------------------------------------------------------ */

export const USE_CASES: { slug: string; name: string; job: string; href: string; icon: IconName }[] = [
  { slug: "portfolio-monitoring", name: "Portfolio Monitoring", job: "Know what moved your book, and why it reached you.", href: "/use-cases/portfolio-monitoring", icon: "signal" },
  { slug: "deep-research", name: "Deep Research", job: "Turn one question into a cited research memo.", href: "/use-cases/deep-research", icon: "lattice" },
  { slug: "thematic-exposure", name: "Thematic Exposure", job: "Find every company a theme moves.", href: "/use-cases/thematic-exposure", icon: "venn" },
  { slug: "scenario-stress-testing", name: "Scenario & Stress Testing", job: "Test a hypothesis before you commit capital.", href: "/use-cases/scenario-stress-testing", icon: "rings" },
];

/** "The old workflow": two columns on a hairline rule, before | after. */
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
    <Stagger className={clsx("grid border-t border-ink/15 md:grid-cols-2", className)}>
      <StaggerItem className="pt-8 md:pr-12 md:pt-10">
        <h3 className="t-h3 text-ink/55">{before.label}</h3>
        <ul className="mt-7 space-y-4">
          {before.items.map((t) => (
            <li key={t} className="t-body flex gap-3.5 text-ink/60">
              <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-ink/30" />
              {t}
            </li>
          ))}
        </ul>
      </StaggerItem>
      <StaggerItem className="mt-10 border-t border-ink/15 pt-8 md:mt-0 md:border-l md:border-t-0 md:pl-12 md:pt-10">
        <h3 className="t-h3">{after.label}</h3>
        <ul className="mt-7 space-y-4">
          {after.items.map((t) => (
            <li key={t} className="t-body flex gap-3.5 text-ink/85">
              <svg viewBox="0 0 16 16" className="mt-[0.3em] h-4 w-4 shrink-0 text-pine-500" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
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

/** Who it is for: headline left, buyer types as linked rows right (50/50). */
export function Audiences({ title, lead, items, onDark = false }: { title: string; lead?: React.ReactNode; items: Audience[]; onDark?: boolean }) {
  return <LinkRowsBlock title={title} lead={lead} onDark={onDark} rows={items.map((a) => ({ label: a.name, href: a.href, note: a.body }))} />;
}

/** Contextual cross-links to the other use cases, as link rows (no card movement on hover). */
export function RelatedUseCases({ current, extra, onDark = false }: { current: string; extra?: { name: string; job: string; href: string }; onDark?: boolean }) {
  const items = USE_CASES.filter((u) => u.slug !== current);
  const list = extra ? [...items, extra] : items;
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <SplitText as="h2" text="Related workflows." className="t-h2 max-w-[520px]" />
        <Reveal delay={0.15} className="mt-8">
          <TextLink href="/use-cases">All use cases</TextLink>
        </Reveal>
      </div>
      <LinkRows onDark={onDark} rows={list.map((u) => ({ label: u.name, href: u.href, note: u.job }))} />
    </div>
  );
}

/** Small note under illustrative product examples: 12px, sentence case, muted (no badge). */
export function IllustrativeNote({ children, onDark = false, className }: { children: React.ReactNode; onDark?: boolean; className?: string }) {
  return <p className={clsx("text-[12px] leading-4", onDark ? "text-paper/50" : "text-ink/50", className)}>{children}</p>;
}
