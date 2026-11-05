import clsx from "clsx";

/** Reflexivity mark (●●◖) + wordmark, redrawn as vector from the Framer logo asset. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 192 76" className={className} aria-hidden="true" fill="currentColor">
      <circle cx="38" cy="38" r="38" />
      <circle cx="114" cy="38" r="38" />
      <path d="M192 0 A38 38 0 0 0 192 76 Z" />
    </svg>
  );
}

export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <span className={clsx("inline-flex items-center", size === "md" ? "gap-[13px]" : "gap-[10px]", className)}>
      <LogoMark className={size === "md" ? "h-[13.5px] w-auto" : "h-[11px] w-auto"} />
      <span
        className={clsx(
          "font-display font-bold uppercase leading-none tracking-[0.01em]",
          size === "md" ? "text-[18px]" : "text-[15px]",
        )}
      >
        Reflexivity
      </span>
    </span>
  );
}
