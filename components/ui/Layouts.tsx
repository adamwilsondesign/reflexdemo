import Link from "next/link";
import clsx from "clsx";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SplitText } from "./SplitText";
import { SURFACES, type Surface } from "./Section";
import { CartoViz } from "@/components/graphics/Cartography";
import { vizFor, type VizName } from "@/lib/viz";

/* ==================================================================
   Market-cartography layouts (50/50). Reusable across pages.
   ================================================================== */

export function ArrowNE({ className }: { className?: string }) {
  return (
    <span className={clsx("relative inline-block h-3 w-3 overflow-hidden", className)} aria-hidden="true">
      <svg viewBox="0 0 12 12" className="absolute inset-0 h-full w-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full group-hover:translate-x-full" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M2 10L10 2M4 2h6v6" />
      </svg>
      <svg viewBox="0 0 12 12" className="absolute inset-0 h-full w-full -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M2 10L10 2M4 2h6v6" />
      </svg>
    </span>
  );
}

/** Text link with a ↗ arrow and underline — the cartography link style. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={clsx("group inline-flex items-center gap-2 border-b border-current/40 pb-1 font-display text-[15px] font-medium transition-colors hover:border-current", className)}>
      {children}
      <ArrowNE />
    </Link>
  );
}

/**
 * 50/50 colour block: copy on one side, an animated cartography visual on the other.
 * Use for concept moments ("Trace the exposure", "Every market is a system").
 */
export function SplitFeature({
  surface = "pine",
  title,
  lead,
  link,
  visual,
  reverse = false,
  children,
  id,
  className,
}: {
  surface?: Surface;
  title: string;
  lead?: React.ReactNode;
  link?: { label: string; href: string };
  visual: React.ReactNode;
  reverse?: boolean;
  children?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const s = SURFACES[surface];
  return (
    <section id={id} data-tone={s.tone} data-bg={s.bg} className={clsx("relative isolate overflow-hidden py-20 md:py-28 lg:py-32", s.cls, className)}>
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className={clsx(reverse && "lg:order-2")}>
          <SplitText text={title} className="t-h1" />
          {lead && (
            <Reveal delay={0.15}>
              <div className={clsx("t-lead mt-6 max-w-[480px]", s.tone === "dark" ? "text-paper/75" : "text-ink/72")}>{lead}</div>
            </Reveal>
          )}
          {children && <Reveal delay={0.2}>{children}</Reveal>}
          {link && (
            <Reveal delay={0.25} className="mt-10">
              <TextLink href={link.href}>{link.label}</TextLink>
            </Reveal>
          )}
        </div>
        <Reveal delay={0.1} className={clsx("relative mx-auto aspect-square w-full max-w-[520px]", reverse && "lg:order-1", s.tone === "dark" ? "text-paper" : "text-ink")}>
          {visual}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * 50/50: headline left, a list of linked rows right (e.g. audiences, routes).
 * Rows: title, optional note, ↗ — hover darkens the rule and moves the arrow; nothing shifts.
 */
export function LinkRowsBlock({
  title,
  lead,
  rows,
  onDark = false,
  className,
  viz,
}: {
  title: string;
  lead?: React.ReactNode;
  rows: { label: string; href: string; note?: string; cta?: string }[];
  onDark?: boolean;
  className?: string;
  /** cartography chart under the headline (desktop); `false` to omit */
  viz?: VizName | false;
}) {
  const chart = viz === false ? null : (viz ?? vizFor(title, ["branch", "orbit", "flow", "wave", "exposure", "radial"]));
  return (
    <div className={clsx("grid gap-10 lg:grid-cols-2 lg:gap-16", className)}>
      <div className="flex flex-col">
        <SplitText text={title} className="t-h2 max-w-[520px]" />
        {lead && (
          <Reveal delay={0.15}>
            <div className={clsx("t-lead mt-5 max-w-[460px]", onDark ? "text-paper/72" : "text-ink/72")}>{lead}</div>
          </Reveal>
        )}
        {chart && (
          <Reveal delay={0.2} className={clsx("mt-12 hidden aspect-[4/3] w-full max-w-[380px] lg:block", onDark ? "text-paper/70" : "text-ink/60")}>
            <CartoViz name={chart} accent={onDark ? "#f4f3f1" : "#3e5c50"} />
          </Reveal>
        )}
      </div>
      <LinkRows rows={rows} onDark={onDark} />
    </div>
  );
}

export function LinkRows({ rows, onDark = false, numbered = false, className }: { rows: { label: string; href: string; note?: string; cta?: string }[]; onDark?: boolean; numbered?: boolean; className?: string }) {
  return (
    <Stagger as="ul" className={clsx("border-t", onDark ? "border-white/20" : "border-ink/15", className)}>
      {rows.map((r, i) => (
        <StaggerItem as="li" key={r.label}>
          <Link
            href={r.href}
            data-cta={r.cta}
            className={clsx(
              "group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b py-5 transition-colors duration-300 md:py-6",
              numbered ? "md:grid-cols-[48px_1fr_1fr_auto]" : r.note ? "md:grid-cols-[1fr_1fr_auto]" : "",
              onDark ? "border-white/20 hover:border-paper" : "border-ink/15 hover:border-ink",
            )}
          >
            {numbered && <span className={clsx("t-ui hidden md:col-start-1 md:row-start-1 md:block", onDark ? "text-paper/50" : "text-ink/45")}>{String(i + 1).padStart(2, "0")}</span>}
            <span className={clsx("col-start-1 row-start-1 font-display text-[19px] font-medium tracking-[-0.01em] md:text-[21px]", numbered && "md:col-start-2")}>{r.label}</span>
            {r.note && (
              <span className={clsx("t-small col-span-2 col-start-1 row-start-2 md:col-span-1 md:row-start-1", numbered ? "md:col-start-3" : "md:col-start-2", onDark ? "text-paper/65" : "text-ink/60")}>{r.note}</span>
            )}
            <ArrowNE className={clsx("col-start-2 row-start-1 justify-self-end", numbered ? "md:col-start-4" : r.note ? "md:col-start-3" : "")} />
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/**
 * "Two ways to work": headline, then two columns joined by a dotted rule with nodes.
 */
export function TwoWays({
  title,
  items,
  onDark = false,
  className,
}: {
  title: string;
  items: { title: string; body: string; link: { label: string; href: string } }[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <SplitText text={title} className="t-h1 max-w-[720px]" />
      <div className="relative mt-14 md:mt-20">
        <Reveal className="relative hidden h-px md:block">
          <span className={clsx("absolute inset-0", onDark ? "bg-white/25" : "bg-ink/20")} />
          {items.map((_, i) => (
            <span key={i} className={clsx("absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full", onDark ? "bg-paper" : "bg-ink")} style={{ left: `${(i / items.length) * 100}%` }} />
          ))}
        </Reveal>
        <Stagger className="grid gap-12 md:mt-10 md:grid-cols-2 md:gap-16">
          {items.map((it) => (
            <StaggerItem key={it.title} className={clsx("border-t pt-6 md:border-t-0 md:pt-0", onDark ? "border-white/20" : "border-ink/15")}>
              <h3 className="t-h2">{it.title}</h3>
              <p className={clsx("t-body mt-3 max-w-[420px]", onDark ? "text-paper/72" : "text-ink/70")}>{it.body}</p>
              <TextLink href={it.link.href} className="mt-7">{it.link.label}</TextLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
