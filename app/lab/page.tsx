import type { Metadata } from "next";
import { DeepGraph as DirB } from "@/components/visual/scenes/DeepGraph";
import { LayeredStack as DirC } from "@/components/visual/scenes/LayeredStack";
import { AlertRoll } from "@/components/visual/scenes/AlertRoll";
import { InsightDoc } from "@/components/visual/scenes/InsightDoc";
import { RankTable } from "@/components/visual/scenes/RankTable";
import { ScenarioDash } from "@/components/visual/scenes/ScenarioDash";
import { ThemeDrivers } from "@/components/visual/scenes/ThemeDrivers";
import { MemoTrace } from "@/components/visual/scenes/MemoTrace";
import { Controls } from "@/components/visual/scenes/Controls";

export const metadata: Metadata = {
  title: "Graphics lab",
  robots: { index: false, follow: false },
};

const ITEMS = [
  { id: "home-hero", page: "Home · Hero", kind: "Layered stack", note: "Question, evidence and answer dealt in depth. The cursor turns the answer into an action.", field: "field-pine", C: DirC },
  { id: "deep-graph", page: "Knowledge Graph · Hero", kind: "Deep graph", note: "Abstract, turning 3D graph. An amber signal travels three hops; crisp tags name each hop.", field: "field-ink", C: DirB },
  { id: "alerts", page: "Alfred · Always-on / Insights · Alerts", kind: "Alert roll", note: "Separate alert cards land at the top and settle down. Anatomy follows the product’s alert format.", field: "field-lake", C: AlertRoll },
  { id: "anatomy", page: "Insights · Anatomy of an insight", kind: "Document with rail", note: "The page moves headline → takeaways → ripple effects → Ask Alfred; the rail marker follows.", field: "field-pine", C: InsightDoc },
  { id: "ranked", page: "Knowledge Graph · See who’s exposed, ranked", kind: "Wide table, cropped", note: "Catalyst on top, ranked assets and transmission paths. The ranking re-sorts as the ripple updates.", field: "field-lake", C: RankTable },
  { id: "drivers", page: "Thematic Exposure · What’s driving a theme", kind: "Card with segmented control", note: "The cursor flips tailwinds and headwinds; big movers and related themes underneath.", field: "field-pine", C: ThemeDrivers },
  { id: "scenario", page: "Scenario & Stress Testing · One scenario", kind: "Dashboard", note: "Stat tiles over a diverging chart. Solid is history, hatched is this scenario. The cursor inspects a sector.", field: "field-mist", C: ScenarioDash },
  { id: "memo", page: "Deep Research · What a memo looks like", kind: "Document + drawer", note: "The cursor selects a figure and opens its calculation in a drawer from the frame edge.", field: "field-mist", C: MemoTrace },
  { id: "controls", page: "Security · Your data, your rules", kind: "Settings table", note: "Per-row policies; one is locked by design. The cursor opens a select and tightens a rule.", field: "field-ink", C: Controls },
];

export default function Lab() {
  return (
    <section data-tone="light" data-bg="#f4f3f1" className="bg-paper pb-32 pt-[calc(var(--header-h)+64px)]">
      <div className="container-x">
        <p className="t-ui text-ink/50">Internal · not indexed</p>
        <h1 className="t-h1 mt-4 max-w-[720px]">Graphics lab</h1>
        <p className="t-lead mt-6 max-w-[640px] text-ink/70">
          One kit, many compositions. Each graphic is mapped to the page and section from the team’s sheet. Comment by name, e.g. “Alert roll: slower, fewer words”.
        </p>

        <div className="mt-16 grid gap-x-8 gap-y-20 lg:grid-cols-2">
          {ITEMS.map(({ id, page, kind, note, field, C }) => (
            <div key={id} id={id}>
              <div className={`grain relative isolate overflow-hidden rounded-[18px] p-5 sm:p-8 ${field}`}>
                <C />
              </div>
              <p className="t-ui mt-5 text-ink/50">{page}</p>
              <h2 className="t-h3 mt-2">{kind}</h2>
              <p className="t-body mt-2 max-w-[520px] text-ink/70">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
