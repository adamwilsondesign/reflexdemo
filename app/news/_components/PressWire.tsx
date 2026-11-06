import { Field } from "@/components/visual/kit";
import { PressLog } from "@/components/visual/scenes/PressLog";

/** Hero visual: coverage lands in a newsroom log, with the latest announcement pinned. */
export function PressWire() {
  return (
    <div aria-hidden="true">
      <Field field="lake">
        <PressLog />
      </Field>
    </div>
  );
}
