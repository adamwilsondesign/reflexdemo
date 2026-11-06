"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const OFFICES = [
  { city: "New York", tz: "America/New_York", region: "Americas", coords: "40.71° N, 74.01° W", img: "/cities/new-york.jpg", pos: "50% 40%" },
  { city: "London", tz: "Europe/London", region: "EMEA", coords: "51.51° N, 0.13° W", img: "/cities/london.jpg", pos: "55% 45%" },
  { city: "Tokyo", tz: "Asia/Tokyo", region: "APAC", coords: "35.68° N, 139.65° E", img: "/cities/tokyo.jpg", pos: "45% 50%" },
] as const;

/** CC BY-SA 4.0 attribution for the office photos. Not rendered in round 6; must be restored (or photos licensed) before launch. */
export const OFFICE_PHOTO_CREDITS = [
  { city: "New York", author: "SebastianBlumeArt", href: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Lower_Manhattan_and_Battery_Park_at_dusk.jpg" },
  { city: "London", author: "mattbuck", href: "https://commons.wikimedia.org/wiki/File:London_MMB_%C2%BB053_River_Thames_and_the_City.jpg" },
  { city: "Tokyo", author: "Ximonic (Simo Räsänen)", href: "https://commons.wikimedia.org/wiki/File:Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower,_Ebisu,_Tokyo,_Japan,_2024_May.jpg" },
];

/** Office cards: city photograph background, live local clock (rendered after mount). */
export function Offices() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const iv = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-3">
        {OFFICES.map((o) => {
          const time = now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: o.tz }).format(now) : "--:--";
          const hour = now ? Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: o.tz }).format(now)) : 12;
          const open = hour >= 8 && hour < 19;
          return (
            <li key={o.city} className="relative isolate flex aspect-[4/3.4] flex-col overflow-hidden rounded-[16px] bg-ink p-6 text-paper md:p-8">
              <Image src={o.img} alt={`${o.city} at dusk`} fill sizes="(min-width:768px) 33vw, 100vw" className="-z-20 object-cover saturate-[0.75]" style={{ objectPosition: o.pos }} />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/15 to-ink/85" />
              <div className="flex items-center justify-between">
                <span className="t-ui text-paper/75">{o.region}</span>
                <span className="t-ui flex items-center gap-2 text-paper/80">
                  <span className={open ? "h-1.5 w-1.5 rounded-full bg-pine-300" : "h-1.5 w-1.5 rounded-full bg-paper/40"} />
                  <span suppressHydrationWarning>{time}</span> local
                </span>
              </div>
              <h3 className="t-h2 mt-auto">{o.city}</h3>
              <p className="t-ui mt-2 text-paper/60">{o.coords}</p>
            </li>
          );
        })}
      </ul>
      {/*
        Photo credits are intentionally not rendered (client request, round 6).
        LEGAL: these photos are CC BY-SA 4.0 and require attribution. Restore a visible credit
        (see OFFICE_PHOTO_CREDITS) or license/replace the photos before launch.
        Photos: New York, SebastianBlumeArt; London, mattbuck; Tokyo, Ximonic (Simo Räsänen).
        Licensed CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/), colour adjusted.
      */}
    </div>
  );
}
