import { Field } from "@/components/visual/kit";
import { ScenarioDash } from "@/components/visual/scenes/ScenarioDash";

/** Hero: one scenario, set up as an investor would run it (approved dashboard). */
export function FanChart() {
  return (
    <Field field="mist">
      <ScenarioDash />
    </Field>
  );
}
