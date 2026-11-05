"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useMemo, useState } from "react";
import clsx from "clsx";
import { Arrow } from "@/components/ui/Button";
import { ROLES, applyHref } from "./roles";

const EASE = [0.16, 1, 0.3, 1] as const;
const TEAMS = ["All teams", "Engineering", "Machine Learning", "Product"] as const;
const CITIES = ["All locations", "New York", "London"] as const;

/** Filterable open-roles list. Each role opens a pre-addressed application email. */
export function OpenRoles() {
  const [team, setTeam] = useState<(typeof TEAMS)[number]>("All teams");
  const [city, setCity] = useState<(typeof CITIES)[number]>("All locations");
  const reduce = useReducedMotion();
  const id = useId();

  const list = useMemo(
    () => ROLES.filter((r) => (team === "All teams" || r.team === team) && (city === "All locations" || r.city === city)),
    [team, city],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-labelledby={`${id}-team`} className="flex flex-wrap items-center gap-1.5">
          <span id={`${id}-team`} className="sr-only">Filter by team</span>
          {TEAMS.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={team === t}
              onClick={() => setTeam(t)}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.05em] transition-colors duration-300",
                team === t ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/65 hover:border-ink/40 hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div role="group" aria-labelledby={`${id}-city`} className="flex flex-wrap items-center gap-1.5">
          <span id={`${id}-city`} className="sr-only">Filter by location</span>
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={city === c}
              onClick={() => setCity(c)}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.05em] transition-colors duration-300",
                city === c ? "border-lake-700 bg-lake-700 text-paper" : "border-ink/15 text-ink/65 hover:border-ink/40 hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="t-ui mt-8 text-ink/50" aria-live="polite">
        {list.length} open {list.length === 1 ? "role" : "roles"}
      </p>

      <ul className="mt-4 border-b border-ink/12">
        <AnimatePresence initial={false}>
          {list.map((r) => (
            <motion.li
              key={`${r.title}-${r.city}`}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="border-t border-ink/12"
            >
              <a
                href={applyHref(`Application: ${r.title} (${r.city})`)}
                className="group grid items-center gap-2 py-5 transition-colors duration-300 hover:bg-white/60 md:grid-cols-12 md:gap-6 md:px-3 md:py-6"
              >
                <span className="md:col-span-6">
                  <span className="t-h3 block">{r.title}</span>
                </span>
                <span className="t-ui text-ink/55 md:col-span-2">{r.team}</span>
                <span className="t-small text-ink/60 md:col-span-3">{r.location}</span>
                <span className="mt-2 inline-flex items-center gap-2 font-display text-[15px] font-medium md:col-span-1 md:mt-0 md:justify-end">
                  Apply <Arrow />
                </span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {list.length === 0 && <p className="t-body py-8 text-ink/60">No roles match those filters right now. Send us a note anyway.</p>}
    </div>
  );
}
