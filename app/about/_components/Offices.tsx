"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const OFFICES = [
  { city: "New York", tz: "America/New_York", region: "Americas", coords: "40.71° N, 74.01° W" },
  { city: "London", tz: "Europe/London", region: "EMEA", coords: "51.51° N, 0.13° W" },
  { city: "Tokyo", tz: "Asia/Tokyo", region: "APAC", coords: "35.68° N, 139.65° E" },
] as const;

/** Office cards with a live local clock (rendered after mount to avoid hydration mismatch). */
export function Offices({ onDark = false }: { onDark?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const iv = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(iv);
  }, []);

  return (
    <ul className={clsx("grid gap-px overflow-hidden rounded-[16px] md:grid-cols-3", onDark ? "bg-white/10" : "bg-ink/10")}>
      {OFFICES.map((o) => {
        const time = now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: o.tz }).format(now) : "--:--";
        const hour = now ? Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: o.tz }).format(now)) : 12;
        const open = hour >= 8 && hour < 19;
        return (
          <li key={o.city} className={clsx("flex flex-col p-6 md:p-8", onDark ? "bg-lake-900" : "bg-white")}>
            <div className="flex items-center justify-between">
              <span className={clsx("t-ui", onDark ? "text-paper/50" : "text-ink/50")}>{o.region}</span>
              <span className={clsx("flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.05em]", onDark ? "text-paper/60" : "text-ink/55")}>
                <span className={clsx("h-1.5 w-1.5 rounded-full", open ? "bg-pine-300" : onDark ? "bg-paper/30" : "bg-ink/25")} />
                <span suppressHydrationWarning>{time}</span> local
              </span>
            </div>
            <h3 className="t-h2 mt-10 md:mt-14">{o.city}</h3>
            <p className={clsx("mt-2 font-mono text-[11px] uppercase tracking-[0.05em]", onDark ? "text-paper/40" : "text-ink/40")}>{o.coords}</p>
          </li>
        );
      })}
    </ul>
  );
}
