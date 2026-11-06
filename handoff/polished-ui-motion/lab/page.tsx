// app/lab/page.tsx — private review page. Build every new illustration here first,
// get approval, then move it into its real slot. Not indexed.
import type { Metadata } from "next";
import { Field, type FieldName } from "@/components/visual/kit";
import { LayeredStack } from "@/components/visual/scenes/LayeredStack";
import { AlertRoll } from "@/components/visual/scenes/AlertRoll";

export const metadata: Metadata = { title: "Graphics lab", robots: { index: false, follow: false } };

const ITEMS: { id: string; page: string; kind: string; note: string; field: FieldName; C: () => React.ReactNode }[] = [
  { id: "hero", page: "Home · Hero", kind: "Layered stack", note: "Question, evidence, answer dealt in depth; cursor turns the answer into an action.", field: "secondary", C: LayeredStack },
  { id: "alerts", page: "Product · Alerts", kind: "Alert roll", note: "Separate alert cards land on top and settle down.", field: "primary", C: AlertRoll },
];

export default function Lab() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 py-24">
      <h1 className="text-4xl font-semibold">Graphics lab</h1>
      <p className="mt-4 max-w-xl opacity-70">Comment by name, e.g. “Alert roll: slower, fewer words”.</p>
      <div className="mt-16 grid gap-x-8 gap-y-20 lg:grid-cols-2">
        {ITEMS.map(({ id, page, kind, note, field, C }) => (
          <div key={id} id={id}>
            <Field field={field}><C /></Field>
            <p className="mt-5 text-sm opacity-50">{page}</p>
            <h2 className="mt-1 text-xl font-semibold">{kind}</h2>
            <p className="mt-2 max-w-md opacity-70">{note}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
