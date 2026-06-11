import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        capabilities: path.resolve(__dirname, 'capabilities.html'),
        cases: path.resolve(__dirname, 'cases.html'),
        services: path.resolve(__dirname, 'services.html'),
        industries: path.resolve(__dirname, 'industries.html'),
        thesis: path.resolve(__dirname, 'thesis.html'),
        login: path.resolve(__dirname, 'login.html'),
      },
    },
  },
});
