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
    dedupe: ['react', 'react-dom'], // Prevent multiple React instances
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
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // CRITICAL: React core and ALL React-dependent libraries MUST be in react-core
            // to prevent "Cannot read properties of undefined" errors
            
            // Strategy: Check for ANY mention of "react" in the path first
            // This catches all React-related packages including dependencies
            // Also check for scheduler (React's scheduler package)
            if (id.includes('/react') || 
                id.includes('react/') ||
                id.includes('react-') ||
                id.includes('@react') ||
                id.includes('react-router') ||
                id.includes('@remix-run') ||
                id.includes('remix-run') ||
                id.includes('@floating-ui') ||
                id.includes('floating-ui') ||
                id.includes('scheduler')) {
              return 'react-core';
            }
            // i18n (non-React parts)
            if (id.includes('i18next') && !id.includes('react-i18next')) {
              return 'i18n';
            }
            // Carousel (non-React parts)
            if (id.includes('embla-carousel') && !id.includes('embla-carousel-react')) {
              return 'carousel';
            }
            // Utils
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
              return 'utils';
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
