import { Field } from "@/components/visual/kit";
import { WatchlistToast } from "@/components/visual/scenes/WatchlistToast";

/** Hero: insights land on the names in your book as a toast; each marks its row. */
export function MorningOpen() {
  return (
    <Field field="lake">
      <WatchlistToast />
    </Field>
  );
}
