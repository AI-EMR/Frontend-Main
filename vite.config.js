import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 5173, // Default Vite port for local development
    host: process.env.NODE_ENV === 'production' ? true : false, // Only listen on all addresses in production
  },
  preview: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0', // For Render deployment
  },
  // Ensure proper handling of environment variables
  define: {
    'process.env': {}
  }
})
