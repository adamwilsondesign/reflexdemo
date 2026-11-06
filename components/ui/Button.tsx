import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-display text-[16px] font-medium leading-none transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "h-12 px-6 bg-ink text-paper hover:bg-lake-900",
  secondary: "h-12 px-6 border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  light: "h-12 px-6 bg-paper text-ink hover:bg-white",
  "outline-light": "h-12 px-6 border border-paper/70 text-paper hover:bg-paper hover:text-ink",
  ghost: "h-auto px-0 text-current",
};

export function Arrow({ className }: { className?: string }) {
  return (
    <span className={clsx("relative inline-block h-[12px] w-[14px] overflow-hidden", className)} aria-hidden="true">
      <svg viewBox="0 0 14 12" className="absolute inset-0 h-full w-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[140%]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M0 6h12M7.5 1.5L12 6l-4.5 4.5" />
      </svg>
      <svg viewBox="0 0 14 12" className="absolute inset-0 h-full w-full -translate-x-[140%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M0 6h12M7.5 1.5L12 6l-4.5 4.5" />
      </svg>
    </span>
  );
}

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  /** analytics context, e.g. "home-hero" */
  cta?: string;
};

export function Button({ href, children, variant = "primary", arrow = false, className, cta }: Props) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = clsx(base, variants[variant], variant === "ghost" && "link-underline pb-1", className);
  const inner = (
    <>
      <span className="relative">{children}</span>
      {arrow && <Arrow />}
    </>
  );
  if (external)
    return (
      <a href={href} className={cls} data-cta={cta}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls} data-cta={cta}>
      {inner}
    </Link>
  );
}

/** Primary conversion pair used across the site. Label stays consistent: "Request a Demo". */
export function DemoActions({
  secondary,
  onDark = false,
  cta,
  className,
}: {
  secondary?: { label: string; href: string };
  onDark?: boolean;
  cta?: string;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-wrap items-center gap-4", className)}>
      <Button href="/book-a-demo" variant={onDark ? "light" : "primary"} arrow cta={cta}>
        Request a Demo
      </Button>
      {secondary && (
        <Button href={secondary.href} variant={onDark ? "outline-light" : "secondary"}>
          {secondary.label}
        </Button>
      )}
    </div>
  );
}
