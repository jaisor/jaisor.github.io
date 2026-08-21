# jaisor.github.io

Personal homepage — React + TypeScript + Vite + Tailwind CSS.

One scrolling page (about, hobbies, patents, blog index), plus a
separate static page for every blog post.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build   # outputs to dist/
npm run preview # serve the production build locally
npm run lint    # oxlint
```

The build is multi-page: `index.html` produces the main page, and each
`posts/<slug>/index.html` produces a standalone page at
`/posts/<slug>/` with its own `<title>` and meta description.
[`vite.config.ts`](vite.config.ts) discovers those directories
automatically — adding a post needs no build-config change.

## Docker preview

```sh
docker compose up --build
```

Serves the dev server at http://localhost:5173/ with the source
bind-mounted, so edits on the host trigger hot reload inside the
container — no rebuild needed. Stop with `docker compose down`.

## Deploy

Pushes to the `react` branch build and deploy automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) to
GitHub Pages. To make this the site's permanent source, merge into
`main` and point the workflow's trigger branch (and the repo's Pages
settings, under Settings → Pages → Source → GitHub Actions) at `main`.

## Content

Site content lives in `src/data/` — the components are presentation
only.

- [`src/data/social.ts`](src/data/social.ts) — social links in the header.
- [`src/data/tags.ts`](src/data/tags.ts) — the shared topic vocabulary.
  Each tag renders as a card under Hobbies & Interests *and* as a filter
  pill on the blog index.
- [`src/data/posts.ts`](src/data/posts.ts) — blog posts.
- [`src/data/patents.ts`](src/data/patents.ts) — patent entries.

Bio prose is inline in
[`src/components/Header.tsx`](src/components/Header.tsx).

### Adding a post

Two steps, both required:

1. Append a `Post` to `posts` in
   [`src/data/posts.ts`](src/data/posts.ts) with a unique `slug` and
   `tags` drawn from `TagId`. `body` is one string per paragraph;
   `image` is optional (without it the card and page draw a gradient
   placeholder).
2. Create `posts/<slug>/index.html` — copy an existing one and update
   the `<title>`, the meta `description`, and `data-slug`.

Miss step 2 and the card links to a 404; miss step 1 and the page
renders a "post not found" state.
