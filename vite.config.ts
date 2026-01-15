import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import adonisjs from '@adonisjs/vite/client'
import { getDirname } from '@adonisjs/core/helpers'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ['assets/app/app.ts'],
      reload: ['resources/views/**/*.edge'],
    }),
    svelte(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@/': `${getDirname(import.meta.url)}/assets/`,
    },
  },
})
