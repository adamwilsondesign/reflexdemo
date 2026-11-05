"use client";

import { useEffect, useState } from "react";
import { RadialSystem } from "@/components/graphics/Cartography";

/**
 * Client-only wrapper for the shared RadialSystem. Its trig-derived coordinates
 * can differ in the last float digit between server and browser, which causes a
 * hydration mismatch; rendering after mount avoids it. The square frame is kept
 * so layout does not shift.
 */
export function IsolationViz() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <div className="h-full w-full">{mounted && <RadialSystem accent="#f4f3f1" label="Your environment" />}</div>;
}
