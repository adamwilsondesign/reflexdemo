import clsx from "clsx";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

export type Surface = "paper" | "mist" | "white" | "ink" | "lake" | "pine" | "graphite";

const surfaces: Record<Surface, { cls: string; tone: "light" | "dark" }> = {
  paper: { cls: "bg-paper text-ink", tone: "light" },
  mist: { cls: "bg-mist-100 text-ink", tone: "light" },
  white: { cls: "bg-white text-ink", tone: "light" },
  ink: { cls: "bg-ink text-paper", tone: "dark" },
  graphite: { cls: "bg-[#1f2226] text-paper", tone: "dark" },
  lake: { cls: "bg-lake-900 text-paper", tone: "dark" },
  pine: { cls: "bg-pine-900 text-paper", tone: "dark" },
};

/**
 * Page section. `surface` sets colour and the `data-tone` the header reads to invert itself.
 * Spacing: default generous vertical rhythm; `tight` for denser bands.
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
  const s = surfaces[surface];
  const dark = s.tone === "dark";
  return (
    <section
      id={id}
      data-tone={s.tone}
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

/** Eyebrow + title + lead. Title animates word-by-word. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  actions,
  size = "h2",
  maxW = "max-w-[760px]",
}: {
  eyebrow?: React.ReactNode;
  title: string;
  lead?: React.ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
  actions?: React.ReactNode;
  size?: "h1" | "h2";
  maxW?: string;
}) {
  if (align === "split") {
    return (
      <div className={clsx("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
        <div className="lg:col-span-7">
          {eyebrow && <Reveal className="mb-5">{typeof eyebrow === "string" ? <Eyebrow>{eyebrow}</Eyebrow> : eyebrow}</Reveal>}
          <SplitText text={title} className={size === "h1" ? "t-h1" : "t-h2"} />
        </div>
        {(lead || actions) && (
          <Reveal delay={0.15} className="flex flex-col justify-end gap-6 lg:col-span-5 lg:pb-1">
            {lead && <div className="t-lead opacity-75">{lead}</div>}
            {actions}
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className={clsx(maxW, align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal className={clsx("mb-5", align === "center" && "flex justify-center")}>
          {typeof eyebrow === "string" ? <Eyebrow>{eyebrow}</Eyebrow> : eyebrow}
        </Reveal>
      )}
      <SplitText text={title} className={size === "h1" ? "t-h1" : "t-h2"} />
      {lead && (
        <Reveal delay={0.15} className={clsx("t-lead mt-5 opacity-75", align === "center" && "mx-auto max-w-[620px]")}>
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
