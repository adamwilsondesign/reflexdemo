/**
 * Capture every illustration on a page at several moments of its loop.
 *   node capture.js <url> [widths=1440,390] [times=2,5,9] [outDir=shots]
 * Finds each visible `.grain:has(.rx)` (a Field holding a Canvas), scrolls it into view,
 * waits until each timestamp (seconds since it entered view) and screenshots it.
 * Also reports horizontal overflow and page errors. Needs Playwright + Chromium.
 */
const { chromium } = require("playwright");
const fs = require("fs");
const [, , url, widths = "1440,390", times = "2,5,9", out = "shots"] = process.argv;
if (!url) { console.error("usage: node capture.js <url> [widths] [times] [outDir]"); process.exit(1); }
fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch();
  for (const w of widths.split(",").map(Number)) {
    const p = await b.newPage({ viewport: { width: w, height: 1000 } });
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    await p.goto(url, { waitUntil: "networkidle" });
    const kill = () => p.evaluate(() => document.querySelectorAll('[role=dialog],[aria-label*=ookie]').forEach((e) => e.remove()));
    await kill();
    const loc = p.locator(".grain:has(.rx):visible");
    const n = await loc.count();
    for (let i = 0; i < n; i++) {
      const el = loc.nth(i);
      await el.scrollIntoViewIfNeeded();
      await p.evaluate(() => window.scrollBy(0, -120));
      const t0 = Date.now();
      for (const t of times.split(",").map(Number)) {
        const wait = t * 1000 - (Date.now() - t0);
        if (wait > 0) await p.waitForTimeout(wait);
        await kill();
        await el.screenshot({ path: `${out}/g${String(i).padStart(2, "0")}_${w}_${t}s.png` });
      }
    }
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    console.log(`${w}px: ${n} graphics, scrollWidth ${sw}${sw > w ? "  <-- OVERFLOW" : ""}, ${errs.length} errors ${errs.slice(0, 2).join(" | ")}`);
    await p.close();
  }
  await b.close();
})();
