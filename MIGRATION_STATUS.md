# Astro Migration Status

## ✅ Completed

### Core Infrastructure
- [x] Astro project setup with Vercel adapter
- [x] Sanity CMS configuration and schema
- [x] Base layout with SEO (meta tags, hreflang, canonical, JSON-LD)
- [x] SEO helper functions (canonical URLs, hreflang generation, structured data)
- [x] Sanity queries (GROQ) for fetching posts and translation groups
- [x] Translation system (JSON-based, migrated from i18next)
- [x] Sitemap generation with hreflang alternates
- [x] Robots.txt generation
- [x] Vercel configuration updated for static deployment

### Pages Created
- [x] Root redirect (`/` → `/pl`)
- [x] Homepage (`/[locale]/index.astro`) - placeholder (Header/Footer integrated)
- [x] Blog listing (`/[locale]/blog/index.astro`) - with Header/Footer
- [x] Blog post (`/[locale]/blog/[slug].astro`) with:
  - Static path generation
  - Article JSON-LD schema
  - BreadcrumbList JSON-LD schema
  - Translation linking (hreflang)
  - Header/Footer integrated
- [x] Static pages (services, pricing, faq, contact) - placeholders with Header/Footer

## 🚧 Remaining Tasks

### Component Migration
- [x] Migrate Header component from React to Astro (with mobile menu)
- [x] Migrate Footer component from React to Astro
- [x] Migrate LanguageSwitch component (React island with translation linking)
- [x] Integrate Header and Footer into BaseLayout

### Content Migration
- [ ] Migrate homepage components (Hero, About, Services, Gallery, etc.)
- [ ] Migrate Services page content
- [ ] Migrate Pricing page content
- [ ] Migrate FAQ page content
- [ ] Migrate Contact page content

### Blog Features
- [ ] Add portable text rendering for blog post content
  - Consider using `@portabletext/react` or custom Astro component
- [ ] Migrate existing Markdown blog posts to Sanity CMS
- [ ] Add blog post image optimization

### Testing & Optimization
- [ ] Test build locally (`npm run build`)
- [ ] Verify all SEO features (hreflang, canonical, structured data)
- [ ] Test sitemap generation
- [ ] Verify translation linking works correctly
- [ ] Test on Vercel deployment

## 📝 Important Notes

### Sanity CMS Setup
- Project ID: `nfwijjoy`
- Dataset: `production`
- Schema: `sanity/schemas/post.ts`
- Studio: Run `npm create sanity@latest -- --project nfwijjoy --dataset production` to initialize Sanity Studio locally

### Environment Variables
Add to Vercel:
- `SANITY_PROJECT_ID=nfwijjoy`
- `SANITY_DATASET=production`
- `SANITY_API_TOKEN` (read-only token for builds)

### Translation Files
Translation files are located at:
- `src/content/translations/{locale}.json`

### Blog Post Content
Currently, blog posts need portable text rendering. The content is stored in Sanity as portable text blocks. You can:
1. Use `@portabletext/react` with Astro islands
2. Create a custom Astro component to render portable text
3. Use `@portabletext/astro` if available

### Next Steps
1. Install dependencies: `npm install`
2. Initialize Sanity Studio: `npm create sanity@latest -- --project nfwijjoy --dataset production`
3. Migrate existing Markdown blog posts to Sanity
4. Migrate React components to Astro
5. Test build: `npm run build`
6. Deploy to Vercel

## 🔍 SEO Checklist

After completing migration, verify:
- [ ] Every page has unique title, description, og:image
- [ ] Every page has correct canonical URL
- [ ] Every page has hreflang alternates (pl/uk/ru/en + x-default)
- [ ] Blog posts have Article JSON-LD schema
- [ ] Key pages have BreadcrumbList JSON-LD schema
- [ ] Homepage has LocalBusiness JSON-LD schema
- [ ] Sitemap contains all URLs with hreflang
- [ ] robots.txt is properly configured
- [ ] HTML lang attribute matches page locale
- [ ] Language switcher links to correct translated pages

