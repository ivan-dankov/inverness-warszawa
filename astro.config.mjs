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
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
          passes: 2,
          unsafe: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true,
        },
        format: {
          comments: false,
        },
        mangle: {
          safari10: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // React vendor chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // PortableText
            if (id.includes('@portabletext')) {
              return 'portabletext';
            }
            // Sanity client
            if (id.includes('@sanity/client') || id.includes('@sanity/image-url')) {
              return 'sanity';
            }
            // Lucide icons
            if (id.includes('lucide-react')) {
              return 'lucide-icons';
            }
            // Embla carousel
            if (id.includes('embla-carousel')) {
              return 'embla-carousel';
            }
            // Other node_modules
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 600,
    },
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});

