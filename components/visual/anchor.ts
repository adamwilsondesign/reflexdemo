"use client";

import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Canvas-space coordinates of an element inside a scaled Canvas, so a Cursor
 * lands exactly on what it clicks whatever the text metrics turn out to be.
 * `root` is a w×h div at the canvas origin. Re-measures when `deps` change.
 */
export function useAnchor(
  root: RefObject<HTMLElement | null>,
  el: RefObject<HTMLElement | null>,
  deps: unknown[],
  { ax = 0.5, ay = 0.5, dx = 0, dy = 0 } = {},
) {
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  useIso(() => {
    const measure = () => {
      const r = root.current, e = el.current;
      if (!r || !e) return;
      const rr = r.getBoundingClientRect();
      const s = rr.width / (r.offsetWidth || 1) || 1;
      const er = e.getBoundingClientRect();
      const x = Math.round((er.left - rr.left) / s + (er.width / s) * ax + dx);
      const y = Math.round((er.top - rr.top) / s + (er.height / s) * ay + dy);
      setPt((o) => (o && o.x === x && o.y === y ? o : { x, y }));
    };
    measure();
    const a = setTimeout(measure, 450);
    const b = setTimeout(measure, 1000);
    return () => { clearTimeout(a); clearTimeout(b); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return pt;
}
