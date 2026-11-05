import Image from "next/image";
import clsx from "clsx";
import { DATA_SOURCES } from "@/lib/logos";

/** Infinite marquee. Duplicates children for a seamless loop and pauses on hover. */
export function Marquee({ children, duration = 40, className }: { children: React.ReactNode; duration?: number; className?: string }) {
  return (
    <div className={clsx("group mask-fade-x relative overflow-hidden", className)}>
      <div
        className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DataSourceLogos({ onDark = false, className, marquee = true }: { onDark?: boolean; className?: string; marquee?: boolean }) {
  const items = DATA_SOURCES.map((l) => (
    <div key={l.name} className={clsx("flex h-10 shrink-0 items-center", marquee ? "px-8 md:px-11" : "justify-center")}>
      <Image
        src={l.src}
        alt={l.name}
        width={l.w}
        height={l.h}
        className={clsx("h-auto max-h-[26px] w-auto object-contain opacity-70 grayscale transition-opacity hover:opacity-100", onDark && "invert")}
        style={{ width: l.w * 0.95 }}
      />
    </div>
  ));
  if (!marquee) return <div className={clsx("grid grid-cols-3 gap-x-6 gap-y-8 md:grid-cols-5", className)}>{items}</div>;
  return (
    <Marquee className={className} duration={45}>
      {items}
    </Marquee>
  );
}

export function WordmarkStrip({ names, onDark = false, className }: { names: readonly string[]; onDark?: boolean; className?: string }) {
  return (
    <Marquee className={className} duration={38}>
      {names.map((n) => (
        <span
          key={n}
          className={clsx(
            "shrink-0 px-8 font-display text-[22px] font-semibold tracking-[-0.02em] md:px-12 md:text-[26px]",
            onDark ? "text-paper/55" : "text-ink/45",
          )}
        >
          {n}
        </span>
      ))}
    </Marquee>
  );
}
