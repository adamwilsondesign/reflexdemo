import { Field } from "@/components/visual/kit";
import { RankTable } from "@/components/visual/scenes/RankTable";
import { Illustrative } from "@/components/ui/Illustrative";

const STEPS = [
  ["What happened", "A flash PMI surprise lifts input costs."],
  ["Why it matters", "Margins tighten for manufacturers without pricing power."],
  ["What else is affected", "The Graph ranks every name the event reaches, and how."],
  ["The implication", "Automation suppliers screen as beneficiaries."],
] as const;

/**
 * Worked example: one macro catalyst traced to its implication.
 * The steps read as a static sequence; the graphic acts the ranking out on its own.
 */
export function RippleExample() {
  return (
    <div className="grid-12 items-center gap-y-10">
      <ol className="col-span-12 lg:col-span-5" aria-label="Worked example steps">
        {STEPS.map(([t, b], k) => (
          <li key={t} className="flex items-baseline gap-4 border-t border-white/20 py-5">
            <span className="t-ui w-6 shrink-0 tabular-nums text-paper/55">{String(k + 1).padStart(2, "0")}</span>
            <span>
              <span className="t-h3 block text-paper">{t}</span>
              <span className="t-small mt-1.5 block text-paper/65">{b}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <Field field="ink">
          <RankTable />
        </Field>
        <Illustrative onDark className="mt-4">Illustrative example. Rankings show relationship exposure, not a forecast or recommendation.</Illustrative>
      </div>
    </div>
  );
}
