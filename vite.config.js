import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // forward /api calls to the backend running in Docker
    proxy: {
      '/api': process.env.API_URL || 'http://localhost:3000',
    },
  },
})
