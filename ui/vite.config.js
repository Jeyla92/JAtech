import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Vid dev: allt som börjar med /api går vidare till Express på :3000
      '/api': { target: 'http://localhost:3000', changeOrigin: true, secure: false },
      // Uppladdade bilder
      '/products': { target: 'http://localhost:3000', changeOrigin: true, secure: false },
      '/categories': { target: 'http://localhost:3000', changeOrigin: true, secure: false },
    },
  },
  preview: {
    port: 4173,
  },
})
