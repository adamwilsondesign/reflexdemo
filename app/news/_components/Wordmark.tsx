import clsx from "clsx";
import type { Format, Outlet } from "./data";

/**
 * Outlet shown as a styled text wordmark (consistent across outlets; no third-party logo files).
 * Unknown outlets fall back to a neutral format label.
 */
export function Wordmark({ outlet, format, size = "md", className }: { outlet?: Outlet; format?: Format; size?: "sm" | "md"; className?: string }) {
  const sm = size === "sm";
  const base = clsx("inline-block whitespace-nowrap leading-none", className);
  switch (outlet) {
    case "CNBC":
      return <span className={clsx(base, "font-display font-extrabold tracking-[-0.02em]", sm ? "text-[13px]" : "text-[17px]")}>CNBC</span>;
    case "Bloomberg":
      return <span className={clsx(base, "font-display font-bold tracking-[-0.035em]", sm ? "text-[13px]" : "text-[17px]")}>Bloomberg</span>;
    case "Barron's":
      return <span className={clsx(base, "font-[Georgia,'Times_New_Roman',serif] font-bold uppercase tracking-[0.06em]", sm ? "text-[11px]" : "text-[14px]")}>Barron&rsquo;s</span>;
    case "Reuters":
      return (
        <span className={clsx(base, "inline-flex items-center gap-1.5 font-sans font-semibold tracking-[-0.01em]", sm ? "text-[13px]" : "text-[16px]")}>
          <span aria-hidden="true" className={clsx("inline-block rounded-full border-[2px] border-dotted border-current", sm ? "h-2.5 w-2.5" : "h-3 w-3")} />
          Reuters
        </span>
      );
    case "Fox Business":
      return <span className={clsx(base, "font-display font-extrabold uppercase tracking-[0.02em]", sm ? "text-[11px]" : "text-[13px]")}>Fox Business</span>;
    case "Business Insider":
      return (
        <span className={clsx(base, "font-display font-extrabold uppercase leading-[0.95] tracking-[0.01em]", sm ? "text-[10px]" : "text-[12px]")}>
          Business
          <br />
          Insider
        </span>
      );
    case "PWM":
      return <span className={clsx(base, "font-[Georgia,'Times_New_Roman',serif] font-bold tracking-[0.04em]", sm ? "text-[13px]" : "text-[17px]")}>PWM</span>;
    case "Hedge Fund Alpha":
      return <span className={clsx(base, "font-display font-semibold tracking-[-0.01em]", sm ? "text-[11px]" : "text-[14px]")}>Hedge Fund Alpha</span>;
    default:
      return <span className={clsx(base, "font-mono font-medium uppercase tracking-[0.06em] opacity-70", sm ? "text-[10px]" : "text-[11px]")}>{format ?? "Press"}</span>;
  }
}
