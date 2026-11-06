import { Field } from "@/components/visual/kit";
import { ThemeDrivers } from "@/components/visual/scenes/ThemeDrivers";

/** "See what's driving the theme": the approved theme card (tailwinds, headwinds, big movers, related themes). */
export function ThemePage() {
  return (
    <Field field="mist" className="w-full shrink-0">
      <ThemeDrivers />
    </Field>
  );
}
