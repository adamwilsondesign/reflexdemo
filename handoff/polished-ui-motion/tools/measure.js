/**
 * Print canvas-space coordinates of elements inside an illustration, to aim the Cursor.
 *   node measure.js <url> <fieldIndex> "<text1>" ["<text2>" ...] [--wait=4000]
 * For each text, finds the smallest element containing it inside the Nth Field's canvas and prints
 * [x, y, w, h] and its centre in DESIGN pixels (unscaled), i.e. the numbers to pass to <Cursor x y />.
 * Remember the cursor tip is ~(2,2) px from its top-left.
 */
const { chromium } = require("playwright");
const args = process.argv.slice(2);
const wait = +(args.find((a) => a.startsWith("--wait="))?.slice(7) ?? 4000);
const [url, idx, ...texts] = args.filter((a) => !a.startsWith("--"));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto(url, { waitUntil: "networkidle" });
  const field = p.locator(".grain:has(.rx):visible").nth(+idx);
  await field.scrollIntoViewIfNeeded();
  await p.waitForTimeout(wait);
  const res = await field.evaluate((f, texts) => {
    const root = f.querySelector(".rx > div"); const r0 = root.getBoundingClientRect(); const s = r0.width / root.offsetWidth;
    return texts.map((t) => {
      const els = [...root.querySelectorAll("*")].filter((e) => e.textContent.includes(t));
      const e = els.sort((a, b) => a.textContent.length - b.textContent.length)[0];
      if (!e) return [t, "not found"];
      const r = e.getBoundingClientRect();
      const box = [(r.left - r0.left) / s, (r.top - r0.top) / s, r.width / s, r.height / s].map(Math.round);
      return [t, box, "centre", [Math.round(box[0] + box[2] / 2), Math.round(box[1] + box[3] / 2)]];
    });
  }, texts);
  res.forEach((r) => console.log(JSON.stringify(r)));
  await b.close();
})();
