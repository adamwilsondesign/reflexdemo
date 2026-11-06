import { Field } from "@/components/visual/kit";
import { PromptLibrary } from "@/components/visual/scenes/PromptLibrary";

/** Plain language in, code out: a scenario picked from the prompt library, run in code, ready to re-run. */
export function SimulationTrace() {
  return (
    <Field field="ink">
      <PromptLibrary />
    </Field>
  );
}
