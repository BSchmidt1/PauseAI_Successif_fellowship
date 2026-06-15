# PauseAI × Successif Fellowship — Project Dashboard

**Date:** 2026-06-15
**Owner:** Benjamin Schmidt (benjamin.schmidt@pauseai.info)
**Status:** Approved design, building.

## Purpose

A professional, public dashboard that presents PauseAI advocacy projects to incoming
**Successif** fellows (mid-career professionals choosing where to contribute). It must:

1. Look professional and credible (audience = experienced professionals).
2. Lead with one **proven case study** (the 152-professor appeal) to establish that this
   work produces real-world results.
3. Offer a **menu of ~19 projects** fellows can pick from, each scoped by effort, expertise,
   region, and skills, with an "Express interest" action.

## Delivery & hosting

- **Static site, no build step.** Plain `index.html` + `styles.css` + vanilla JS.
- **GitHub repo + GitHub Pages** for a live shareable URL. The repo *is* the deployment.
- Maintainable by non-developers: all project content lives in one editable data file
  (`projects.js`), separate from layout/logic.

## Information architecture (single scrolling page)

1. **Header / hero** — PauseAI-led identity; "Fellowship in partnership with Successif"
   credit. One-paragraph intro: what this is, who it's for.
2. **Featured case study** — the 152-professor appeal. Includes: the ask (two priorities —
   red lines + binding enforced safety standards), the effort breakdown
   (5 × 20h ≈ 100h, **with the explicit note that it can now be done in far less**),
   results (5 university talks, 3 previously-unresponsive politicians made contact, local
   MP meeting secured, 30+ MP meetings scheduled in follow-up), the full press list
   (radio, online print, YouTube — real links), and 2–3 signatory quotes
   (Scholze, Buras, Apel). Links to https://www.pause-ai.de/appell.
3. **Filter / view bar** — filter cards by **region** (DE / Global / Both), **effort**, and
   **expertise**; toggle **Compact ↔ Detailed** card view.
4. **Project grid** — full cards for the ~19 projects.
5. **Footer** — PauseAI + Successif, contact.

## Card view variants (build both; user picks one to keep)

A single **view toggle** switches all cards between:
- **Compact:** title + tags + short blurb on the card; click opens a detail panel/modal with
  full description, skills, and the mailto CTA. (Best for scanning ~19 items.)
- **Detailed:** everything (full description, skills, CTA) visible on every card.

## Project data model

```js
{
  title, category, region: "DE" | "Global" | "Both",
  effortHours: "40–60h", expertise: "Beginner-friendly" | "Some experience" | "Specialist",
  blurb, skills: [..], detail, contact: <key into CONTACTS>
}
```

`CONTACTS` map (editable at top of `projects.js`):
- `benjamin` — Benjamin Schmidt — benjamin.schmidt@pauseai.info — **confirmed default**
- `matilda` — Matilda da Rue — *placeholder email, confirm* — assigned to **SitRep**
- `irina` — Irina Taverna — *placeholder email, confirm* — available to assign
- `jonathan` — Jonathan Moody — *placeholder email, confirm* — available to assign

> All non-SitRep projects default to Benjamin. Reassign Irina/Jonathan by editing each
> project's `contact` field. Effort/expertise values are first-draft estimates for review.

## Visual direction

Serious and professional: generous whitespace, strong typography, restrained palette
(near-black ink + one PauseAI accent), responsive/mobile-first. No gimmicks.

## Project list (featured + 19)

**Featured (completed):** 152 German professors urge the German delegation to back a global
AI-safety agreement.

Menu: replicate-the-appeal · German op-ed pipeline · spokesperson bench / advisory board ·
journalist background-briefing program · labor-union engagement (IG Metall, ver.di) ·
youth & future-generations campaign · pause-themed think tank / bureaucracy engagement ·
Grundgesetz human-dignity legal argument · local-politician pledge campaign · working with
artists · working with influencers · journalist coalition · land a celebrity champion ·
cold outreach: celebrity champions · cold outreach: unions · cold outreach: churches ·
major-funder search · "conscientious objector" pledge for AI workers · SitRep daily brief.

## Out of scope (YAGNI)

No backend, no CMS, no auth, no application form (mailto only), no analytics.
