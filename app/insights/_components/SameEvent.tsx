"use client";

import { Field } from "@/components/visual/kit";
import { LensSwitch } from "@/components/visual/scenes/LensSwitch";

/** One event, two artifacts: the reader changes, the frame and takeaways change with it. */
export function SameEvent() {
  return (
    <div className="mx-auto max-w-[860px]">
      <p className="sr-only">
        An activist investor discloses a stake in a consumer brands company. Read by a consumer portfolio manager, it becomes a category read; read by a special situations analyst, it becomes a deal-mechanics read. Both cite their source.
      </p>
      <Field field="lake">
        <div aria-hidden="true">
          <LensSwitch />
        </div>
      </Field>
    </div>
  );
}
