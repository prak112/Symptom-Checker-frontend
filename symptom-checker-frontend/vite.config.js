import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
const localhost = 'http://localhost:3003'
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/protected/symptoms': {
        target: localhost,
        changeOrigin: true
      },
      '/public/auth': {
        target: localhost,
        changeOrigin: true
      }
    }
  },
})
