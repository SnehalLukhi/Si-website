import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The admin app is served under /admin (see the root vercel.json), locally too.
// https://vite.dev/config/
export default defineConfig({
  base: '/admin/',
  build: { outDir: 'dist/admin', emptyOutDir: true }, // served as /admin/* on Vercel
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
})
