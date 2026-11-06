"use client";

import { Field } from "@/components/visual/kit";
import { HoldingsToasts } from "@/components/visual/scenes/HoldingsToasts";

/** Alerts land as toasts over the watchlist they touch. */
export function AlertStack() {
  return (
    <Field field="pine">
      <HoldingsToasts />
    </Field>
  );
}
