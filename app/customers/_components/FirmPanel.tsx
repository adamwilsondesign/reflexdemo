import { Field } from "@/components/visual/kit";
import { FirmPicker } from "@/components/visual/scenes/FirmPicker";
import { FIRMS } from "./firms";

const SUB: Record<string, string> = {
  "hedge-funds": "The book and new ideas",
  "financial-institutions": "Products you distribute",
  "asset-managers": "Research to committee",
  "wealth-managers": "Client-ready notes",
};

/** Hero visual: the cursor picks a firm type and the workspace preview re-sets around it. */
export function FirmPanel() {
  const firms = FIRMS.map((f) => ({ name: f.name, sub: SUB[f.id], ask: f.panel.ask, result: f.panel.result, value: f.panel.value, sources: f.panel.sources }));
  return (
    <Field field="lake">
      <FirmPicker firms={firms} />
    </Field>
  );
}
