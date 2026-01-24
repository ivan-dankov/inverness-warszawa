# CLAUDE.md

This file provides guidance for Claude Code when working with this codebase.

## Project Overview

**Gentle Piercing Warszawa** - A multilingual website for medical ear piercing services in Warsaw, Poland. The site is built as a static site with React islands for interactive components.

**Live site**: https://gentlepiercing.pl

## Tech Stack

- **Framework**: Astro 4.x (Static Site Generation)
- **UI**: React 18 with islands architecture
- **Styling**: Tailwind CSS + shadcn/ui components
- **CMS**: Sanity (headless CMS for blog content)
- **Language**: TypeScript
- **Deployment**: Vercel

## Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:4321

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Sanity CMS
npm run sanity       # Start Sanity Studio locally

# Blog management
npm run import-blog  # Import blog posts to Sanity
npm run export-blog  # Export blog posts from Sanity

# Linting
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── pages/           # Astro pages (file-based routing)
│   ├── pl/          # Polish pages (default locale)
│   ├── en/          # English pages
│   ├── uk/          # Ukrainian pages
│   ├── ru/          # Russian pages
│   └── [locale]/    # Dynamic locale routes (blog)
├── components/      # Reusable components
│   ├── ui/          # shadcn/ui components
│   ├── blog/        # Blog-specific components
│   └── service/     # Service page components
├── content/
│   └── translations/ # i18n JSON files (pl.json, en.json, uk.json, ru.json)
├── layouts/         # Astro layout components
├── lib/             # Utility functions and configurations
├── hooks/           # React custom hooks
└── assets/          # Static assets (images)

sanity/
├── schemas/         # Sanity content schemas (post.ts, author.ts)
└── lib/             # Sanity client utilities

public/              # Public static files
```

## Internationalization (i18n)

- **Default locale**: Polish (`pl`)
- **Supported locales**: `pl`, `en`, `uk` (Ukrainian), `ru` (Russian)
- Translation files are in `src/content/translations/`
- URL structure: `/{locale}/page` (e.g., `/en/services`, `/uk/poslugy`)
- Polish uses `/pl/` prefix for consistency

## Key Conventions

### Component Patterns
- Astro components (`.astro`) for static content
- React components (`.tsx`) for interactive elements (islands)
- Use `client:load` or `client:visible` directives for React components in Astro

### Styling
- Use Tailwind CSS utility classes
- shadcn/ui components are in `src/components/ui/`
- Global styles use the `@` alias pointing to `src/`

### Sanity CMS
- Blog posts are managed in Sanity
- Schemas are defined in `sanity/schemas/`
- Use PortableText for rich text rendering
- Images use Sanity's image pipeline with `@sanity/image-url`

### SEO
- Each page includes proper meta tags and structured data
- Sitemap is generated at `/sitemap.xml`
- Trailing slashes are removed from URLs

## Environment Variables

Required for Sanity integration:
- `PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `PUBLIC_SANITY_DATASET` - Sanity dataset (usually "production")
- `SANITY_API_TOKEN` - Sanity API token (for write operations)

## Common Tasks

### Adding a new page
1. Create `.astro` file in appropriate locale directory under `src/pages/`
2. Add translations to all locale JSON files in `src/content/translations/`
3. Update navigation if needed

### Adding translations
1. Add keys to all translation files (`pl.json`, `en.json`, `uk.json`, `ru.json`)
2. Use consistent key naming (dot notation for nested keys)

### Creating blog posts
1. Use Sanity Studio (`npm run sanity`) to create/edit posts
2. Posts support multiple locales with `locale` field
3. Use PortableText for rich content

## Build Notes

- Build output is static HTML (SSG mode)
- React is bundled separately for proper hydration
- Vendor chunks are split for caching (radix-ui, sanity, lucide-icons, etc.)
- Console logs are stripped in production
