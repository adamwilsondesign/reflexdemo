import { Field } from "@/components/visual/kit";
import { Reveal } from "@/components/ui/Reveal";
import { Controls } from "@/components/visual/scenes/Controls";

const POINTS = [
  { title: "Client isolation", body: "Customer data and research remain isolated from other client environments." },
  { title: "Controlled connections", body: "Your firm controls which sources Reflexivity can connect to and can revoke access at any time." },
  { title: "Limited data retention", body: "Reflexivity does not persistently store client data, minimizing exposure of sensitive information." },
  { title: "Never trained on your data", body: "Your prompts, documents, connected data, and outputs are never used to train Reflexivity’s models or those of third-party providers." },
];

/** "Your data, protected": the four statements as a static list, beside the workspace controls scene. */
export function DataProtection() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <ul className="lg:col-span-5">
        {POINTS.map((it, i) => (
          <Reveal as="li" key={it.title} delay={i * 0.06} className="border-t border-ink/12 py-5 md:py-6">
            <h3 className="t-h3">{it.title}</h3>
            <p className="t-body mt-3 text-ink/70">{it.body}</p>
          </Reveal>
        ))}
        <li aria-hidden="true" className="border-t border-ink/12" />
      </ul>
      <div className="lg:col-span-7">
        <Field field="ink">
          <Controls />
        </Field>
      </div>
    </div>
  );
}
