import { Field } from "@/components/visual/kit";
import { Reveal } from "@/components/ui/Reveal";
import { ConstellationGraph } from "@/components/visual/scenes/ConstellationGraph";

const CATEGORIES = [
  { title: "Companies", body: "Follow customers, suppliers, competitors and partners to see where a market event may travel next." },
  { title: "Products and brands", body: "Connect the products and services behind a theme to the companies building and selling them." },
  { title: "Themes and drivers", body: "Industry, financial and macro themes, including the relationships between them." },
  { title: "Markets and geographies", body: "Trace relationships across regions and markets to uncover indirect exposure." },
];

/** "What the Graph maps": the four entity families as a static list, beside a clustered deep graph. */
export function GraphMaps() {
  return (
    <div className="grid-12 items-center gap-y-10">
      <ul className="col-span-12 lg:col-span-5">
        {CATEGORIES.map((c, i) => (
          <Reveal as="li" key={c.title} delay={i * 0.06} className="border-t border-ink/12 py-6">
            <h3 className="t-h3">{c.title}</h3>
            <p className="t-body mt-3 max-w-[480px] text-ink/70">{c.body}</p>
          </Reveal>
        ))}
        <li aria-hidden="true" className="border-t border-ink/12" />
      </ul>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <Field field="lake">
          <ConstellationGraph />
        </Field>
      </div>
    </div>
  );
}
