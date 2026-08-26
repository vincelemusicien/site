import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lemusicien.fr',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
