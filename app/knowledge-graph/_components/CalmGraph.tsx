"use client";

import clsx from "clsx";

/**
 * A calm, fixed-layout node graph for the Knowledge Graph page.
 * - Few nodes at fixed coordinates: nothing moves or re-lays-out between states.
 * - One motion idea: the focus (and its links) brightens; everything else stays still.
 * - Companies are filled dots, themes/products/places are rings. No legend needed.
 */

type Node = { id: string; label: string; x: number; y: number; kind: "company" | "other" };

export const NODES: Node[] = [
  { id: "AMZN", label: "Amazon", x: 110, y: 96, kind: "company" },
  { id: "AI", label: "AI infrastructure", x: 300, y: 64, kind: "other" },
  { id: "NVDA", label: "NVIDIA", x: 280, y: 216, kind: "company" },
  { id: "TSM", label: "TSMC", x: 440, y: 152, kind: "company" },
  { id: "TW", label: "Taiwan", x: 480, y: 288, kind: "other" },
  { id: "PWR", label: "Data center power", x: 120, y: 296, kind: "other" },
  { id: "VRT", label: "Vertiv", x: 96, y: 408, kind: "company" },
  { id: "HBM", label: "HBM memory", x: 304, y: 368, kind: "other" },
  { id: "MU", label: "Micron", x: 456, y: 416, kind: "company" },
];

const EDGES: [string, string][] = [
  ["AMZN", "AI"],
  ["AMZN", "NVDA"],
  ["AMZN", "PWR"],
  ["AI", "NVDA"],
  ["AI", "TSM"],
  ["NVDA", "TSM"],
  ["TSM", "TW"],
  ["NVDA", "HBM"],
  ["HBM", "MU"],
  ["MU", "TW"],
  ["PWR", "VRT"],
  ["PWR", "NVDA"],
];

const BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));
const key = (a: string, b: string) => [a, b].sort().join("|");

export function CalmGraph({
  focus,
  path,
  className,
}: {
  /** node in focus */
  focus: string;
  /** optional path of node ids; when set, only these links light up */
  path?: string[];
  className?: string;
}) {
  const lit = new Set<string>();
  const near = new Set<string>([focus]);
  if (path && path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) lit.add(key(path[i], path[i + 1]));
    path.forEach((p) => near.add(p));
  } else {
    EDGES.forEach(([a, b]) => {
      if (a === focus || b === focus) {
        lit.add(key(a, b));
        near.add(a);
        near.add(b);
      }
    });
  }

  return (
    <svg viewBox="0 0 560 480" className={clsx("h-full w-full", className)} role="img" aria-label={`Knowledge Graph, focused on ${BY_ID[focus]?.label ?? focus}`}>
      {EDGES.map(([a, b]) => {
        const A = BY_ID[a], B = BY_ID[b];
        const on = lit.has(key(a, b));
        return (
          <line
            key={key(a, b)}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="#ffffff"
            strokeWidth={on ? 1.5 : 1}
            strokeOpacity={on ? 0.85 : 0.14}
            style={{ transition: "stroke-opacity .9s ease, stroke-width .9s ease" }}
          />
        );
      })}
      {NODES.map((n) => {
        const isFocus = n.id === focus;
        const isNear = near.has(n.id);
        const r = isFocus ? 9 : 6;
        const below = n.y < 120 ? -18 : 26;
        return (
          <g key={n.id} style={{ opacity: isNear ? 1 : 0.4, transition: "opacity .9s ease" }}>
            {isFocus && <circle cx={n.x} cy={n.y} r={20} fill="#ffffff" fillOpacity={0.08} />}
            {n.kind === "company" ? (
              <circle cx={n.x} cy={n.y} r={r} fill="#ffffff" style={{ transition: "r .9s ease" }} />
            ) : (
              <circle cx={n.x} cy={n.y} r={r} fill="#17191c" stroke="#ffffff" strokeWidth={1.5} style={{ transition: "r .9s ease" }} />
            )}
            <text
              x={n.x}
              y={n.y + below}
              textAnchor="middle"
              fontSize="16"
              fontWeight={isFocus ? 600 : 400}
              fill="#ffffff"
              fillOpacity={isFocus ? 1 : 0.75}
              style={{ transition: "fill-opacity .9s ease" }}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
