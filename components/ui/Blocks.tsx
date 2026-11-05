import Link from "next/link";
import clsx from "clsx";
import { Eyebrow } from "./Eyebrow";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SplitText } from "./SplitText";
import { DemoActions, Arrow } from "./Button";
import { PrecisionIcon, type IconName } from "./PrecisionIcon";
import { PropagationField } from "@/components/graphics/RippleRings";
import { Section } from "./Section";

export const TESTIMONIALS = [
  {
    quote:
      "Reflexivity has become an indispensable daily tool for the modern portfolio manager. Pairing ever-improving LLMs with best-in-class LSEG data, it makes idea generation, backtesting, risk management and trade construction seamless.",
    name: "Will Steffe",
    org: "Annapurna Global Macro",
  },
  {
    quote:
      "Reflexivity tells me what's about to matter across my book, not just what already happened. It flags the knock-on effects of an event the moment they emerge, with citations on every claim so I can check the read and move on it fast.",
    name: "Adam Till",
    org: "Founder, MainSail Fund",
  },
] as const;

/** Flexible quote component: 1 = feature quote, 2+ = grid. */
export function Testimonials({ items = TESTIMONIALS, onDark = false, title }: { items?: readonly { quote: string; name: string; org: string }[]; onDark?: boolean; title?: string }) {
  return (
    <div>
      {title && <SplitText text={title} className="t-h2 mb-12 max-w-[640px] md:mb-16" />}
      <Stagger className={clsx("grid gap-px overflow-hidden", items.length > 1 && "md:grid-cols-2", onDark ? "bg-white/10" : "bg-ink/10")}>
        {items.map((t) => (
          <StaggerItem key={t.name} as="article" className={clsx("flex flex-col justify-between gap-10 p-7 md:p-10 lg:p-12", onDark ? "bg-lake-900" : "bg-paper")}>
            <div>
              <svg viewBox="0 0 32 24" className={clsx("h-6 w-8", onDark ? "text-lake-300" : "text-lake-500")} fill="currentColor" aria-hidden="true">
                <path d="M0 24V14C0 6 4 1.5 12 0l1.5 3C9 4.5 7 7.5 7 11h5v13H0zm19 0V14c0-8 4-12.5 12-14l1 3c-4.5 1.5-6.5 4.5-6.5 8H31v13H19z" />
              </svg>
              <blockquote className="mt-6 font-display text-[20px] font-medium leading-[1.4] tracking-[-0.01em] md:text-[23px]">&ldquo;{t.quote}&rdquo;</blockquote>
            </div>
            <footer className="flex items-center gap-3">
              <span className={clsx("flex h-10 w-10 items-center justify-center rounded-full font-display text-[14px] font-semibold", onDark ? "bg-white/10" : "bg-ink/[0.06]")}>
                {t.name.split(" ").map((s) => s[0]).join("")}
              </span>
              <span>
                <span className="block font-display text-[15px] font-semibold">{t.name}</span>
                <span className="block text-[14px] opacity-60">{t.org}</span>
              </span>
            </footer>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** Final conversion band. One focused action; optional reassurance line. */
export function CTABand({
  title,
  lead,
  secondary,
  note = "Bring a question, watchlist, or example, or we’ll provide one. No confidential holdings required.",
  cta,
}: {
  title: string;
  lead?: string;
  secondary?: { label: string; href: string };
  note?: string | null;
  cta?: string;
}) {
  return (
    <Section surface="ink" className="overflow-hidden" tight>
      <div className="pointer-events-none absolute inset-0 -z-10 field-ink" />
      <div className="pointer-events-none absolute inset-y-0 right-[-20%] -z-10 w-[120%] opacity-70 md:right-[-10%] md:w-[80%]">
        <PropagationField />
      </div>
      <div className="container-x py-10 md:py-16">
        <div className="max-w-[760px]">
          <SplitText text={title} className="t-h1" />
          {lead && (
            <Reveal delay={0.15}>
              <p className="t-lead mt-6 max-w-[560px] text-paper/70">{lead}</p>
            </Reveal>
          )}
          <Reveal delay={0.25} className="mt-10">
            <DemoActions onDark secondary={secondary} cta={cta} />
            {note && <p className="t-small mt-5 max-w-[460px] text-paper/50">{note}</p>}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Feature grid item with precision icon. */
export function FeatureGrid({
  items,
  cols = 3,
  onDark = false,
  className,
}: {
  items: { icon?: IconName; title: string; body: React.ReactNode; href?: string; linkLabel?: string }[];
  cols?: 2 | 3 | 4;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Stagger
      className={clsx(
        "grid gap-x-10 gap-y-12",
        cols === 2 && "md:grid-cols-2",
        cols === 3 && "md:grid-cols-2 lg:grid-cols-3",
        cols === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((it) => (
        <StaggerItem key={it.title} className={clsx("group border-t pt-7", onDark ? "border-white/15" : "border-ink/12")}>
          {it.icon && <PrecisionIcon name={it.icon} className={clsx("mb-7 h-11 w-11 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[20deg]", onDark ? "text-paper" : "text-ink")} />}
          <h3 className="t-h3">{it.title}</h3>
          <div className={clsx("t-body mt-3", onDark ? "text-paper/70" : "text-ink/70")}>{it.body}</div>
          {it.href && (
            <Link href={it.href} className="group/l mt-5 inline-flex items-center gap-2 font-display text-[15px] font-medium">
              <span className="link-underline">{it.linkLabel ?? "Learn more"}</span>
              <Arrow />
            </Link>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Large link card (capability / use-case router). */
export function LinkCard({
  href,
  eyebrow,
  title,
  body,
  icon,
  visual,
  className,
  onDark = false,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  body?: string;
  icon?: IconName;
  visual?: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-[14px] border p-6 transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-7",
        onDark ? "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]" : "border-ink/10 bg-white/50 hover:border-ink/25 hover:bg-white",
        className,
      )}
    >
      {visual && <div className="-mx-6 -mt-6 mb-6 md:-mx-7 md:-mt-7">{visual}</div>}
      {icon && <PrecisionIcon name={icon} className="mb-8 h-10 w-10 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110" />}
      {eyebrow && <Eyebrow className="mb-3" dot={false}>{eyebrow}</Eyebrow>}
      <h3 className="t-h3">{title}</h3>
      {body && <p className={clsx("t-body mt-2.5", onDark ? "text-paper/65" : "text-ink/65")}>{body}</p>}
      <span className="mt-auto flex items-center gap-2 pt-7 font-display text-[15px] font-medium">
        Explore <Arrow />
      </span>
    </Link>
  );
}

/** Stat row with count-up handled by caller. */
export function StatRow({ items, onDark = false }: { items: { value: React.ReactNode; label: string; note?: string }[]; onDark?: boolean }) {
  return (
    <Stagger className={clsx("grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4", onDark ? "bg-white/10" : "bg-ink/10")}>
      {items.map((s) => (
        <StaggerItem key={s.label} className={clsx("p-6 md:p-8", onDark ? "bg-lake-900" : "bg-paper")}>
          <div className="font-display text-[40px] font-semibold leading-none tracking-[-0.03em] md:text-[56px]">{s.value}</div>
          <p className={clsx("t-ui mt-4", onDark ? "text-paper/60" : "text-ink/60")}>{s.label}</p>
          {s.note && <p className={clsx("mt-1 text-[12px]", onDark ? "text-paper/40" : "text-ink/40")}>{s.note}</p>}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Numbered process steps (e.g. implementation sequence). Numbers here are sequence, not decoration. */
export function Steps({ items, onDark = false }: { items: { title: string; body: string }[]; onDark?: boolean }) {
  return (
    <Stagger as="ol" className="grid gap-px md:grid-cols-5">
      {items.map((s, i) => (
        <StaggerItem key={s.title} as="li" className={clsx("relative border-t pt-6 md:pr-6", onDark ? "border-white/15" : "border-ink/15")}>
          <span className={clsx("absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full", onDark ? "bg-paper" : "bg-ink")} />
          <p className={clsx("t-ui", onDark ? "text-paper/50" : "text-ink/50")}>Step {i + 1}</p>
          <h3 className="t-h3 mt-3">{s.title}</h3>
          <p className={clsx("t-small mt-2", onDark ? "text-paper/65" : "text-ink/65")}>{s.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
