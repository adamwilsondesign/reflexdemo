"use client";

import { Field } from "@/components/visual/kit";
import { ComposerModes } from "@/components/visual/scenes/ComposerModes";

/** Hero: one composer, two modes. The cursor switches "Ask once" to "Keep watching" and sends. */
export function AlfredHero() {
  return (
    <Field field="pine">
      <ComposerModes />
    </Field>
  );
}
