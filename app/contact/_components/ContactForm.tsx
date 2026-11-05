"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Arrow } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export const TOPICS = [
  { value: "partnerships", label: "Partnerships & distribution", next: "Our partnerships team will reply, usually with a short call to scope surfaces, data and distribution." },
  { value: "technical", label: "Technical discovery (API, MCP, feeds)", next: "An engineer will follow up to set up a technical discovery call and share documentation." },
  { value: "security", label: "Security review & due diligence", next: "Our security team will follow up on your questionnaire or documentation request." },
  { value: "press", label: "Press & media", next: "Our communications team will get back to you about your request." },
  { value: "reference", label: "Customer reference", next: "We’ll get in touch to understand your firm and arrange a relevant reference conversation." },
  { value: "other", label: "Something else", next: "We’ll route your note to the right person and reply by email." },
] as const;

type Topic = (typeof TOPICS)[number]["value"];
type Fields = { name: string; email: string; company: string; topic: Topic | ""; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|icloud|aol|proton|protonmail)\./i;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "That email address doesn’t look right.";
  if (!f.company.trim()) e.company = "Please enter your company.";
  if (!f.topic) e.topic = "Choose what your message is about.";
  if (f.message.trim().length < 20) e.message = "Tell us a little more (at least 20 characters).";
  return e;
}

function isTopic(v: string | null): v is Topic {
  return !!v && TOPICS.some((t) => t.value === v);
}

/** Front-end-only contact form. Topic is pre-filled from `?topic=`; validates inline; shows a success state. */
export function ContactForm() {
  const params = useSearchParams();
  const qTopic = params.get("topic");
  const reduce = useReducedMotion();
  const id = useId();

  const [f, setF] = useState<Fields>({ name: "", email: "", company: "", topic: isTopic(qTopic) ? qTopic : "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // follow client-side navigations such as /contact?topic=press#form
  useEffect(() => {
    if (isTopic(qTopic)) setF((s) => ({ ...s, topic: qTopic }));
  }, [qTopic]);

  const errors = validate(f);
  const show = (k: keyof Fields) => (submitted || touched[k]) && errors[k];
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((s) => ({ ...s, [k]: e.target.value }));
  const blur = (k: keyof Fields) => () => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(f);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 700);
  };

  const topic = TOPICS.find((t) => t.value === f.topic);

  const field = (k: keyof Fields) =>
    clsx(
      "mt-2 block w-full rounded-[10px] border bg-white px-4 py-3 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink/35 focus:border-ink/60 focus:ring-4 focus:ring-lake-100",
      show(k) ? "border-[#9a4b3c]" : "border-ink/15",
    );

  const err = (k: keyof Fields) => (
    <AnimatePresence initial={false}>
      {show(k) && (
        <motion.p
          id={`${id}-${k}-err`}
          initial={reduce ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mt-1.5 overflow-hidden text-[13px] text-[#9a4b3c]"
        >
          {errors[k]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const aria = (k: keyof Fields) => ({
    id: `${id}-${k}`,
    "aria-invalid": show(k) ? true : undefined,
    "aria-describedby": show(k) ? `${id}-${k}-err` : undefined,
    onBlur: blur(k),
    onChange: set(k),
    value: f[k],
  });

  return (
    <div className="rounded-[18px] border border-ink/10 bg-white/70 p-6 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            role="status"
            aria-live="polite"
            className="py-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pine-100 text-pine-700">
              <svg viewBox="0 0 16 16" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-6.5" />
              </svg>
            </span>
            <h3 className="t-h2 mt-8">Thanks, {f.name.trim().split(" ")[0]}. Your message is with us.</h3>
            <p className="t-body mt-4 max-w-[520px] text-ink/70">{topic?.next} We’ll reply to {f.email.trim()}.</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/platform" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">Explore the Platform</span> <Arrow />
              </Link>
              <Link href="/deployment" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium text-ink/70">
                <span className="link-underline">Deployment options</span> <Arrow />
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} aria-label="Contact Reflexivity">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="font-display text-[14px] font-semibold">Name</label>
                <input type="text" autoComplete="name" className={field("name")} {...aria("name")} />
                {err("name")}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="font-display text-[14px] font-semibold">Work email</label>
                <input type="email" autoComplete="email" inputMode="email" className={field("email")} {...aria("email")} />
                {err("email")}
                {!show("email") && FREE_MAIL.test(f.email) && <p className="mt-1.5 text-[13px] text-ink/50">A work address helps us route this faster.</p>}
              </div>
              <div>
                <label htmlFor={`${id}-company`} className="font-display text-[14px] font-semibold">Company</label>
                <input type="text" autoComplete="organization" className={field("company")} {...aria("company")} />
                {err("company")}
              </div>
              <div>
                <label htmlFor={`${id}-topic`} className="font-display text-[14px] font-semibold">Topic</label>
                <div className="relative">
                  <select className={clsx(field("topic"), "appearance-none pr-10", !f.topic && "text-ink/45")} {...aria("topic")}>
                    <option value="" disabled>
                      Choose a topic
                    </option>
                    {TOPICS.map((t) => (
                      <option key={t.value} value={t.value} className="text-ink">
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 10 6" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-1.5 w-2.5 text-ink/50" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                </div>
                {err("topic")}
              </div>
              <div className="md:col-span-2">
                <label htmlFor={`${id}-message`} className="font-display text-[14px] font-semibold">Message</label>
                <textarea rows={5} className={clsx(field("message"), "resize-y")} placeholder="What would you like to talk about?" {...aria("message")} />
                {err("message")}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="t-small max-w-[380px] text-ink/50">
                Looking to see the product? <Link href="/book-a-demo" className="link-underline text-ink">Request a demo</Link> instead. Existing customer? Visit the{" "}
                <a href="https://support.reflexivity.com" className="link-underline text-ink">Help Center</a>.
              </p>
              <button
                type="submit"
                disabled={sending}
                className="group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-ink px-6 font-display text-[16px] font-medium text-paper transition-colors duration-300 hover:bg-lake-900 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message"}
                {!sending && <Arrow />}
              </button>
            </div>
            <p className="mt-6 text-[12px] text-ink/45">
              By sending this form you agree to our <Link href="/privacy" className="link-underline">Privacy Policy</Link>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
