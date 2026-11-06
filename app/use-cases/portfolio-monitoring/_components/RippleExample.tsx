import { Field } from "@/components/visual/kit";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { RippleSpread } from "@/components/visual/scenes/RippleSpread";

const STEPS = [
  { title: "Headline", body: "Start with the catalyst, its direction and the theme it moves." },
  { title: "Top 5 takeaways", body: "The five points to know about the catalyst, each tagged to its themes." },
  { title: "Graph ripple effects", body: "Follow the catalyst through the Reflexivity Graph to the connected companies, ranked, with what to watch for each." },
  { title: "Ask Alfred", body: "Check which regions are exposed, then ask Alfred follow‑up questions about the cohort." },
];

/** Worked example: the anatomy as a static list; the graphic acts it out (headline → ripple → follow-up). */
export function RippleExample() {
  return (
    <div className="grid-12 items-center gap-y-10">
      <Stagger as="ol" className="col-span-12 border-b border-ink/12 lg:col-span-4">
        {STEPS.map((s, i) => (
          <StaggerItem as="li" key={s.title} className="grid grid-cols-[32px_1fr] border-t border-ink/12 py-5">
            <span className="t-ui text-ink/45">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <h3 className="t-h3">{s.title}</h3>
              <p className="t-body mt-1.5 text-ink/70">{s.body}</p>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <Field field="ink">
          <RippleSpread />
        </Field>
      </div>
    </div>
  );
}
