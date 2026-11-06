# Starter prompt

Copy everything inside the block into a new AI coding session. Put the `polished-ui-motion/` folder in the project root first. Fill in the three bracketed lines; the rest works as is.

```text
I want animated, abstracted product-UI illustrations for this site, at the exact style and level of polish defined in ./polished-ui-motion/. Read these first, in full, before writing any code:
- polished-ui-motion/STYLE.md: the spec. Its hard rules (§7) are non-negotiable.
- polished-ui-motion/kit/kit.tsx, kit/anchor.ts and kit/kit.css: the component kit and tokens.
- polished-ui-motion/examples/*.tsx: approved reference scenes. Match their quality, density, spacing and motion; they ARE the standard.
- polished-ui-motion/reference/*.jpg: contact sheets of the finished work.

Project:
- Product: [one or two sentences on what the product does and who it's for]
- Brand: [fonts for UI / serif titles / mono; 3–4 brand colours for the gradient fields; positive and negative colours; one small accent colour]
- Slots: [list each page + section that needs a graphic and the headline or copy beside it, OR "audit the site and list every product mockup slot"]

Setup:
1. Install the kit: copy kit/kit.tsx and kit/anchor.ts to components/visual/, and import kit/kit.css globally (unlayered, after Tailwind). Rebrand only the values marked BRAND in kit.css, and set --font-sans, --font-serif and --font-code to the brand fonts. Dependencies: react, motion, clsx, Tailwind v4.
2. Copy 2–3 of the examples to components/visual/scenes/, then rewrite their content for this product, to prove the kit works in this codebase.

Process (follow STYLE.md §9):
3. Build a private /lab page (template in polished-ui-motion/lab/page.tsx). Put the hero graphic in 2–3 different compositions from STYLE.md §5, using real, plausible content for this product. Stop and show me before going further.
4. After I pick, map every slot to a composition. Vary them per page: no two graphics on a page share a composition. Then build each slot and wire it into the page inside <Field>, keeping each slot's size.
5. QA every graphic: typecheck; run polished-ui-motion/tools/capture.js on each page at 1440 and 390 with times 2,5,9; aim cursors with tools/measure.js; build a contact sheet with tools/contact_sheet.py. Look at the screenshots yourself and fix anything that breaks the STYLE.md §10 checklist before showing me.

Never: ghost or faded background cards; dots, tabs or toggles that change a graphic's state; large areas of accent colour; literal labelled node diagrams; upscaled UI type; flat hairline-only cards; more than ~40 words per state.
```

**Tips**
- Your own reference screenshots (if you have them) go in `polished-ui-motion/reference/`. Say "draw on the style only, never the layouts or content."
- Feedback works best by name: "Alert roll: slower, fewer words." Every time something is rejected, add it to STYLE.md §7 so it never comes back.
