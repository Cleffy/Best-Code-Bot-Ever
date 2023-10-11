// Importing vite configuration options and creating proxy to backend

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // declaring the frontend port
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001', // declaring the backend port
        changeOrigin: true,
        secure: false,

      },
    },

  }
})

