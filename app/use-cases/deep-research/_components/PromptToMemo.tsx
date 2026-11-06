import { Field } from "@/components/visual/kit";
import { PromptRun } from "@/components/visual/scenes/PromptRun";

/** Hero: one prompt in, the run checks off step by step, the memo is ready. */
export function PromptToMemo() {
  return (
    <Field field="lake">
      <PromptRun />
    </Field>
  );
}
