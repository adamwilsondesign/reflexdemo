import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/** Headline + lead for a narrow column (SectionHeader halves its container, too tight inside a 5-col column). */
export function ColHeader({ title, lead, onDark = false, size = "h2" }: { title: string; lead?: React.ReactNode; onDark?: boolean; size?: "h1" | "h2" }) {
  return (
    <div className="max-w-[520px]">
      <SplitText text={title} className={size === "h1" ? "t-h1" : "t-h2"} />
      {lead && (
        <Reveal delay={0.15}>
          <p className={onDark ? "t-lead mt-5 text-paper/75" : "t-lead mt-5 text-ink/72"}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
