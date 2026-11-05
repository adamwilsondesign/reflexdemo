"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Stage } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;
const C = 260;
const R_OUT = 222;
const R_MID = 160;
const R_IN = 98;

/** Request dots arriving from outside. Permitted ones pass through to the core; others stop at the permission layer. */
const r2 = (n: number) => Math.round(n * 100) / 100;

const REQUESTS = [
  { a: 28, ok: true, d: 0 },
  { a: 118, ok: false, d: 1.6 },
  { a: 205, ok: true, d: 3.1 },
  { a: 300, ok: false, d: 4.4 },
  { a: 250, ok: true, d: 5.8 },
];

function arcTicks(r: number, n: number, len: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    const x1 = r2(C + Math.cos(t) * r), y1 = r2(C + Math.sin(t) * r);
    const x2 = r2(C + Math.cos(t) * (r + len)), y2 = r2(C + Math.sin(t) * (r + len));
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
}

/**
 * Security hero: three concentric precision layers.
 * Outer: permission-aware access (gated ring, requests checked).
 * Middle: encryption in transit (packets travelling on a dashed channel).
 * Inner: client isolation (your environment, sealed core).
 */
export function SecurityHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();
  const play = inView && !reduce;

  const draw = (delay: number) => ({
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1.6, delay, ease: EASE },
  });

  return (
    <Stage field="ink" className="w-full">
      <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[560px] p-3 sm:p-6">
        <svg viewBox="0 0 520 520" className="h-full w-full" role="img" aria-label="Diagram: requests pass a permission layer, travel encrypted, and reach an isolated client environment.">
          <defs>
            <radialGradient id="sec-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8fa3b6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#243244" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* faint radial guides */}
          <g stroke="rgb(255 255 255 / 0.05)" strokeWidth="1">
            {Array.from({ length: 12 }, (_, i) => {
              const t = (i / 12) * Math.PI * 2;
              return <line key={i} x1={r2(C + Math.cos(t) * R_IN)} y1={r2(C + Math.sin(t) * R_IN)} x2={r2(C + Math.cos(t) * 252)} y2={r2(C + Math.sin(t) * 252)} />;
            })}
          </g>

          {/* Outer: permission layer */}
          <motion.g animate={play ? { rotate: 360 } : undefined} transition={{ duration: 120, ease: "linear", repeat: Infinity }}>
            <motion.circle cx={C} cy={C} r={R_OUT} fill="none" stroke="rgb(244 243 241 / 0.55)" strokeWidth="1.2" strokeDasharray="120 14" {...draw(0.3)} />
            <g stroke="rgb(244 243 241 / 0.35)" strokeWidth="1">{arcTicks(R_OUT + 6, 72, 4)}</g>
          </motion.g>

          {/* Middle: encryption channel */}
          <motion.circle cx={C} cy={C} r={R_MID} fill="none" stroke="#8fa3b6" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="2 6" {...draw(0.6)} />
          <motion.circle cx={C} cy={C} r={R_MID - 10} fill="none" stroke="#8fa3b6" strokeOpacity="0.25" strokeWidth="1" {...draw(0.7)} />
          {[0, 1, 2].map((i) => (
            <motion.g
              key={i}
              initial={{ rotate: i * 120 }}
              animate={play ? { rotate: i * 120 + 360 } : undefined}
              transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            >
              <circle cx={C} cy={C} r={R_MID + 4} fill="none" stroke="none" />
              <rect x={C - 7} y={C - R_MID - 4} width="14" height="8" rx="2" fill="#d5dee6" opacity="0.9" />
              <rect x={C - 24} y={C - R_MID - 1.5} width="12" height="3" rx="1.5" fill="#d5dee6" opacity="0.25" />
            </motion.g>
          ))}

          {/* Inner: isolated client environment */}
          <circle cx={C} cy={C} r={R_IN + 30} fill="url(#sec-core)" />
          <motion.circle cx={C} cy={C} r={R_IN} fill="rgb(36 50 68 / 0.55)" stroke="rgb(244 243 241 / 0.85)" strokeWidth="1.4" {...draw(0.9)} />
          <motion.circle cx={C} cy={C} r={R_IN - 8} fill="none" stroke="rgb(244 243 241 / 0.25)" strokeWidth="1" {...draw(1)} />
          {!reduce && (
            <motion.circle
              cx={C}
              cy={C}
              r={R_IN}
              fill="none"
              stroke="rgb(244 243 241 / 0.6)"
              strokeWidth="1"
              animate={play ? { r: [R_IN, R_IN + 22], opacity: [0.6, 0] } : undefined}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <text x={C} y={C - 6} textAnchor="middle" className="fill-paper font-display" style={{ fontSize: 17, fontWeight: 600 }}>Your environment</text>
          <text x={C} y={C + 16} textAnchor="middle" className="fill-paper/60 font-mono" style={{ fontSize: 9.5, letterSpacing: "0.08em" }}>RESEARCH · DATA · OUTPUTS</text>

          {/* Requests */}
          {REQUESTS.map((q, i) => (
            <g key={i} transform={`rotate(${q.a} ${C} ${C})`}>
              <line x1={C} y1={6} x2={C} y2={C - R_IN} stroke="rgb(255 255 255 / 0.06)" strokeDasharray="2 4" />
              {play && (
                <motion.circle
                  cx={C}
                  r={4}
                  fill={q.ok ? "#d5e0da" : "#d9b48a"}
                  initial={{ cy: 0, opacity: 0 }}
                  animate={{
                    cy: q.ok ? [0, C - R_OUT, C - R_OUT, C - R_IN - 6] : [0, C - R_OUT - 4, C - R_OUT - 4, C - R_OUT - 14],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 3.4, times: [0, 0.4, 0.55, 1], delay: q.d, repeat: Infinity, repeatDelay: 3.6, ease: "easeInOut" }}
                />
              )}
            </g>
          ))}

          {/* Layer labels */}
          <g className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.08em" }}>
            <text x={C} y={C - R_OUT - 14} textAnchor="middle" className="fill-paper/70">PERMISSION-AWARE ACCESS</text>
            <text x={C} y={C - R_MID + 26} textAnchor="middle" className="fill-lake-300">ENCRYPTED IN TRANSIT</text>
            <text x={C} y={C + R_IN + 22} textAnchor="middle" className="fill-paper/55">CLIENT ISOLATION</text>
          </g>
        </svg>

        <div className="pointer-events-none absolute bottom-3 left-4 flex flex-wrap gap-x-4 gap-y-1 sm:bottom-5 sm:left-6">
          <span className="t-ui flex items-center gap-1.5 text-[9.5px] text-paper/60"><span className="h-1.5 w-1.5 rounded-full bg-[#d5e0da]" />Permitted</span>
          <span className="t-ui flex items-center gap-1.5 text-[9.5px] text-paper/60"><span className="h-1.5 w-1.5 rounded-full bg-[#d9b48a]" />Outside entitlements</span>
        </div>
      </div>
    </Stage>
  );
}
