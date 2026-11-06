import { Field } from "@/components/visual/kit";
import { BriefInbox } from "@/components/visual/scenes/BriefInbox";

/** Morning read: the daily brief as it arrives, with sources and the week ahead. */
export function MorningBrief() {
  return (
    <Field field="pine">
      <BriefInbox />
    </Field>
  );
}
