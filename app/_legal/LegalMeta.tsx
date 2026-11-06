/** Last-updated line + actions for legal heroes. `updated` is the verbatim line from the document. */
export function LegalMeta({ updated, iso, children }: { updated: string | null; iso: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-6">
      {updated && (
        <p className="inline-flex items-center gap-4 rounded-full border border-ink/12 bg-white/60 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.05em] text-ink/70">
          <span className="h-1.5 w-1.5 rounded-full bg-pine-500" aria-hidden="true" />
          Last updated <time dateTime={iso}>{updated.replace(/^Updated\s+/, "")}</time>
        </p>
      )}
      {children && <div className="flex flex-wrap items-center gap-4">{children}</div>}
    </div>
  );
}
