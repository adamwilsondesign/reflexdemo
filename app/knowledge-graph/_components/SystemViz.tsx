"use client";

import { useEffect, useState } from "react";
import { RadialSystem } from "@/components/graphics/Cartography";

/**
 * RadialSystem, mounted after hydration. The shared component computes node positions
 * with trig, and server/client float rounding differs in the last digit (hydration warning).
 * It also renders at its native 400px viewBox width, since its strokes draw in screen units.
 */
export function SystemViz() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="flex h-full items-center justify-center">
      <div className="aspect-square w-full max-w-[400px]">{mounted && <RadialSystem accent="#f4f3f1" />}</div>
    </div>
  );
}
