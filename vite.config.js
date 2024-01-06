
// https://vitejs.dev/config/
// http://localhost:5000
// https://node-ecommerce-3fxv.onrender.com

/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {

    
      },
    },
);

//   proxy: {
    //     '/api': {
    //       target: 'https://node-ecommerce-3fxv.onrender.com/api/v1/',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //       secure: false, // If your backend uses https, set this to true
    //     },
