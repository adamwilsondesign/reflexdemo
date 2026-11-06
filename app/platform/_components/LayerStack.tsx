"use client";

import { Field } from "@/components/visual/kit";
import { PlatformLayers } from "@/components/visual/scenes/PlatformLayers";

/**
 * Platform hero visual: Reflexivity as the intelligence layer between institutional data
 * and the tools a research team already uses. A tighter layout on phones keeps all three tiers in frame.
 */
export function LayerStack() {
  return (
    <Field field="lake">
      <div className="sm:hidden"><PlatformLayers w={420} /></div>
      <div className="hidden sm:block"><PlatformLayers /></div>
    </Field>
  );
}
