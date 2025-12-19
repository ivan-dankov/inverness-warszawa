import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configure Vite to handle Markdown files
  assetsInclude: ['**/*.md'],
  // Ensure content directory is accessible
  publicDir: 'public',
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging production issues
        drop_debugger: true,
        pure_funcs: [], // Don't remove any console functions
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React core (keep together for optimal tree-shaking)
            // IMPORTANT: Keep react and react-dom together to prevent version conflicts
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router')) {
              return 'react-core';
            }
            // Markdown rendering (only loaded on blog pages)
            if (id.includes('react-markdown') || id.includes('remark') || id.includes('rehype')) {
              return 'markdown';
            }
            // UI components
            if (id.includes('@radix-ui')) {
              return 'ui-components';
            }
            // i18n
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n';
            }
            // Carousel
            if (id.includes('embla-carousel')) {
              return 'carousel';
            }
            // Utils
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
              return 'utils';
            }
            // React Helmet (SEO)
            if (id.includes('react-helmet')) {
              return 'seo';
            }
            // Everything else goes to vendor chunk
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          let extType = name.split('.').at(-1) || 'other';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            extType = 'images';
          } else if (/woff2?|ttf|eot/i.test(extType)) {
            extType = 'fonts';
          } else if (/css/i.test(extType)) {
            extType = 'css';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
}));
