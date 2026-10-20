// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://higa.pages.dev',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
