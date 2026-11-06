import { SourceLedger } from "@/components/visual/scenes/SourceLedger";

/** Hero visual: each cited figure in an answer maps to its licensed provider. */
export function SourceMap() {
  return (
    <div aria-hidden="true">
      <SourceLedger />
    </div>
  );
}
