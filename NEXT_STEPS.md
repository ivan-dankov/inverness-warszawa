# Next Steps for Astro Migration

## ✅ Completed

The core infrastructure is complete:
- Astro setup with Vercel adapter
- Sanity CMS integration
- SEO system (meta tags, hreflang, canonical, structured data)
- Header, Footer, and LanguageSwitch components migrated
- Blog pages with translation linking
- Sitemap and robots.txt generation

## 🚧 Immediate Next Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Sanity Studio (for content management)
```bash
npm create sanity@latest -- --project nfwijjoy --dataset production
```

This will allow you to:
- Manage blog posts in Sanity Studio
- Create new posts with translation linking
- Upload images

### 3. Migrate Existing Blog Content

You have Markdown files in `content/blog/`. You need to:
1. Import them into Sanity CMS
2. Set the same `translationGroupId` for translations of the same article
3. Add cover images and metadata

### 4. Add Portable Text Rendering

Blog posts currently show only excerpts. You need to render the full portable text content.

**Option A: Use @portabletext/react (Recommended)**
```bash
npm install @portabletext/react
```

Then in `src/pages/[locale]/blog/[slug].astro`:
```astro
---
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../../lib/portable-text-components';
---

<PortableText value={post.content} components={portableTextComponents} />
```

**Option B: Create custom Astro component** to render portable text blocks

### 5. Migrate Homepage Components

The homepage needs these components migrated:
- `Hero.astro` - Hero section with CTA
- `About.astro` - About section
- `Services.astro` - Services cards
- `Gallery.astro` - Image gallery
- `Testimonials.astro` - Customer testimonials
- `Comparison.astro` - Method comparison table
- `FAQ.astro` - FAQ accordion
- `RecentArticles.astro` - Recent blog posts preview
- `Contact.astro` - Contact form/section

These can be migrated incrementally. Start with simpler ones (About, Contact) and work up to more complex ones (Gallery with carousel, FAQ accordion).

### 6. Migrate Static Page Content

Update placeholder pages with actual content:
- `src/pages/[locale]/services.astro`
- `src/pages/[locale]/pricing.astro`
- `src/pages/[locale]/faq.astro`
- `src/pages/[locale]/contact.astro`

### 7. Test Build

```bash
npm run build
```

Check for:
- Build errors
- Missing images/assets
- Broken links
- SEO meta tags in HTML output

### 8. Test Locally

```bash
npm run dev
```

Test:
- All locale routes (`/pl`, `/uk`, `/ru`, `/en`)
- Blog listing and posts
- Language switcher
- Mobile menu
- Smooth scrolling on homepage

### 9. Deploy to Vercel

1. Push to your Git repository
2. Connect to Vercel
3. Set environment variables:
   - `SANITY_PROJECT_ID=nfwijjoy`
   - `SANITY_DATASET=production`
   - `SANITY_API_TOKEN` (read-only token)
4. Deploy

## 📝 Notes

### Language Switch
The LanguageSwitch component now uses Sanity translation groups for blog posts. For blog posts, it will automatically link to the correct translated slug. For other pages, it just changes the locale in the URL.

### SEO
All pages have:
- Proper meta tags
- Canonical URLs
- Hreflang alternates
- Structured data (where applicable)

### Performance
- Static HTML generation (no client-side routing)
- Images optimized via Sanity CDN
- CSS and JS minified in production

## 🔍 Testing Checklist

After migration:
- [ ] All pages load correctly
- [ ] Language switcher works on all pages
- [ ] Blog posts display full content
- [ ] Images load correctly
- [ ] Mobile menu works
- [ ] Smooth scrolling works on homepage
- [ ] SEO meta tags present in HTML
- [ ] Sitemap generates correctly
- [ ] robots.txt accessible
- [ ] All translations work

