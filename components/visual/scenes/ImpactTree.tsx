"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Glyph, Icon, RX_EASE, Spark, type EntityKind, useTimeline } from "@/components/visual/kit";

/**
 * Alfred · Relationship intelligence — "Trace market impact faster".
 * Composition: an expandable impact tree (file-tree grammar). The cursor opens
 * one branch, then the next; each level is one more hop through the Knowledge
 * Graph, and the third hop surfaces the name nobody was watching.
 */
type Node = { id: string; name: string; kind: EntityKind; rel: string; hop: 0 | 1 | 2 | 3; depth: number; parent?: string; w: number; hidden?: boolean };
const NODES: Node[] = [
  { id: "root", name: "Advanced packaging", kind: "theme", rel: "Event theme", hop: 0, depth: 0, w: 1 },
  { id: "tsm", name: "TSMC", kind: "company", rel: "Capacity owner", hop: 1, depth: 1, parent: "root", w: 0.92 },
  { id: "amkr", name: "Amkor", kind: "company", rel: "Packaging partner", hop: 2, depth: 2, parent: "tsm", w: 0.64 },
  { id: "nvda", name: "NVIDIA", kind: "company", rel: "Customer", hop: 2, depth: 2, parent: "tsm", w: 0.81 },
  { id: "smci", name: "Super Micro", kind: "company", rel: "Server builder", hop: 3, depth: 3, parent: "nvda", w: 0.58, hidden: true },
  { id: "cls", name: "Celestica", kind: "company", rel: "Assembler", hop: 3, depth: 3, parent: "nvda", w: 0.42 },
  { id: "ase", name: "ASE Technology", kind: "company", rel: "Packaging supplier", hop: 1, depth: 1, parent: "root", w: 0.55 },
];
const PARENTS = new Set(["root", "tsm", "nvda", "ase"]);

const TOP = 150; // y of the first row on the canvas
const RH = 40;
const X0 = 50; // card content left

// 0 in · 1 move · 2 open TSMC · 3 move · 4 open NVIDIA · 5 hold · 6 out
const D = [1400, 900, 1300, 900, 500, 4400, 700];

export function ImpactTree() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const open = new Set<string>(["root"]);
  if (p >= 2) open.add("tsm");
  if (p >= 4) open.add("nvda");
  const rows = NODES.filter((n) => !n.parent || (open.has(n.parent) && (n.parent === "root" || open.has("root"))));
  const visible = rows.filter((n) => {
    let q = n.parent;
    while (q) { if (!open.has(q)) return false; q = NODES.find((x) => x.id === q)?.parent; }
    return true;
  });
  const chev = (id: string) => {
    const i = visible.findIndex((n) => n.id === id);
    const n = NODES.find((x) => x.id === id)!;
    return { x: X0 + n.depth * 20 + 7, y: TOP + i * RH + RH / 2 };
  };
  const cursor =
    p === 0 ? { x: 120, y: 480, visible: false } :
    p <= 2 ? { ...chev("tsm"), visible: true } :
    p <= 4 ? { ...chev("nvda"), visible: true } :
    { x: 330, y: 470, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.3}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[30px] top-[30px] w-[500px] px-5 pb-5 pt-5" initial={{ y: 16 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="h-[72px]">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#3e5368]"><Spark size={10} />Impact trace</p>
              <p className="rx-serif mt-1.5 text-[19px] leading-[26px]">Advanced-packaging capacity tightens</p>
            </div>
            <div className="flex h-7 items-center border-b border-[var(--rx-line)] text-[10.5px] text-[var(--rx-3)]">
              <span className="flex-1">Entity</span>
              <span className="w-[118px]">Link</span>
              <span className="w-[44px]">Hop</span>
              <span className="w-[70px] text-right">Exposure</span>
            </div>
            <div className="relative">
              <AnimatePresence initial={false}>
                {visible.map((n) => {
                  const isOpen = open.has(n.id);
                  const hot = n.hidden && p >= 4;
                  return (
                    <motion.div
                      key={n.id}
                      layout="position"
                      className={clsx("relative flex h-[40px] items-center border-b border-[var(--rx-line)] last:border-0", hot && "bg-[var(--rx-well)]")}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: RH }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: RX_EASE }}
                    >
                      {hot && <motion.span className="absolute left-0 top-2.5 h-5 w-[2px] rounded-full bg-[var(--rx-signal)]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5 }} />}
                      <span className="flex min-w-0 flex-1 items-center gap-2" style={{ paddingLeft: n.depth * 20 }}>
                        <span className="grid w-[14px] place-items-center text-[var(--rx-3)]">
                          {PARENTS.has(n.id) ? (
                            <motion.span animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.25 }} className="grid place-items-center"><Icon name="chev" size={12} /></motion.span>
                          ) : null}
                        </span>
                        <Glyph kind={n.kind} size={10} className="text-[var(--rx-2)]" />
                        <span className={clsx("truncate text-[12.5px]", n.depth <= 1 || hot ? "font-medium" : "")}>{n.name}</span>
                      </span>
                      <span className="w-[118px] truncate text-[11.5px] text-[var(--rx-2)]">{n.rel}</span>
                      <span className="w-[44px]">
                        {n.hop > 0 && <span className="rx-num rounded-[5px] bg-[var(--rx-well)] px-1.5 py-0.5 text-[10px] text-[var(--rx-2)]">{n.hop}°</span>}
                      </span>
                      <span className="flex w-[70px] items-center justify-end gap-2">
                        {n.hop > 0 && (
                          <>
                            <span className="h-[5px] w-[36px] overflow-hidden rounded-full bg-[var(--rx-well)]">
                              <motion.span className="block h-full rounded-full" style={{ background: "#3e5368" }} initial={{ width: 0 }} animate={{ width: `${n.w * 100}%` }} transition={{ delay: 0.3, duration: 0.8, ease: RX_EASE }} />
                            </span>
                            <span className="rx-num w-[26px] text-right text-[11px] text-[var(--rx-2)]">{n.w.toFixed(2).slice(1)}</span>
                          </>
                        )}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
          <Cursor {...cursor} press={p === 2 || p === 4} />
        </motion.div>
      </Canvas>
    </div>
  );
}
