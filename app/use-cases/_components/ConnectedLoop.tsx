"use client";

import clsx from "clsx";
import { useLoop } from "./useLoop";

const NODES = [
  { label: "Monitor", sub: "An Insight flags CoreWeave’s Rubin rollout", x: 50, y: 12 },
  { label: "Research", sub: "Alfred pressure-tests the read on NVIDIA", x: 88, y: 74 },
  { label: "Test", sub: "Stress the position against a capex slowdown", x: 12, y: 74 },
];

/** Research, monitoring and testing feed each other; Insights keep running around the loop. */
export function ConnectedLoop() {
  const { ref, step, reduce, inView } = useLoop(3, 2600, 0);
  return (
    <div ref={ref} className="pui grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
      <ol className="ui-card divide-y divide-black/10 lg:col-span-5">
        {NODES.map((n, i) => (
          <li key={n.label} className="flex gap-3 px-4 py-3.5 md:px-5 md:py-4">
            <span className={clsx("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500", step === i ? "bg-[#0d0d0d]" : "bg-black/15")} />
            <span>
              <span className={clsx("block text-[15px] transition-colors duration-500", step === i ? "font-semibold text-[#0d0d0d]" : "font-medium text-[#5d5d5d]")}>{n.label}</span>
              <span className="mt-0.5 block text-[13px] leading-relaxed text-[#8f8f8f]">{n.sub}</span>
            </span>
          </li>
        ))}
        <li className="flex gap-3 px-4 py-3.5 md:px-5 md:py-4">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full border border-black/30" />
          <span>
            <span className="block text-[15px] font-medium text-[#5d5d5d]">Keep watching</span>
            <span className="mt-0.5 block text-[13px] leading-relaxed text-[#8f8f8f]">The names you researched and tested stay on your watchlist, so the next relevant development comes back to you.</span>
          </span>
        </li>
      </ol>

      <div className="relative mx-auto aspect-square w-[86%] max-w-[480px] lg:col-span-7">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
          {/* always-on ring */}
          <circle cx={50} cy={53} r={47} stroke="rgb(255 255 255 / 0.14)" strokeWidth={0.25} />
          {/* the loop */}
          <path id="loop" d="M50 12 L88 74 L12 74 Z" stroke="rgb(255 255 255 / 0.3)" strokeWidth={0.3} strokeLinejoin="round" />
          {!reduce && inView && (
            <circle r={1.1} fill="#ffffff">
              <animateMotion dur="7.8s" repeatCount="indefinite" rotate="auto">
                <mpath href="#loop" />
              </animateMotion>
            </circle>
          )}
          <circle cx={50} cy={53} r={12} stroke="rgb(255 255 255 / 0.3)" strokeWidth={0.25} />
        </svg>

        <div className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-[14px] font-semibold text-white sm:text-[15px]">Ideas</p>
          <p className="text-[12px] text-white/50">from every pass</p>
        </div>

        <p className="absolute left-1/2 top-[-1%] -translate-x-1/2 -translate-y-full whitespace-nowrap text-[12px] text-white/50">Insights, always on</p>

        {NODES.map((n, i) => (
          <div key={n.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <div
              className={clsx(
                "flex h-[64px] w-[64px] items-center justify-center rounded-full border text-[13px] font-medium transition-colors duration-500 sm:h-[80px] sm:w-[80px] sm:text-[14px]",
                step === i ? "border-white bg-white text-[#0d0d0d]" : "border-white/25 text-white/80",
              )}
              style={step === i ? undefined : { background: "var(--color-lake-900)" }}
            >
              {n.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
