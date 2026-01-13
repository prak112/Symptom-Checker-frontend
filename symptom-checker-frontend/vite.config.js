import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
const localhost = 'http://localhost:3003'
export default defineConfig(({
  plugins: [react()],
  server: {
    proxy: {
      //symptoms.js service
      '/api/protected': {
        target: localhost,
        changeOrigin: true
      },
      //auth.js service
      '/public/auth': { 
        target: localhost,
        changeOrigin: true
      }
    } 
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
}));
