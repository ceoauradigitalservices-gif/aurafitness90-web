import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Vercel serves from the domain root; GitHub Pages serves from /aurafitness90-web/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/aurafitness90-web/',
  plugins: [react()],
})
