import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.vue$/],
    },
  },
})
