import { Field } from "@/components/visual/kit";
import { AccessLog } from "@/components/visual/scenes/AccessLog";

/** Security hero: a live access log, every request checked against the firm's permissions. */
export function SecurityHero() {
  return (
    <Field field="pine">
      <AccessLog />
    </Field>
  );
}
