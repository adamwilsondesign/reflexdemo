import clsx from "clsx";

/** The one style for "illustrative" disclaimers: small, sentence case, muted. Never uppercase. */
export function Illustrative({ children = "Illustrative example.", className, onDark = false }: { children?: React.ReactNode; className?: string; onDark?: boolean }) {
  return <p className={clsx("text-[12px] leading-4 tracking-normal normal-case", onDark ? "text-paper/50" : "text-ink/50", className)}>{children}</p>;
}
