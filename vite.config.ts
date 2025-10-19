import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': [
            'react', 
            'react-dom', 
            'react-router-dom',
            'react-helmet-async'
          ],
          // Radix UI components
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-select',
            '@radix-ui/react-dropdown-menu'
          ],
          // Forms and validation
          'forms-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          // Carousel
          'carousel-vendor': [
            'embla-carousel-react'
          ],
          // i18n
          'i18n-vendor': [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector'
          ],
          // Tanstack Query
          'query-vendor': [
            '@tanstack/react-query'
          ],
          // Icons
          'icons-vendor': [
            'lucide-react'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));
