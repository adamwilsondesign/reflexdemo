import { CountUp } from "@/components/ui/CountUp";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";

const ITEMS: { value: React.ReactNode; label: string; note: string }[] = [
  { value: <CountUp to={40000} />, label: "Securities mapped", note: "Listed securities resolved to entities" },
  { value: <CountUp to={600} suffix="K+" />, label: "Evidence-backed relationships", note: "Weighted links with supporting sources" },
  { value: <CountUp to={47} />, label: "Global markets", note: "Markets with mapped securities" },
  {
    value: <span className="flex h-[36px] items-center"><PrecisionIcon name="loop" className="h-8 w-8 text-paper" /></span>,
    label: "Updated as evidence arrives",
    note: "Relationships change as new documents are processed",
  },
];

/** Coverage metrics for the pine concept block. Values stay at or under 36px. */
export function Coverage() {
  return (
    <div className="mt-10">
      <ul className="grid grid-cols-2 border-t border-white/20">
        {ITEMS.map((s, i) => (
          <li key={s.label} className={i % 2 === 0 ? "border-b border-white/20 py-6 pr-5" : "border-b border-l border-white/20 py-6 pl-5"}>
            <p className="font-display text-[28px] font-semibold leading-none tracking-[-0.02em] md:text-[34px]">{s.value}</p>
            <p className="mt-3 font-display text-[14px] font-medium text-paper/90">{s.label}</p>
            <p className="t-small mt-1 text-paper/60">{s.note}</p>
          </li>
        ))}
      </ul>
      <p className="t-small mt-4 text-paper/55">Coverage figures as of November 2026.</p>
    </div>
  );
}
