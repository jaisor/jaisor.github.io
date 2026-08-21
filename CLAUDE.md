# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

`jaisor.github.io` is Jordan Marinov's personal website — a scrolling
one-page React site presenting who he is, his skills and career, his
patents, and his hobbies, plus a blog whose posts each build to their own
static page. The goal is a **modern, polished personal
site** that reads well on desktop and mobile, and that is **safe to
publish as a fully static site on GitHub Pages**.

Design intent: dark, cinematic, one page you scroll through. Fixed
background photo behind translucent panels, amber accents on near-black
neutrals, full-screen scroll-snap sections, and a scroll-revealed section
navigator on the right.

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · oxlint ·
`lucide-react` + `react-icons` for icons.

No backend, no router, no CMS, no runtime data fetching. Everything is
compiled into static assets at build time.

The build is **multi-page**: `index.html` is the main page, and every
`posts/<slug>/index.html` is a second Vite entry that ships as a real
page at `/posts/<slug>/`. That is what stands in for a router — there
isn't one, and adding one is not the way to add a page.

## Commands

```sh
npm install      # install dependencies
npm run dev      # dev server on :5173
npm run build    # tsc -b && vite build  -> dist/
npm run lint     # oxlint
npm run preview  # serve the production build
```

**Important environment note:** `node`/`npm` are on PATH via nvm4w, so
`npm run build` / `npm run lint` work directly. Docker Desktop is often
not running, so treat the container path as the fallback, not the
default:

```sh
docker compose up --build   # live-reloading dev server at :5173
```

The source is bind-mounted, so host edits hot-reload inside the
container (`DOCKER=true` switches Vite's watcher to polling, since bind
mounts don't deliver native FS events reliably). Stop with
`docker compose down`.

If you need a type-check or lint result and can't run npm directly, run
it through the container, e.g.
`docker compose run --rm site npm run build`. **Never claim a build or
lint passed without having actually run it.**

## Layout

```
index.html            # main page shell — <title>, meta description, Google Fonts
posts/<slug>/index.html   # one per post: same shell, own <title>/description,
                          #   and <div id="root" data-slug="<slug>">
vite.config.ts        # globs posts/*/ into build.rollupOptions.input
src/main.tsx          # React root for the main page
src/post.tsx          # React root for every post page; reads data-slug
src/index.css         # Tailwind import + @theme font token + base body styles
src/App.tsx           # scroll container + section order
src/components/
  Backdrop.tsx        # fixed background layers, shared by App and PostPage
  Header.tsx          # #home — photo, bio paragraphs, social links
  Interests.tsx       # #hobbies — cards rendered from data/tags
  Patents.tsx         # #patents — cards from data/patents
  Posts.tsx           # #posts — tag-filterable card grid + FilterPill
  PostCard.tsx        # one post teaser: photo, date, excerpt, tags, link
  PostPage.tsx        # the /posts/<slug>/ page + PostNotFound
  PostImage.tsx       # post photo, or a gradient+icon placeholder if absent
  TagChips.tsx        # non-interactive tag labels (spans — cards are anchors)
  SectionNav.tsx      # right-side dot nav, IntersectionObserver-driven
  Footer.tsx          # copyright
src/data/
  social.ts           # header social links
  tags.ts             # Tag[] — the shared taxonomy, typed by TagId
  posts.ts            # Post[] + postsByDate/postBySlug/postHref helpers
  patents.ts          # Patent[]
src/assets/           # background.jpg, profile.jpg (imported so Vite fingerprints them)
public/favicon.jpg    # copied verbatim to dist/
```

## Content is data, not markup

**Editing site content means editing `src/data/*.ts`, not the
components.** Components are presentation only.

- **Tags are one shared vocabulary.** `data/tags.ts` drives both the
  Hobbies cards (each `Tag` carries the hobby-card copy) and the Posts
  filter pills / chips. Add a `Tag`, add its `id` to the `TagId` union,
  and it shows up in both places.
- Link repos from a hobby card → a `Tag` can carry `repos`
  (`{ label, href }[]`), rendered as a list of amber links under the
  description. Use it when a card names several projects; `link` /
  `linkLabel` remain the single trailing call-to-action.
- **Add a post → two steps, and both are required:**
  1. append a `Post` to `posts` in `data/posts.ts` with a unique `slug`
     and `tags` drawn from `TagId`;
  2. create `posts/<slug>/index.html` — copy an existing one and change
     the `<title>`, the meta `description`, and `data-slug`.
  Vite picks the directory up as a build entry on its own. Skipping
  step 2 leaves a card linking to a 404; skipping step 1 builds a page
  that renders `PostNotFound`.
  `body` is a `string[]` — one paragraph per string, plain text only.
  `image` is optional; without it, cards and pages draw a gradient
  placeholder carrying the first tag's icon, so no stock photo or
  remote image is ever needed.
- Add a patent → append to `patents` in `data/patents.ts`. Each entry
  carries a plain-language `description` — keep that voice: explain what
  the invention actually does, no patentese.
- Add a social link → append to `socialLinks` in `data/social.ts`.

Bio prose lives inline in [`Header.tsx`](src/components/Header.tsx) — it
is the one place copy sits in a component.

## Conventions

- **Tailwind v4, CSS-first.** No `tailwind.config.js`; theme tokens go
  in the `@theme` block in [`src/index.css`](src/index.css). Utilities
  are written inline in JSX — there is no CSS module or styled-component
  layer to add to.
- **Palette:** `neutral-950/900/800` surfaces, `neutral-300/400/500`
  text, `amber-400/500` accents. Stay inside it.
- **Card pattern** (Hobbies, Patents, Posts share it):
  `rounded-xl border border-neutral-800 bg-neutral-900/50 shadow-sm
  shadow-black/20 transition [corner-shape:bevel]
  hover:border-amber-500/40 hover:shadow-md hover:shadow-black/30`.
  Reuse it verbatim for new cards so the sections stay visually
  consistent. `[corner-shape:bevel]` is the site's signature — it
  degrades gracefully to plain rounded corners where unsupported.
- **Sections** are `min-h-screen snap-start px-6 py-24 lg:pr-32
  xl:pr-40`. The extra right padding keeps content clear of the fixed
  `SectionNav`; don't drop it on a new section.
- **A new section must be wired in three places:** rendered in
  [`App.tsx`](src/App.tsx), given a matching `id`, and added to the
  `sections` array in
  [`SectionNav.tsx`](src/components/SectionNav.tsx) — the observer looks
  up elements by those ids, so a mismatch silently breaks the nav dot.
- **Internal links are plain `<a href="/posts/…/">`** — a real
  navigation to a real page. Do *not* give them `target="_blank"`; that
  rule is for external links only. Post pages link back with
  `href="/#posts"`.
- **Anchors don't nest.** `PostCard` wraps the whole tile in an `<a>`,
  so tag chips inside it are `<span>`/`<li>`, never links or buttons.
- **Responsive:** mobile-first base styles, `sm:`/`lg:`/`xl:` to scale
  up. `SectionNav` is `hidden lg:flex` by design.
- **Accessibility:** sections carry `aria-label`; decorative layers and
  icons carry `aria-hidden`; icon-only links carry an `sr-only` label.
  Keep that up.
- **Imports:** double-quoted, components from `./components/...`, types
  imported with `import type` (the tsconfig sets `verbatimModuleSyntax`).
- `noUnusedLocals` and `noUnusedParameters` are on — dead variables fail
  the build, not just lint.

## Security (this is a public static site)

The site ships as static HTML/CSS/JS to GitHub Pages. There is no
server, no database, no auth, and no user input. Preserve that — it is
the security model.

Rules to hold to:

- **No secrets, tokens, API keys, or private addresses/phone numbers in
  the repo.** Everything here is world-readable, including git history.
  There is no `.env` and no need for one; if one ever appears it must be
  gitignored, and remember that anything Vite bundles ends up readable
  in `dist/` regardless of how it was named.
- **Never use `dangerouslySetInnerHTML`**, `eval`, `new Function`, or
  inject markup from a string. All content is authored as TSX/data, so
  React escapes it. There is currently zero unescaped-HTML surface —
  keep it at zero.
- **Every external link must be `target="_blank" rel="noreferrer"`**
  (this implies `noopener`, blocking reverse-tabnabbing). Existing links
  follow this; new ones must too. Same-origin links (post cards, the
  back link) are ordinary navigations and take neither attribute.
- **No third-party runtime scripts, analytics, trackers, embeds, or
  CDN-loaded libraries.** The only external request the page makes is
  the Google Fonts stylesheet, in `index.html` and in each
  `posts/<slug>/index.html`. If tightening that
  matters, self-host the font — don't add more origins.
- **No user input, forms, or comment widgets.** If a contact mechanism
  is ever wanted, prefer a `mailto:` link over a form that posts to a
  third party.
- **Keep dependencies few and current.** Every added package is
  supply-chain surface on a site that mostly needs none. Prefer inline
  SVG or an existing icon package over pulling in a new library, and
  don't add a dependency without saying why it can't be done with what's
  already here.
- **CI stays least-privilege.** `.github/workflows/deploy.yml` grants
  only `contents: read`, `pages: write`, `id-token: write` — do not
  widen it, do not add a `pull_request_target` trigger, and do not let
  workflow steps interpolate untrusted input into shell commands.
- GitHub Pages serves over HTTPS and sets its own headers; a
  `Content-Security-Policy` can only be added here as a `<meta>` tag in
  `index.html`. If added, it must allow `fonts.googleapis.com` /
  `fonts.gstatic.com` and Vite's emitted module scripts — verify it
  against a production build before deploying, since a broken CSP blanks
  the page.

If asked for something that breaks the static, no-input model (a
backend, a form handler, an embedded third-party widget), say so and
propose the static alternative rather than quietly adding the surface.

## Deployment

Pushes to the **`react`** branch trigger
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which
builds and publishes `dist/` to GitHub Pages. `main` still holds the old
Jekyll site. Making `react` the permanent source means merging into
`main` and repointing both the workflow trigger and Settings → Pages →
Source.

Don't commit or push unless asked. If pushing, remember that a push to
`react` deploys the live site.

## Keeping this file current

This file is only useful if it matches reality. **Update it in the same
change that makes it stale** — not later:

- New or removed dependency, script, or config file → update **Stack** /
  **Commands**.
- New component, data file, or directory → update **Layout**.
- New section added to the page → update **Layout** and confirm the
  three-place wiring note still describes the process.
- A styling decision you had to rediscover (a class combo, a spacing
  rule, a palette choice) → add it to **Conventions**. If you found
  yourself grepping to learn how something is done here, that's the
  signal it belongs in this file.
- Anything touching external requests, links, dependencies, or CI
  permissions → re-read **Security** and update it if the model changed.
- Deploy branch, workflow, or Pages settings change → update
  **Deployment**.

Keep it short and specific. Document what isn't obvious from reading the
code — decisions, constraints, and gotchas — not a restatement of the
source. Delete guidance that no longer applies instead of letting it
accumulate.
