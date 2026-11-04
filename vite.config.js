import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
 server: {
   proxy: {
      // Short-hand option: matches any path starting with /api
      '/api': {
         target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    } 
  }
})