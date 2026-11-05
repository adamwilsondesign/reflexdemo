import clsx from "clsx";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

export type Surface = "paper" | "mist" | "white" | "ink" | "lake" | "pine" | "graphite";

/**
 * Colour blocks. `bg` feeds the scroll colour field (blends between blocks on scroll);
 * `tone` tells the header which way to invert.
 * Pine (#3E5C50) is the brand colour block; lake-900 the deep blue; ink the charcoal.
 */
export const SURFACES: Record<Surface, { cls: string; bg: string; tone: "light" | "dark" }> = {
  paper: { cls: "bg-paper text-ink", bg: "#f4f3f1", tone: "light" },
  mist: { cls: "bg-mist-200 text-ink", bg: "#e6e4df", tone: "light" },
  white: { cls: "bg-mist-100 text-ink", bg: "#f7f6f4", tone: "light" },
  ink: { cls: "bg-ink text-paper", bg: "#17191c", tone: "dark" },
  graphite: { cls: "bg-[#1f2226] text-paper", bg: "#1f2226", tone: "dark" },
  lake: { cls: "bg-lake-900 text-paper", bg: "#243244", tone: "dark" },
  pine: { cls: "bg-pine-500 text-paper", bg: "#3e5c50", tone: "dark" },
};

/**
 * Page section. Spacing: generous default rhythm; `tight` for denser bands.
 */
export function Section({
  children,
  surface = "paper",
  className,
  id,
  tight = false,
  bare = false,
  grid,
}: {
  children: React.ReactNode;
  surface?: Surface;
  className?: string;
  id?: string;
  tight?: boolean;
  bare?: boolean;
  /** optional background texture */
  grid?: "chart" | "dots";
}) {
  const s = SURFACES[surface];
  const dark = s.tone === "dark";
  return (
    <section
      id={id}
      data-tone={s.tone}
      data-bg={s.bg}
      className={clsx(
        "relative isolate",
        s.cls,
        !bare && (tight ? "py-16 md:py-20" : "py-20 md:py-28 lg:py-[136px]"),
        grid === "chart" && (dark ? "bg-chart-dark" : "bg-chart"),
        grid === "dots" && (dark ? "bg-dots-dark" : "bg-dots"),
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("container-x", className)}>{children}</div>;
}

/**
 * Section title + optional subhead. Rules (art direction):
 * - No eyebrows outside heroes (the `eyebrow` prop is accepted for compatibility and ignored).
 * - A headline with its subhead never exceeds half the desktop grid (6 of 12 columns).
 * - `split`: headline in the left half, subhead + actions in the right half (50/50).
 */
export function SectionHeader({
  title,
  lead,
  align = "left",
  className,
  actions,
  size = "h2",
}: {
  eyebrow?: React.ReactNode;
  title: string;
  lead?: React.ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
  actions?: React.ReactNode;
  size?: "h1" | "h2";
  /** deprecated: width is fixed to half the grid */
  maxW?: string;
}) {
  if (align === "split") {
    return (
      <div className={clsx("grid gap-6 lg:grid-cols-2 lg:gap-16", className)}>
        <SplitText text={title} className={size === "h1" ? "t-h1" : "t-h2"} />
        {(lead || actions) && (
          <Reveal delay={0.15} className="flex flex-col justify-end gap-6 lg:pb-1">
            {lead && <div className="t-lead opacity-75">{lead}</div>}
            {actions}
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className={clsx("max-w-[640px] lg:max-w-[calc(50%-2rem)]", align === "center" && "mx-auto text-center", className)}>
      <SplitText text={title} className={size === "h1" ? "t-h1" : "t-h2"} />
      {lead && (
        <Reveal delay={0.15} className="t-lead mt-5 opacity-75">
          {lead}
        </Reveal>
      )}
      {actions && (
        <Reveal delay={0.25} className={clsx("mt-8", align === "center" && "flex justify-center")}>
          {actions}
        </Reveal>
      )}
    </div>
  );
}
