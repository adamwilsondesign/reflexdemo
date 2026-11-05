"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const KEY = "rfx-cookie-consent";
const EVT = "rfx:cookie-settings";

export function openCookieSettings() {
  window.dispatchEvent(new Event(EVT));
}

/** Compact consent card. Sits bottom-left, never over primary CTAs on mobile (it docks full-width above the fold bottom). */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    const t = stored ? undefined : setTimeout(() => setShow(true), 2600);
    const open = () => {
      setDetails(true);
      setShow(true);
    };
    window.addEventListener(EVT, open);
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener(EVT, open);
    };
  }, []);

  const save = (value: string) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 left-3 right-3 z-[60] max-w-[360px] rounded-xl border border-white/10 bg-[#141518]/95 p-5 text-[#f4f3f1] shadow-2xl backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-auto"
        >
          <p className="t-small text-[#f4f3f1]/75">
            We use cookies to understand how the site is used and to improve it. You can change this at any time.
          </p>
          {details && (
            <label className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 t-small">
              <span>Analytics cookies</span>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics((a) => !a)}
                className={`relative h-5 w-9 rounded-full transition-colors ${analytics ? "bg-lake-500" : "bg-white/20"}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${analytics ? "translate-x-[18px]" : "translate-x-0.5"}`} />
              </button>
            </label>
          )}
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => save(details ? (analytics ? "all" : "essential") : "all")} className="h-9 flex-1 rounded-md bg-[#f4f3f1] font-display text-[14px] font-medium text-ink hover:bg-white">
              {details ? "Save" : "Accept"}
            </button>
            {!details ? (
              <button type="button" onClick={() => setDetails(true)} className="h-9 flex-1 rounded-md border border-white/20 font-display text-[14px] font-medium hover:bg-white/5">
                Manage
              </button>
            ) : (
              <button type="button" onClick={() => save("essential")} className="h-9 flex-1 rounded-md border border-white/20 font-display text-[14px] font-medium hover:bg-white/5">
                Essential only
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
