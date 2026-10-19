import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// VITE_BASE lets the same code run at the site root (username.github.io, Vercel) or under /repo-name/ (GitHub project pages)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return { base: process.env.VITE_BASE || env.VITE_BASE || '/', plugins: [react(), tailwindcss()] }
})
