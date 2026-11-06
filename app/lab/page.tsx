import type { Metadata } from "next";
import { DirA } from "./_components/DirA";
import { DirB } from "./_components/DirB";
import { DirC } from "./_components/DirC";

export const metadata: Metadata = {
  title: "Graphics lab",
  robots: { index: false, follow: false },
};

const DIRS = [
  {
    id: "A",
    name: "Focal card",
    note: "One card in focus with context cards cropped and fading off the frame. A cursor sends the prompt, the working steps check off and resolve into a ranked answer, then the cursor opens the evidence behind one name.",
    field: "field-lake",
    C: DirA,
  },
  {
    id: "B",
    name: "Graph native",
    note: "Built from the Knowledge Graph’s own vocabulary: circle for a company, pill for a theme, square for a geography, diamond for a product. An amber path traces the exposure and a floating card names the result.",
    field: "field-lake",
    C: DirB,
  },
  {
    id: "C",
    name: "Layered stack",
    note: "Cards dealt in depth: the question, the evidence chart and the ranked answer. Hatching marks data that isn’t disclosed. The cursor turns the answer into an action.",
    field: "field-pine",
    C: DirC,
  },
];

export default function Lab() {
  return (
    <section data-tone="light" data-bg="#f4f3f1" className="bg-paper pb-32 pt-[calc(var(--header-h)+64px)]">
      <div className="container-x">
        <p className="t-ui text-ink/50">Internal · not indexed</p>
        <h1 className="t-h1 mt-4 max-w-[720px]">Graphics lab: home hero</h1>
        <p className="t-lead mt-6 max-w-[640px] text-ink/70">
          Three directions on the same story (the Alfred sample prompt from the team sheet), built on one shared kit. Pick a direction, or mix parts: “A’s card, B’s path, less text”.
        </p>

        <div className="mt-20 space-y-28">
          {DIRS.map(({ id, name, note, field, C }) => (
            <div key={id} id={`dir-${id.toLowerCase()}`} className="grid-12 gap-y-8">
              <div className="col-span-12 lg:col-span-4">
                <p className="t-ui text-ink/50">Direction {id}</p>
                <h2 className="t-h2 mt-3">{name}</h2>
                <p className="t-body mt-4 text-ink/70">{note}</p>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <div className={`grain relative isolate overflow-hidden rounded-[18px] p-5 sm:p-10 ${field}`}>
                  <C />
                </div>
                <div className="mt-6 flex items-start gap-6">
                  <div className={`grain relative isolate w-[340px] max-w-full overflow-hidden rounded-[14px] p-4 ${field}`}>
                    <C />
                  </div>
                  <p className="t-small hidden pt-2 text-ink/50 sm:block">Phone width</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
