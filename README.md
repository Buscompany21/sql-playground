# SQL Adventure (sql-playground)

**Live site:** [https://sql-playground.codeadventure.net/](https://sql-playground.codeadventure.net/)

Interactive SQL curriculum framed as a storyline: you are a junior data analyst at *Stellar Sound Records*, using SQL to explore chart data, label metadata, and reporting-style questions. Everything runs **in the browser**—there is no server-side SQL execution.

---

## What’s in this repo

| Area | Purpose |
|------|---------|
| **Next.js 14 (App Router)** | UI, routing, static prerendering |
| **`sql.js`** | SQLite compiled to WebAssembly; your queries run locally |
| **`public/curriculum/`** | Lesson definitions (JSON) and database setup (SQL) |
| **`src/config/moduleConfig.js`** | Module list, titles, level counts, storyline blurbs, images |
| **CodeMirror** | SQL editor with syntax highlighting |

The production build is a **fully static** site (`output: 'export'` in `next.config.mjs`). It can be hosted on any static file host (S3/CloudFront, Netlify, GitHub Pages, nginx, etc.).

---

## How it works (for developers)

### Routes

- **`/`** — Landing page and module grid (`src/app/page.js`).
- **`/module/{moduleId}/`** — Module intro / storyline, then continue to level 1 (`src/app/module/[moduleId]/ModuleClient.jsx`).
- **`/module/{moduleId}/{levelId}/`** — Main SQL playground (`src/app/module/[moduleId]/[levelId]/LevelClient.jsx` + `SQLEditorContainer.jsx`).
- **`/module/{moduleId}/complete/`** — End-of-module screen (`src/app/module/[moduleId]/complete/page.js`).

`trailingSlash: true` is enabled, so URLs are generated with a trailing `/` (e.g. `/module/1/1/`).

### Curriculum loading

1. Level content is fetched from **`/curriculum/modules/{moduleId}.json`** (see `src/lib/curriculum/fetchLevel.js`).
2. Schema SQL is loaded from one or more files under **`/curriculum/schemas/`**, depending on module id (`src/lib/curriculum/paths.js` → `curriculumSchemaUrls`).
3. Those files are plain static assets under **`public/curriculum/`**, so they ship with the build and work offline after load.

### Checking answers

`src/lib/curriculum/executeUserSql.js` creates two in-memory databases, applies the same schema to both, runs the learner’s query and the **reference solution** from the level JSON, and compares the **final statement’s result rows** (as JSON). Semicolons split statements; only the **last** statement is treated as the graded `SELECT` (earlier statements can set up temp data, etc., mirroring the original “lambda” style semantics noted in that file).

The **solution query is not removed from the bundle** for the level page (it is kept in a ref for grading); treat curriculum JSON as visible to anyone who inspects the app. This is appropriate for a learning tool, not for hiding answers.

### SQL WebAssembly

`package.json` **`postinstall`** copies `sql-wasm.wasm` from `sql.js` into **`public/sql-wasm.wasm`**. The app loads it via `src/lib/curriculum/paths.js` (`sqlWasmUrl()`). After `npm install`, you should have that file under `public/` (it may be gitignored or tracked depending on your workflow—if missing, re-run `npm install`).

---

## Local development

**Requirements:** Node.js 18+ (LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit React/curriculum files; the dev server hot-reloads.

**Lint:**

```bash
npm run lint
```

---

## Production build and preview

```bash
npm run build
```

This runs `next build` and emits a static site to the **`out/`** directory (gitignored). With `output: 'export'`, **`npm run start` (`next start`) is not used** for this project—there is no Node server bundle for the exported app.

Preview the static output locally, for example:

```bash
npx --yes serve out
```

Then open the URL the CLI prints (defaults to port **3000**, so stop `npm run dev` first or pass `-l 4173` to listen on another port).

---

## Deployment

1. Run **`npm run build`** in CI or on your machine.
2. Upload the contents of **`out/`** to your static host’s root (or to a subpath—see below).
3. Ensure the host serves **`index.html`** for directory paths and that **`_next/`**, **`curriculum/`**, **`sql-wasm.wasm`**, and **`images/`** are deployed with correct MIME types (WASM must be `application/wasm`).

**Subpath / GitHub Pages:** If the site is not at the domain root, set `basePath` (and usually `assetPrefix`) in `next.config.mjs` to match your path, and set **`NEXT_PUBLIC_BASE_PATH`** to the same value before building so client-side `fetch()` URLs resolve correctly (`src/lib/curriculum/paths.js` documents this). Rebuild after any change.

The project already uses **`images: { unoptimized: true }`** so static export works without the Next image optimization server.

---

## Adding or editing content

### New levels in an existing module

Edit **`public/curriculum/modules/{moduleId}.json`**. Each level object must include (validated in `fetchLevel.js`):

- `id`, `title`, `task`, `initialCode`, `solution`, `hintMessage`, `successMessage`, `table`

`table` is either a single table name string or an array of names; the first is used for the initial “preview” `SELECT *`.

If you change the number of levels, update **`levels`** for that module in **`src/config/moduleConfig.js`** and ensure **`generateStaticParams`** in `src/app/module/[moduleId]/[levelId]/page.jsx` still matches (it derives from `moduleConfig`).

### New module

1. Add an entry to **`src/config/moduleConfig.js`** (title, `levels`, storyline, image path).
2. Add **`public/curriculum/modules/{id}.json`** with a `levels` array.
3. If the module needs new tables or different schema composition, extend **`curriculumSchemaUrls`** in **`src/lib/curriculum/paths.js`** and add SQL under **`public/curriculum/schemas/`**.

### Images

Storyline art lives under **`public/images/storyline/`**. Paths in `moduleConfig` are case-sensitive on Linux CI—keep filenames and references consistent.

---

## Tech stack (quick reference)

- **Framework:** Next.js 14.2, React 18  
- **Styling:** Tailwind CSS 3, `tailwindcss-animate`  
- **Editor:** `@uiw/react-codemirror`, `@codemirror/lang-sql`  
- **Database in browser:** `sql.js`  
- **Icons / motion:** `lucide-react`, `framer-motion`  
- **UI primitives:** Radix (`@radix-ui/react-scroll-area`, `@radix-ui/react-slot`), local `src/components/ui/*`

---

## Repository layout (high level)

```
src/app/                 # App Router pages (home, module, level, complete)
src/components/          # Layout, header, storyline, sql-editor UI
src/config/moduleConfig.js
src/lib/curriculum/      # fetch level, schema cache, sql.js runner, URL helpers
public/curriculum/       # modules/*.json, schemas/*.sql (shipped as static files)
public/images/           # logos, storyline artwork
public/sql-wasm.wasm     # produced by postinstall from sql.js
```

---

## Troubleshooting

| Issue | What to try |
|-------|----------------|
| WASM / SQL fails to load | Confirm `public/sql-wasm.wasm` exists; run `npm install` again |
| 404 on `/curriculum/...` | Ensure `public/curriculum` is present and deployed; check `NEXT_PUBLIC_BASE_PATH` if using a subpath |
| Module or level not found | Align `moduleConfig` keys and JSON `levels[].id` with routes under `public/curriculum/modules/` |

If something still fails after a clean install, delete `node_modules` and `package-lock.json` only as a last resort, then `npm install` again.
