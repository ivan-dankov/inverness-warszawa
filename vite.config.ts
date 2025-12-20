import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
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
    assetsInlineLimit: 2048, // Reduced from 4096 to inline fewer assets
    cssCodeSplit: true,
    // CSS minification is enabled by default in production builds (using esbuild)
    minify: 'terser',
    sourcemap: mode === 'development', // Disable sourcemaps in production for smaller bundles
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remove console in production only
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug', 'console.trace'] : [], // Remove console functions in production
        unused: true, // Remove unused code
        dead_code: true, // Remove dead code
        passes: 3, // Increased from 2 to 3 for better optimization
      },
      mangle: {
        safari10: true, // Fix Safari 10 issues
        keep_classnames: false, // Allow class name mangling for smaller bundles
        keep_fnames: false, // Allow function name mangling for smaller bundles
      },
      module: true, // Enable ES6+ optimizations
    },
    chunkSizeWarningLimit: 1000, // Warn if chunks exceed 1MB
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Enable tree-shaking and dead code elimination
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // ============================================
            // CRITICAL: React core chunk - MUST load first
            // ============================================
            // All React-dependent libraries MUST be in react-core
            // to prevent "Cannot read properties of undefined" errors
            // Order matters - check most specific patterns first
            if (id.includes('node_modules/react/') || 
                id.includes('node_modules/react-dom/') ||
                id.includes('node_modules/scheduler/') ||
                id.includes('use-sidecar') ||
                id.includes('react-remove-scroll') ||
                id.includes('/react') || 
                id.includes('react/') ||
                id.includes('react-') ||
                id.includes('@react') ||
                id.includes('react-router') ||
                id.includes('@remix-run') ||
                id.includes('remix-run') ||
                id.includes('@floating-ui') ||
                id.includes('floating-ui') ||
                id.includes('/scheduler') ||
                id.includes('scheduler/')) {
              return 'react-core';
            }
            
            // ============================================
            // Markdown processing chunk (used for blog)
            // ============================================
            // These are large libraries used only for blog articles
            // Can be lazy-loaded when needed
            if (id.includes('react-markdown') ||
                id.includes('remark') ||
                id.includes('rehype') ||
                id.includes('unified') ||
                id.includes('micromark') ||
                id.includes('mdast') ||
                id.includes('hast')) {
              return 'markdown';
            }
            
            // ============================================
            // Radix UI chunk (UI components)
            // ============================================
            // All @radix-ui packages together for better caching
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            
            // ============================================
            // i18n chunk (non-React parts)
            // ============================================
            if (id.includes('i18next') && !id.includes('react-i18next')) {
              return 'i18n';
            }
            
            // ============================================
            // Carousel chunk (non-React parts)
            // ============================================
            if (id.includes('embla-carousel') && !id.includes('embla-carousel-react')) {
              return 'carousel';
            }
            
            // ============================================
            // Utils chunk (small utility libraries)
            // ============================================
            if (id.includes('clsx') || 
                id.includes('tailwind-merge') || 
                id.includes('class-variance-authority')) {
              return 'utils';
            }
            
            // ============================================
            // Icons chunk (lucide-react)
            // ============================================
            if (id.includes('lucide-react') || id.includes('lucide')) {
              return 'icons';
            }
            
            // ============================================
            // SEO chunk (react-helmet)
            // ============================================
            if (id.includes('react-helmet') || id.includes('helmet')) {
              return 'seo';
            }
            
            // ============================================
            // No vendor chunk - distribute everything into specific chunks
            // ============================================
            // If we reach here, it's likely a dev dependency or build tool
            // Let Vite handle it automatically (undefined = default behavior)
            return undefined;
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
  // Ensure production builds exclude dev dependencies
  optimizeDeps: {
    exclude: isProduction ? ['@vite/client'] : [],
  },
  };
});
