import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const abs = (p: string) => fileURLToPath(new URL(p, import.meta.url))

/**
 * Every `posts/<slug>/index.html` is its own build entry, so each post
 * ships as a real static page at /posts/<slug>/ with its own <title> and
 * meta description. Dropping a new directory in there is all it takes —
 * no config change.
 */
function postEntries() {
  return Object.fromEntries(
    readdirSync(abs('./posts'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => [
        `posts/${entry.name}`,
        abs(`./posts/${entry.name}/index.html`),
      ]),
  )
}

// Vite always adds `crossorigin` to the module script/preload/stylesheet
// tags it emits (no build option turns it off), which forces those
// requests to fetch with credentials omitted, even though everything
// here is same-origin static hosting with no CDN and no SRI in play, so
// there's nothing that attribute is protecting. Strip it post-render.
function stripCrossorigin() {
  return {
    name: 'strip-crossorigin',
    transformIndexHtml(html: string) {
      return html.replace(/\s+crossorigin\b/g, '')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), stripCrossorigin()],
  build: {
    rollupOptions: {
      input: {
        main: abs('./index.html'),
        ...postEntries(),
      },
    },
  },
  server: {
    host: true,
    watch: {
      // Bind-mounted volumes (e.g. Docker Desktop on Windows/Mac) don't
      // reliably deliver native file-change events, so fall back to polling.
      usePolling: process.env.DOCKER === 'true',
    },
  },
})
