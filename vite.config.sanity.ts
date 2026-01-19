import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    force: true,
    include: ['sanity', '@sanity/structure', '@sanity/vision'],
  },
  server: {
    port: 3333,
  },
});






