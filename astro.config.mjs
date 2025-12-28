import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'never', // Always remove trailing slashes for canonical URLs
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll import our own CSS
    }),
  ],
  site: 'https://gentlepiercing.pl',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'uk', 'ru', 'en'],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'portabletext': ['@portabletext/react'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});

