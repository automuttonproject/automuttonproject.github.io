import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kuroyagi: resolve(__dirname, 'the-black-goat-sanctuary.html'),
        ghost: resolve(__dirname, 'ghost.html'),
        ghostShichou: resolve(__dirname, 'ghost-shichou.html'),
      },
    },
  },
})
