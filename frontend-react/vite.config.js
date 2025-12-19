import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/comptes': 'http://localhost:8888',
      '/transactions': 'http://localhost:8888',
      '/reporting': 'http://localhost:8888',
    }
  }
})
