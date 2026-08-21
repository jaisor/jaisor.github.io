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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: abs('./index.html'),
        about: abs('./about/index.html'),
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
