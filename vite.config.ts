import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For GitHub Pages - change this to your repo name
  base: '/archipelago-training/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
