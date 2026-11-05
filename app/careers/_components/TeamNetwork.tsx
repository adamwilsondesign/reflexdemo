"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Stage } from "@/components/product/ui";
import { ROLES } from "./roles";

const EASE = [0.16, 1, 0.3, 1] as const;

const CITIES = [
  { name: "New York", x: 90, y: 128 },
  { name: "London", x: 236, y: 82 },
  { name: "Tokyo", x: 400, y: 132 },
];
const ARCS = [
  "M90 128 Q 163 40 236 82",
  "M236 82 Q 318 40 400 132",
  "M90 128 Q 245 230 400 132",
];

/** Hero visual: three offices linked as one team, with open roles cycling through. */
export function TeamNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setI((x) => (x + 1) % ROLES.length), 2600);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  const role = ROLES[i];

  return (
    <Stage field="lake" className="p-4 sm:p-7 md:p-8">
      <div ref={ref}>
        <div className="mb-3 flex items-center justify-between text-[13px] text-white/80">
          <span>One distributed team</span>
          <span>3 offices</span>
        </div>

        <div className="relative">
          <svg viewBox="0 0 490 220" className="h-auto w-full overflow-visible" aria-hidden="true">
            {ARCS.map((d, k) => (
              <g key={d}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="rgb(255 255 255 / 0.35)"
                  strokeWidth={1}
                  strokeDasharray="3 5"
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.4 + k * 0.2 }}
                />
                {!reduce && inView && (
                  <circle r={3} fill="#fff">
                    <animateMotion dur={`${4 + k}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            ))}
            {CITIES.map((c, k) => (
              <g key={c.name}>
                {!reduce && (
                  <circle cx={c.x} cy={c.y} r={10} stroke="#fff" strokeWidth={1} fill="none" className="animate-pulse-ring" style={{ transformOrigin: `${c.x}px ${c.y}px`, animationDelay: `${k * 0.7}s` }} />
                )}
                <circle cx={c.x} cy={c.y} r={10} fill="rgb(255 255 255 / 0.15)" stroke="#fff" strokeWidth={1.2} />
                <circle cx={c.x} cy={c.y} r={3.5} fill="#fff" />
                <text x={c.x} y={c.y + 30} textAnchor="middle" className="fill-white text-[13px]">
                  {c.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="ui-card mt-3 p-4">
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold text-[#0d0d0d]">Now hiring</span>
            <span className="tabular-nums text-[#8f8f8f]">
              {i + 1} of {ROLES.length}
            </span>
          </div>
          <div className="relative mt-2 grid h-[60px] overflow-hidden border-t border-black/10 pt-2">
            <AnimatePresence initial={false}>
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="[grid-area:1/1]"
              >
                <p className="truncate text-[16px] font-medium text-[#0d0d0d]">{role.title}</p>
                <p className="mt-0.5 text-[13px] text-[#5d5d5d]">
                  {role.team} · {role.city}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Stage>
  );
}
