# PauseAI × Successif — Fellowship Project Dossier

A single-page, static dashboard presenting PauseAI advocacy projects to **Successif**
fellows. It leads with one completed, evidenced case study (the 152-professor appeal) and
offers a filterable catalogue of ~22 projects, each scoped by **effort**, **expertise** and
**region**, with a one-click *Express interest* email.

**Live site:** _add the GitHub Pages URL here once deployed._

## Editing content (no coding needed)

Everything fellows read lives in **`projects.js`**:

- **Add / change a project** — copy one `{ … }` block in `window.PROJECTS` and edit the
  fields (`title`, `region`, `effort`, `expertise`, `blurb`, `skills`, `detail`, `contact`).
- **Change who a project routes to** — set its `contact` to one of the keys in
  `window.CONTACTS`: `benjamin`, `matilda`, `irina`, or `jonathan`.
- **The featured case study** is hand-written in `index.html` (the `<section class="case">`
  block), since it is richer than a normal card.

### ⚠ Before going live — confirm these

- Only **benjamin.schmidt@pauseai.info** is a confirmed address. Replace the placeholder
  emails for **Matilda da Rue, Irina Taverna, and Jonathan Moody** in `projects.js`.
- **Irina** and **Jonathan** aren't assigned to any project yet — set the `contact` field on
  whichever projects should route to them.
- Effort/expertise numbers are **first-draft estimates** — edit to taste.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure + the featured case study |
| `styles.css` | All styling (editorial "dossier" theme) |
| `projects.js` | **Project data + contacts — edit this** |
| `app.js` | Rendering, filtering, view toggle, modal, mailto |

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

No build step, no dependencies. Fonts load from Google Fonts.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   branch `main`, folder `/ (root)`, **Save**.
3. The site goes live at `https://<user>.github.io/<repo>/` within a minute or two.

(`/.nojekyll` is included so Pages serves the files as-is.)
