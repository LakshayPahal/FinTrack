import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/predict': {
        target: 'https://f1e0-106-194-118-25.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
