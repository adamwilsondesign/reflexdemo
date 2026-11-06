# Polished UI Motion: style spec

This spec covers animated, abstracted product-UI illustrations for marketing sites: small, quiet "screens" that show what a product does, acted out by the UI itself. It was distilled from a production build that a client signed off after several rounds. It records what made the work read as premium, and the mistakes that made earlier rounds read as bland, generic or "AI-made".

The look in one sentence: **crisp white cards with soft, layered light, floating on a lit brand gradient; small, precise type; one focal moment per graphic, acted out by a cursor or by the data itself.**

---

## 1. Principles

1. **Illustrate, don't screenshot.** Show one idea from the product, simplified until a stranger gets it in three seconds. A graphic is not a product tour.
2. **One focal card.** Every composition has exactly one hero card (`rx-card rx-card-lift`). Everything else supports it.
3. **The UI acts out the story.** State changes happen inside the UI: a cursor clicks, a menu opens, a row checks off, a toast lands, a list re-sorts, a path draws, a section scrolls. There are never controls outside the UI to change what it shows.
4. **Refined, not decorated.** Polish comes from spacing, type, elevation and timing, not from colour, gradients inside cards, icons or effects.
5. **Brand lives in the field and the details.** The gradient behind, the type pairing, the number font, the entity glyphs and one tiny accent carry the brand. The cards stay white and quiet.
6. **Vary the composition.** Every graphic on a page uses a different layout type (see §5). A system shows its range.

---

## 2. Anatomy

```
Field (brand gradient + grain, 18px radius, padding 20–32px)
└─ Canvas (fixed design size, default 560×480, scaled to fit)
   ├─ focal card      .rx-card.rx-card-lift   ← the one thing to look at
   ├─ support cards   .rx-card                ← crisp, fully opaque, may be cropped at the frame edge
   ├─ transient UI    menus, popovers, toasts ← appear and leave as the story needs
   └─ Cursor          (optional)              ← moves, presses, never loiters
```

- **Field**: a lit brand gradient (a light bloom top-left, a deep tone bottom-right, a base linear) with 8% film grain. Use 3–4 fields per brand: two mid-tones, one light, one dark. Alternate them down a page.
- **Canvas**: compositions are absolutely positioned on a fixed design canvas, so they are pixel-exact.
  - **Scaling**: it scales to the slot, but never above `maxScale` (1.12) so UI type stays at its designed size; in larger slots the canvas centres instead.
  - **Phones**: it never drops below `minScale` (0.74). On phones it crops at the frame edge around `focusX`. For left-aligned text, set `focusX` to about 0.25 so the left edge survives.

---

## 3. Tokens

| Token | Use |
|---|---|
| `--rx-ink` `#17191c` | primary text, dark buttons, selected radio |
| `--rx-2` `#5b6068` | secondary text |
| `--rx-3` `#959aa1` | meta, labels, timestamps |
| `--rx-line` 8% ink | hairlines inside cards |
| `--rx-well` `#f4f3f0` | chips, input wells, selected or hovered rows, stat tiles |
| `--rx-signal` | **tiny** accent: 2px markers, one active citation chip, one highlight. Never lines, fills or large areas. |
| `--rx-up` / `--rx-down` | positive and negative numbers, tailwind and headwind |

**Elevation.** Cards use a 4-layer shadow: a 1px hairline ring, a contact shadow, a mid shadow and a wide ambient shadow. Tint the shadows toward the brand's darkest hue. The focal card gets the deeper "lift" variant. No borders beyond the ring, and no inner gradients.

**Radii.** Cards 14px; controls inside cards 7–10px; chips 5–7px; avatars and status dots fully round.

---

## 4. Type

| Role | Face | Size | Notes |
|---|---|---|---|
| Card title | brand serif (`rx-serif`) | 16–22px | One per card at most. It is the "editorial" moment that makes the UI feel bespoke. |
| UI text | brand grotesk | 12–14px | Medium (500) for names and actions, regular for the rest |
| Meta / labels | grotesk | 10.5–11.5px | `--rx-3`, sentence case, never all caps except tiny legend labels |
| Numbers, tickers, code, times | mono (`rx-num`) | 10.5–12px | tabular figures, so numbers align and animate without jitter |

**Words.** At most about 40 visible words per state, and one idea per graphic. Use real, plausible domain content tied to the copy beside the slot. Never use lorem ipsum, and never invent claims about real companies.

---

## 5. Composition catalogue

Pick a different one for each slot on a page. Each pairs a layout with its natural motion.

| # | Composition | Natural motion | Good for |
|---|---|---|---|
| 1 | **Layered stack**: question, evidence and answer cards dealt in depth | cards deal in; cursor clicks an action; toast confirms | hero, "how it works" |
| 2 | **Composer + dropdown**: input card with a mode, source or @-mention menu | text types; cursor opens the menu, picks, sends | AI and assistant features |
| 3 | **Run checklist**: steps with status chips (Queued → Running → Done) | steps resolve one by one; plan folds into a summary | agents, pipelines, long jobs |
| 4 | **Alert roll**: separate notification cards stacking | a new card lands on top; the rest settle down a slot | monitoring, always-on |
| 5 | **Toasts over a focal list**: e.g. a watchlist with notifications | toast lands; matching row gets a 2px marker | alerts tied to holdings or items |
| 6 | **Document with section rail** | page scrolls by section; rail marker follows | anatomy of a report |
| 7 | **Document + highlighted span + context menu** | cursor drags a highlight; menu opens; drawer slides in | provenance, audit, citations |
| 8 | **Figure card + source popover** | cursor clicks a citation chip; the source passage appears | "every number is traceable" |
| 9 | **Wide table cropped at the frame edge** | rows arrive, then re-sort (layout animation) | rankings, screens, live data |
| 10 | **Dashboard**: stat tiles over a chart; hatched = projection or unknown | bars grow; cursor hovers; tooltip | analytics, scenarios |
| 11 | **Card with segmented control** | cursor flips the segment; list slides | two sides of one thing |
| 12 | **Settings table with per-row selects** | cursor opens a select, picks a stricter value; row flashes | security, permissions |
| 13 | **Access or activity log** | rows land on top; one denied, so a toast | audit, compliance |
| 14 | **Timeline with entity and citation chips** | entries land on a rail | workflows, history, a closed loop |
| 15 | **Expandable tree** | cursor opens nodes level by level | hierarchies, exposure chains |
| 16 | **Radio or selection list + preview card** | cursor picks; preview updates | segments, personas, plans |
| 17 | **Inbox + reading pane** | item lands; cursor opens it; pane slides in | newsletters, briefs, routing |
| 18 | **Calendar or event card + agenda checklist** | agenda items check off; status pill updates | demos, bookings |
| 19 | **Form or config card**: scheduled question with a week strip | the day's run spins and checks; toast | automation, scheduling |
| 20 | **Code / API card** | request types; status flips to 200; JSON streams | developer, integrations |
| 21 | **Deep graph** (abstract 3D network on canvas) | slow rotation; a pale signal travels three hops; tags appear only on the path | knowledge graphs, networks |
| 22 | **Clustered constellation** + small crisp legend | highlight spreads category by category; counts tick up | category relationships |
| 23 | **Mini cards** (≈340×200) in a row of feature cards | one tiny action each | "works where you do" rows |

**Graphs stay abstract.** Network views must be dense and deep (hundreds of nodes, orbit rings, depth by size and brightness), never a literal labelled node diagram. Labels appear only as small crisp tags on the traced path.

---

## 6. Motion grammar

Every graphic is a **phase timeline** (`useTimeline([ms, ms, …], { still })`). Its standard shape:

1. **Arrive** (0.6–1s): the focal card rises 12–16px and fades in. Support cards deal in after it, staggered.
2. **Act** (1–3.5s per beat): one thing happens per beat. Typing runs at 30–38ms a character; the cursor travels on a soft spring (stiffness 70, damping 18). A press is a 0.15s scale to 0.86 plus a ripple.
3. **Resolve** (1–2s): the consequence lands, such as a toast, a re-sort, a drawer, a check or a status change.
4. **Hold** (3–4.5s): let it be read. This is the frame people remember.
5. **Release** (0.6–0.8s): a soft fade or reset, then loop.

**Rules:**
- **Ease:** expo-out `[0.22, 1, 0.36, 1]` for movement; springs for indicators that slide (segmented control: stiffness 380, damping 34).
- **Layout changes** (re-sorts, folding plans) use `layout` animations, never jumps.
- **Content swaps** crossfade in place (both layers absolutely positioned). Never use `AnimatePresence mode="popLayout"` for these; it causes a visible jump.
- **Cursor targets** must be exact: measure with `useAnchor` (kit/anchor.ts) or `tools/measure.js`, never guess. The tip sits about 2px from the cursor's top-left. Hide the cursor when it has nothing to do.
- **Off-screen:** animations pause (`useTimeline` handles this via `useInView`).
- **Reduced motion:** show the single most informative phase (`still`).
- **No parallax** on the illustrations.

---

## 7. Hard rules (each one came from client rejection)

1. **No ghost cards.** Never use faint, blurred or semi-transparent "context" cards in the background. Every card is crisp and fully opaque. Cropping a card at the frame edge is fine; fading it is not. Fades only happen during a transition, never as a resting state.
2. **No external state controls.** No step dots, pagination tabs, progress toggles or arrows under or around a graphic. The UI acts out its own state.
3. **The accent is tiny.** If the accent colour covers more than a few pixels, such as a line, a node fill or a big highlight, it reads off-brand. Use white or pale brand tones for paths and glows on dark fields.
4. **Abstract graphs.** No literal labelled node-and-edge diagrams (§5).
5. **Vary compositions** within a page, and don't reuse the same composition on two pages unless it's a deliberate echo.
6. **Keep it light.** If a graphic needs a paragraph to explain it, cut it. Lead with one section, three takeaways, three rows.
7. **Never upscale UI.** Keep `maxScale` at about 1.1. Type rendered at 18–24px reads coarse and cheap.
8. **No flat hairline-only cards.** The round of flat, achromatic, no-shadow cards was called "bland, boring, generic". Elevation and light are the polish.

---

## 8. Responsive and accessibility

- **Canvas defaults:** 560×480; use 560×400 for short slots, 440×410 for narrow heroes and 340×200 for minis. Don't put a wide canvas (≥ 800) in a half-width slot.
- **Phones:** the canvas holds at least 0.74 scale and crops; set `focusX` per scene.
- **Screen readers:** mark the illustration `aria-hidden` (or role="img" with a label), and keep the real copy as text in the page. If a graphic replaced an interactive control, keep its information as a static list beside it.
- **Contrast:** meta text sits on white only (`--rx-3` on white passes for non-essential labels). Put essential numbers in `--rx-ink` or `--rx-up` / `--rx-down`.

---

## 9. Process that worked

1. **Collect references** (10–30 screenshots of products you admire). Extract style only, never layouts or content.
2. **Build a lab page** (`/lab`, noindex) with 2–3 directions of one hero graphic on the kit. Get a pick plus annotated notes. Iterate there, not across the whole site.
3. **Lock the kit and rules,** and record every rejection as a hard rule (§7).
4. **Map every slot** (page, section, the copy beside it) to a composition from §5, varied per page. Reuse approved scenes where they map naturally.
5. **Roll out in batches.** Parallel workers can each own a page group, with no shared-file edits (kit and CSS are read-only for them; new scene file names must be unique).
6. **QA every graphic:** typecheck, then `tools/capture.js` at 1440 and 390 at 2–3 timestamps. Check overflow, console errors, cursor landings and crop focus. Review the contact sheet before shipping.

---

## 10. QA checklist (per graphic)

- [ ] Exactly one focal card; every card crisp and opaque at rest
- [ ] No controls outside the UI; the story is acted out in-UI
- [ ] ≤ ~40 words per state; one idea; plausible content tied to the section copy
- [ ] Accent used only as a tiny marker
- [ ] Cursor lands precisely (measured) and hides when idle
- [ ] Loops cleanly; pauses off-screen; reduced-motion shows `still`
- [ ] Type at design size (not upscaled); legible at 390px; `focusX` keeps the important edge
- [ ] Different composition from its neighbours
- [ ] No horizontal overflow; no console errors
