import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
const localhost = 'http://localhost:3003'
const prodApiUrl = 'https://symptomdiagnosis-api.onrender.com'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    __API_BASE_URL__: JSON.stringify(
      mode === 'production' ? prodApiUrl : localhost
    ),
  },
  server: {
    proxy: {
      //auth.js service
      '/public/auth': { 
        target: localhost,
        changeOrigin: true
      },
      //symptoms.js service
      '/api/protected': {
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
