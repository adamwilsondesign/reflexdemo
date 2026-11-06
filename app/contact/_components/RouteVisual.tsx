import { Field } from "@/components/visual/kit";
import { InboxRoute } from "@/components/visual/scenes/InboxRoute";

/** Hero visual: an incoming message is routed to a named person on the right team. */
export function RouteVisual() {
  return (
    <div aria-hidden="true">
      <Field field="lake">
        <InboxRoute />
      </Field>
    </div>
  );
}
