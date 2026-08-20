import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    watch: {
      // Bind-mounted volumes (e.g. Docker Desktop on Windows/Mac) don't
      // reliably deliver native file-change events, so fall back to polling.
      usePolling: process.env.DOCKER === 'true',
    },
  },
})
