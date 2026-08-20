# jaisor.github.io

Personal homepage — React + TypeScript + Vite + Tailwind CSS.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

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

- [`src/data/social.ts`](src/data/social.ts) — social links shown in the header.
- [`src/data/projects.ts`](src/data/projects.ts) — hobby buckets and the
  projects listed under each one.
