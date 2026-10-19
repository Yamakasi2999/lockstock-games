import { defineConfig } from 'vite';

// configure-pages supplies the correct path for project sites and custom domains.
const pagesBase = process.env.PAGES_BASE_PATH || '/';

export default defineConfig({
  base: pagesBase.endsWith('/') ? pagesBase : `${pagesBase}/`,
});
