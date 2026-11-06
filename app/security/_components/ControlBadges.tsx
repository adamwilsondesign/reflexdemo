import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/**
 * Original badge-style marks for the Enterprise controls grid, drawn in the site's
 * achromatic line style. They are deliberately NOT reproductions of the AICPA SOC
 * logo or any certification body's artwork: a generic seal, a lock mark and a key mark.
 */

const STROKE = "currentColor";

/** Circular seal: double ring, ticked bezel, "SOC 2" centre and "Type II" ribbon. */
function SocSeal() {
  const C = 48;
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const t = (i / 48) * Math.PI * 2;
    const r1 = 40, r2 = i % 4 === 0 ? 37 : 38.5;
    return (
      <line
        key={i}
        x1={Math.round((C + Math.cos(t) * r1) * 100) / 100}
        y1={Math.round((C + Math.sin(t) * r1) * 100) / 100}
        x2={Math.round((C + Math.cos(t) * r2) * 100) / 100}
        y2={Math.round((C + Math.sin(t) * r2) * 100) / 100}
      />
    );
  });
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" fill="none" aria-hidden="true">
      <circle cx={C} cy={C} r={46} stroke={STROKE} strokeWidth={1.25} />
      <circle cx={C} cy={C} r={42} stroke={STROKE} strokeOpacity={0.5} strokeWidth={1} />
      <g stroke={STROKE} strokeOpacity={0.55} strokeWidth={0.8}>{ticks}</g>
      <circle cx={C} cy={C} r={33} stroke={STROKE} strokeWidth={1} />
      <text x={C} y={46} textAnchor="middle" fill={STROKE} style={{ fontFamily: "var(--font-archivo)", fontSize: 15, fontWeight: 700, letterSpacing: 0.5 }}>SOC 2</text>
      <line x1={30} y1={53} x2={66} y2={53} stroke={STROKE} strokeOpacity={0.5} strokeWidth={0.8} />
      <text x={C} y={64} textAnchor="middle" fill={STROKE} style={{ fontFamily: "var(--font-archivo)", fontSize: 8.5, fontWeight: 600, letterSpacing: 1.4 }}>TYPE II</text>
      <path d="M40 74l3 3 6-6" stroke={STROKE} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" transform="translate(3 0)" />
    </svg>
  );
}

/** Encryption mark: hexagonal badge with a padlock and a dotted cipher line. */
function EncryptionMark() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" fill="none" aria-hidden="true">
      <path d="M48 3l39 22.5v45L48 93 9 70.5v-45z" stroke={STROKE} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M48 9l33.8 19.5v39L48 87 14.2 67.5v-39z" stroke={STROKE} strokeOpacity={0.5} strokeWidth={1} strokeLinejoin="round" />
      <path d="M38 44v-7a10 10 0 0120 0v7" stroke={STROKE} strokeWidth={1.4} />
      <rect x={33} y={44} width={30} height={22} rx={3} stroke={STROKE} strokeWidth={1.4} />
      <circle cx={48} cy={53} r={2.6} fill={STROKE} />
      <line x1={48} y1={55.5} x2={48} y2={60} stroke={STROKE} strokeWidth={1.4} strokeLinecap="round" />
      <line x1={24} y1={74} x2={72} y2={74} stroke={STROKE} strokeOpacity={0.55} strokeWidth={1} strokeDasharray="2 3" />
    </svg>
  );
}

/** Access mark: shield badge with a key whose bit is cut as permission steps. */
function AccessMark() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" fill="none" aria-hidden="true">
      <path d="M48 3l38 12v30c0 23-16 40-38 48C26 85 10 68 10 45V15z" stroke={STROKE} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M48 9.5l32 10.1V45c0 19.6-13.4 34.3-32 41.5C29.4 79.3 16 64.6 16 45V19.6z" stroke={STROKE} strokeOpacity={0.5} strokeWidth={1} strokeLinejoin="round" />
      <circle cx={36} cy={46} r={9} stroke={STROKE} strokeWidth={1.4} />
      <circle cx={36} cy={46} r={3} stroke={STROKE} strokeWidth={1.2} />
      <path d="M45 46h22v7M60 46v5M54 46v3" stroke={STROKE} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CONTROLS = [
  { mark: <SocSeal />, title: "SOC 2 Type II", body: "Reflexivity’s security controls undergo annual independent audits." },
  { mark: <EncryptionMark />, title: "Encryption", body: "Customer data is encrypted in transit to protect sensitive information." },
  { mark: <AccessMark />, title: "Permission-aware access", body: "Access to connected sources respects your firm’s existing permissions." },
];

/** Hairline grid like FeatureGrid, with a badge mark in place of the icon. */
export function ControlBadges({ className }: { className?: string }) {
  return (
    <Stagger className={`grid border-l border-t border-white/15 md:grid-cols-3 ${className ?? ""}`}>
      {CONTROLS.map((c) => (
        <StaggerItem key={c.title} className="h-full">
          <div className="flex h-full flex-col border-b border-r border-white/15 p-8 md:p-10">
            <div className="h-20 w-20 text-paper md:h-24 md:w-24">{c.mark}</div>
            <h3 className="t-h3 mt-10 md:mt-12">{c.title}</h3>
            <p className="t-small mt-4 max-w-[340px] text-paper/70">{c.body}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
