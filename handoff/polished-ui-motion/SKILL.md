---
name: polished-ui-motion
description: Build animated, abstracted product-UI illustrations for marketing sites (white cards with soft layered shadows on lit brand gradients, small refined type, a cursor or the data acting out one idea). Use when asked to create, redesign or roll out product mockups, UI illustrations, hero graphics or feature animations, or to match this "polished UI motion" style in a React/Next.js + Tailwind project.
---

# Polished UI Motion

Use this skill to produce product-UI illustrations at a proven level of polish. Everything you need is in this folder.

## Read first (always, in full)
1. `STYLE.md`: the spec. §7 hard rules are non-negotiable; §5 is the composition catalogue; §6 is the motion grammar.
2. `kit/kit.tsx`, `kit/anchor.ts`, `kit/kit.css`: the kit (Canvas, Field, useTimeline, useTyped, Cursor, primitives) and tokens.
3. `examples/*.tsx`: approved scenes. Match them.
4. `reference/*.jpg`: what finished work looks like.

## Install into the target project
- Copy `kit/kit.tsx` and `kit/anchor.ts` to `components/visual/`. Import `kit/kit.css` globally, unlayered, after Tailwind.
- Rebrand only the values marked BRAND in `kit.css` (fields, accent, up/down). Map `--font-sans`, `--font-serif` and `--font-code` to the brand fonts.
- Needs react, `motion` (motion/react), `clsx`, and Tailwind v4 (arbitrary values are used).
- Put scenes in `components/visual/scenes/<UniqueName>.tsx`. Render them as `<Field field="primary|secondary|light|dark"><Scene /></Field>`.

## Workflow
1. **Ground in the product.** Read the page copy beside each slot. Content must be real, plausible and tied to that copy, with one idea per graphic.
2. **Lab first.** Build `/lab` (template: `lab/page.tsx`) with 2–3 compositions for the hero. Show the user and wait for a pick before rolling out.
3. **Map slots to compositions** (§5), varied per page. Reuse approved scenes where they fit.
4. **Build each scene.**
   - Canvas: fixed design canvas (default 560×480).
   - Timeline: a phase timeline that follows arrive → act → resolve → hold → release.
   - Cards: one `rx-card rx-card-lift` focal card; other cards are crisp `rx-card`.
   - Cursor: aim with `useAnchor` or `tools/measure.js`.
   - Reduced motion: set `still` to the most informative phase.
5. **QA.**
   - Typecheck.
   - Run `node tools/capture.js <url> 1440,390 2,5,9 <dir>`, then `python3 tools/contact_sheet.py <dir>`.
   - Look at every frame against the STYLE.md §10 checklist and fix what fails before reporting.
6. **Feedback loop.** When the user rejects something, add it to STYLE.md §7.

## Never
- Ghost, faded or blurred background cards.
- Dots, tabs or toggles that change a graphic's state.
- Accent colour on lines, fills or large areas.
- Literal labelled node diagrams.
- UI scaled above ~1.1×.
- Flat hairline-only cards.
- More than about 40 words per state.
- The same composition twice on one page.
