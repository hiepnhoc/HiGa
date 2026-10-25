// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://higa.pages.dev',
  trailingSlash: 'always',
  // CSS nhúng thẳng vào HTML để trang /share/* không cần tải /_astro/* (bị Access chặn)
  build: { inlineStylesheets: 'always' },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
