"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Arrow } from "@/components/ui/Button";
import { DEMO_EXAMPLE_EVENT, FIRM_TYPES, INTEREST_BY_PATH, INTERESTS, ROLES, isFreeMail } from "./options";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  firm: string;
  role: string;
  firmType: string;
  interests: string[];
  notes: string;
};
type Field = "firstName" | "lastName" | "email" | "firm" | "role";
const REQUIRED: Field[] = ["firstName", "lastName", "email", "firm", "role"];
const LABELS: Record<Field, string> = { firstName: "First name", lastName: "Last name", email: "Work email", firm: "Firm", role: "Role" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!v.firstName.trim()) e.firstName = "Enter your first name.";
  if (!v.lastName.trim()) e.lastName = "Enter your last name.";
  if (!v.email.trim()) e.email = "Enter your work email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, like name@firm.com.";
  else if (isFreeMail(v.email.trim()))
    e.email = "That looks like a personal address. Please use your work email so we can route your request to the right team.";
  if (!v.firm.trim()) e.firm = "Enter the name of your firm.";
  if (!v.role) e.role = "Select the role closest to yours.";
  return e;
}

function track(event: string, data: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push({ event, form: "demo-request", ...data });
}

export function DemoForm({ className }: { className?: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const [v, setV] = useState<Values>({ firstName: "", lastName: "", email: "", firm: "", role: "", firmType: "", interests: [], notes: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [source, setSource] = useState("direct");

  const errors = validate(v);
  const show = (f: Field) => (touched[f] || submitted) && errors[f];
  const errorList = REQUIRED.filter((f) => errors[f]);

  // Originating page: ?from= wins, else same-origin referrer path. Pre-select a matching interest.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let from = params.get("from") ?? "";
    if (!from && document.referrer) {
      try {
        const r = new URL(document.referrer);
        if (r.origin === window.location.origin && r.pathname !== "/book-a-demo") from = r.pathname;
        else if (r.origin !== window.location.origin) from = r.hostname;
      } catch {}
    }
    if (from) setSource(from.slice(0, 200));
    const want = [params.get("interest"), INTEREST_BY_PATH[from]].filter((x): x is string => !!x && (INTERESTS as readonly string[]).includes(x));
    if (want.length) setV((s) => ({ ...s, interests: Array.from(new Set([...s.interests, ...want])) }));
  }, []);

  // Example prompts elsewhere on the page can drop text into the optional question field.
  useEffect(() => {
    const onExample = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      setV((s) => ({ ...s, notes: text }));
      formRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => notesRef.current?.focus({ preventScroll: true }), reduce ? 0 : 700);
    };
    window.addEventListener(DEMO_EXAMPLE_EVENT, onExample);
    return () => window.removeEventListener(DEMO_EXAMPLE_EVENT, onExample);
  }, [reduce]);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    if (!started.current) {
      started.current = true;
      track("demo_form_start", { source });
    }
    setV((s) => ({ ...s, [k]: val }));
  };
  const blur = (f: Field) => setTouched((t) => ({ ...t, [f]: true }));
  const toggleInterest = (name: string) =>
    set("interests", v.interests.includes(name) ? v.interests.filter((x) => x !== name) : [...v.interests, name]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setSubmitted(true);
    if (errorList.length) {
      track("demo_form_error", { fields: errorList });
      // Move focus to the summary so screen-reader users hear what needs fixing.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("submitting");
    track("demo_form_submit", { source, interests: v.interests, role: v.role, firmType: v.firmType });
    // Front-end only for the POC: the CRM/HubSpot embed replaces this delay.
    await new Promise((r) => setTimeout(r, 900));
    const q = new URLSearchParams({ name: v.firstName.trim() });
    if (v.interests.length) q.set("interest", v.interests.join(","));
    router.push(`/thank-you?${q.toString()}`);
  };

  const focusField = (f: Field) => document.getElementById(id(f))?.focus();

  return (
    <form
      ref={formRef}
      id="demo-form"
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={id("title")}
      data-form="demo-request"
      className={clsx("scroll-mt-[calc(var(--header-h)+16px)] rounded-[18px] bg-paper p-5 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55),0_0_0_1px_rgb(255_255_255/0.08)] sm:p-7 md:p-8", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id={id("title")} className="font-display text-[22px] font-semibold leading-tight tracking-[-0.015em] md:text-[24px]">
            Request a demo
          </h2>
          <p className="t-small mt-1.5 text-ink/60">Five quick fields. Everything else is optional.</p>
        </div>
        <span className="t-ui mt-1 hidden shrink-0 items-center gap-1.5 rounded-full bg-pine-100 px-2.5 py-1 text-[10.5px] text-pine-700 sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-pine-500" aria-hidden="true" />
          ~1 min
        </span>
      </div>

      <AnimatePresence initial={false}>
        {submitted && errorList.length > 0 && (
          <motion.div
            key="summary"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-5 rounded-[10px] border border-[#b5594a]/30 bg-[#f6e9e5] px-4 py-3 text-[14px] text-[#7d3326] focus:outline-none">
              <p className="font-medium">
                {errorList.length === 1 ? "One field needs attention:" : `${errorList.length} fields need attention:`}
              </p>
              <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                {errorList.map((f) => (
                  <li key={f}>
                    <button type="button" onClick={() => focusField(f)} className="underline decoration-[#7d3326]/40 underline-offset-2 hover:decoration-[#7d3326]">
                      {LABELS[f]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <TextField id={id("firstName")} label="First name" autoComplete="given-name" value={v.firstName} onChange={(x) => set("firstName", x)} onBlur={() => blur("firstName")} error={show("firstName")} />
        <TextField id={id("lastName")} label="Last name" autoComplete="family-name" value={v.lastName} onChange={(x) => set("lastName", x)} onBlur={() => blur("lastName")} error={show("lastName")} />
        <TextField
          id={id("email")}
          label="Work email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@firm.com"
          value={v.email}
          onChange={(x) => set("email", x)}
          onBlur={() => blur("email")}
          error={show("email")}
          className="sm:col-span-2"
        />
        <TextField id={id("firm")} label="Firm" autoComplete="organization" value={v.firm} onChange={(x) => set("firm", x)} onBlur={() => blur("firm")} error={show("firm")} />
        <SelectField id={id("role")} label="Role" value={v.role} onChange={(x) => { set("role", x); blur("role"); }} onBlur={() => blur("role")} error={show("role")} options={ROLES} placeholder="Select your role" />
        <SelectField id={id("firmType")} label="Firm type" optional value={v.firmType} onChange={(x) => set("firmType", x)} options={FIRM_TYPES} placeholder="Select firm type" className="sm:col-span-2" />
      </div>

      <fieldset className="mt-6">
        <legend className="text-[14px] font-medium text-ink">
          What would you like to explore? <span className="font-normal text-ink/50">(optional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((name) => {
            const on = v.interests.includes(name);
            return (
              <label key={name} className="relative">
                <input type="checkbox" name="interests" value={name} checked={on} onChange={() => toggleInterest(name)} className="peer sr-only" />
                <span
                  className={clsx(
                    "inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border px-3 py-[7px] font-display text-[13px] font-medium transition-[background-color,border-color,color] duration-300",
                    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lake-500",
                    on ? "border-lake-700 bg-lake-700 text-white" : "border-ink/15 bg-white text-ink/75 hover:border-ink/35 hover:text-ink",
                  )}
                >
                  <svg viewBox="0 0 12 12" className={clsx("h-3 w-3 transition-transform duration-300", on ? "rotate-0" : "rotate-45")} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    {on ? <path d="M2.5 6.2l2.3 2.3 4.7-5" /> : <path d="M6 2v8M2 6h8" />}
                  </svg>
                  {name}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor={id("notes")} className="block text-[14px] font-medium text-ink">
          Bring a question, watchlist, or example, or we&rsquo;ll provide one. <span className="font-normal text-ink/50">(optional)</span>
        </label>
        <textarea
          ref={notesRef}
          id={id("notes")}
          name="notes"
          rows={3}
          maxLength={1000}
          value={v.notes}
          onChange={(e) => set("notes", e.target.value)}
          aria-describedby={id("notes-hint")}
          placeholder="e.g. Which of my semiconductor names are most exposed to a Taiwan supply disruption?"
          className="mt-2 block w-full resize-y rounded-[10px] border border-ink/15 bg-white px-3.5 py-3 text-[15px] leading-relaxed text-ink placeholder:text-ink/35 transition-colors focus:border-lake-500 focus:outline-none focus:ring-2 focus:ring-lake-500/25"
        />
        <p id={id("notes-hint")} className="mt-2 flex items-start gap-2 text-[13px] text-ink/60">
          <LockIcon className="mt-[2px] h-3.5 w-3.5 shrink-0 text-pine-500" />
          No confidential holdings needed. Public tickers or a sample question work well.
        </p>
      </div>

      {/* Routing context for the CRM */}
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="form" value="demo-request" />

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        data-cta="demo-form-submit"
        className="group relative mt-7 inline-flex h-[52px] w-full items-center justify-center gap-2.5 bg-ink font-display text-[16px] font-medium text-paper transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:bg-lake-900 active:scale-[0.99] disabled:cursor-progress disabled:bg-lake-900"
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" aria-hidden="true" />
            Sending request&hellip;
          </>
        ) : (
          <>
            Request a Demo <Arrow />
          </>
        )}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {status === "submitting" ? "Sending your demo request." : ""}
      </p>

      <div className="mt-5 space-y-2 text-[13px] leading-relaxed text-ink/55">
        <p>
          We&rsquo;ll follow up within one business day to schedule. By submitting, you agree to our{" "}
          <Link href="/privacy" className="text-ink underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          Only after the newsletter?{" "}
          <Link href="/newsletter" className="text-ink underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
            Subscribe separately
          </Link>
          . Trouble with this form?{" "}
          <Link href="/contact" className="text-ink underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
            Contact our team
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

const inputCls =
  "block h-12 w-full rounded-[10px] border bg-white px-3.5 text-[15px] text-ink placeholder:text-ink/35 transition-colors focus:outline-none focus:ring-2";

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-[#9a3f30]">
      <svg viewBox="0 0 14 14" className="mt-[2px] h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <circle cx="7" cy="7" r="6" />
        <path d="M7 3.8v3.6M7 9.6v.2" strokeLinecap="round" />
      </svg>
      {children}
    </p>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  className,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | false;
  type?: string;
  className?: string;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, "autoComplete" | "inputMode" | "placeholder">) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id.split("-").pop()}
        type={type}
        required
        aria-required="true"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={clsx(inputCls, "mt-2", error ? "border-[#b5594a] focus:ring-[#b5594a]/20" : "border-ink/15 focus:border-lake-500 focus:ring-lake-500/25")}
        {...rest}
      />
      {error && <FieldError id={`${id}-err`}>{error}</FieldError>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  options,
  placeholder,
  optional = false,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | false;
  options: readonly string[];
  placeholder: string;
  optional?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label} {optional && <span className="font-normal text-ink/50">(optional)</span>}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          name={id.split("-").pop()}
          value={value}
          required={!optional}
          aria-required={!optional || undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={clsx(
            inputCls,
            "appearance-none pr-10",
            !value && "text-ink/45",
            error ? "border-[#b5594a] focus:ring-[#b5594a]/20" : "border-ink/15 focus:border-lake-500 focus:ring-lake-500/25",
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-ink/50" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </div>
      {error && <FieldError id={`${id}-err`}>{error}</FieldError>}
    </div>
  );
}

export function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="1.5" y="7" width="11" height="8" rx="1.6" />
      <path d="M4 7V4.8a3 3 0 016 0V7" />
    </svg>
  );
}
