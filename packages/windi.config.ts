import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: ['**/*.{vue,svelte}', '.vitepress/theme/**/*.{vue,svelte}'],
  },
  attributify: true,
  theme: {
    extend: {
      colors: {
        primary: '#3eaf7c',
      },
    },
  },
})
