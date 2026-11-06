"use client";

import clsx from "clsx";
import { StateTabs } from "./StateTabs";
import { Pill, Stage } from "@/components/product/ui";
import { Chain, MockPanel, Row, StepDots, useCycle } from "@/components/product/motion";

/** Every visual: one fixed-height panel, centred on its Stage. Same size across states and tabs. */
const PANEL_H = 232;

function Board({ field, children }: { field: "lake" | "pine" | "ink"; children: React.ReactNode }) {
  return (
    <Stage field={field} className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-[380px]">{children}</div>
    </Stage>
  );
}

/** Static: one environment, its contents, an "Isolated" badge. */
function Isolation() {
  return (
    <Board field="lake">
      <MockPanel height={PANEL_H}>
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold text-[#0d0d0d]">Your firm</span>
          <Pill>Isolated</Pill>
        </div>
        <div className="mt-3">
          <Row label="Research and saved work" dot />
          <Row label="Uploaded documents" dot />
          <Row label="Connected sources" dot />
          <Row label="Prompts and outputs" dot />
        </div>
      </MockPanel>
    </Board>
  );
}

/** One motion idea: a single source is switched off by the admin, then back on. */
function Connections() {
  const [i, ref, set] = useCycle(2, { ms: 4800, finalForReduced: 1 });
  const revoked = i === 1;
  const Toggle = ({ on }: { on: boolean }) => (
    <span role="img" aria-label={on ? "Connected" : "Not connected"} className={clsx("relative inline-block h-5 w-9 rounded-full transition-colors duration-500", on ? "bg-[#0d0d0d]" : "bg-[#e6e6e6]")}>
      <span className={clsx("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-[left] duration-500", on ? "left-[18px]" : "left-0.5")} />
    </span>
  );
  return (
    <Board field="pine">
      <div ref={ref}>
        <MockPanel height={PANEL_H}>
          <p className="text-[16px] font-semibold text-[#0d0d0d]">Connected sources</p>
          <div className="mt-3">
            <Row label="Document library" value={<Toggle on />} />
            <Row label="Research notes" value={<Toggle on={!revoked} />} strong={revoked} />
            <Row label="Email archive" value={<Toggle on={false} />} />
          </div>
          <p className={clsx("mt-3 text-[13px] text-[#5d5d5d] transition-opacity duration-500", revoked ? "opacity-100" : "opacity-0")}>Access revoked by your admin</p>
        </MockPanel>
        <StepDots count={2} active={i} onSelect={set} />
      </div>
    </Board>
  );
}

/** One motion idea: a short chain draws in, ending with the data cleared. */
function Retention() {
  return (
    <Board field="ink">
      <MockPanel height={PANEL_H}>
        <p className="text-[13px] text-[#8f8f8f]">Data lifecycle</p>
        <div className="mt-3">
          <Chain nodes={["Request received", "Response delivered", "Client data not persisted"]} step={1.2} />
        </div>
      </MockPanel>
    </Board>
  );
}

/** Static: your data, and model training marked as excluded. */
function NeverTrained() {
  return (
    <Board field="lake">
      <MockPanel height={PANEL_H}>
        <p className="text-[13px] text-[#8f8f8f]">Your firm&rsquo;s data</p>
        <p className="mt-1 text-[16px] font-semibold text-[#0d0d0d]">Prompts, documents, outputs</p>
        <div className="mt-4">
          <Row label="Reflexivity models" value={<Pill>Not trained</Pill>} />
          <Row label="Third-party model providers" value={<Pill>Not trained</Pill>} />
        </div>
      </MockPanel>
    </Board>
  );
}

export function DataProtection() {
  return (
    <StateTabs
      idPrefix="protect"
      frameClassName="h-[400px] sm:h-[440px]"
      interval={9600}
      items={[
        { title: "Client isolation", body: "Customer data and research remain isolated from other client environments.", visual: <Isolation /> },
        { title: "Controlled connections", body: "Your firm controls which sources Reflexivity can connect to and can revoke access at any time.", visual: <Connections /> },
        { title: "Limited data retention", body: "Reflexivity does not persistently store client data, minimizing exposure of sensitive information.", visual: <Retention /> },
        { title: "Never trained on your data", body: "Your prompts, documents, connected data, and outputs are never used to train Reflexivity’s models or those of third-party providers.", visual: <NeverTrained /> },
      ]}
    />
  );
}
