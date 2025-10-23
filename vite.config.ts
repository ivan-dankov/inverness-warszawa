import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-slot',
            '@radix-ui/react-separator',
          ],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
          'carousel': ['embla-carousel-react'],
          'utils': ['date-fns', 'clsx', 'tailwind-merge', 'class-variance-authority'],
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
