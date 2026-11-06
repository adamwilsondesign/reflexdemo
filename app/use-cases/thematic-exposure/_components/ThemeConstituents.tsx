import { Field } from "@/components/visual/kit";
import { ConstituentTrace } from "@/components/visual/scenes/ConstituentTrace";

/** Hero: the obvious constituents first, then the second-order names a sector screen misses. */
export function ThemeConstituents() {
  return (
    <Field field="ink">
      <ConstituentTrace />
    </Field>
  );
}
