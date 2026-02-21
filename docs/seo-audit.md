# Technical SEO Audit & Guidelines

Date: February 2026

## 1. Executive Summary

This document outlines the findings of a comprehensive technical SEO audit for `gentlepiercing.pl`. Overall, the project (built with Astro) exhibits a strong technical SEO foundation, including robust metadata handling, proper canonical tags, and extensive Schema.org JSON-LD implementations. A few technical issues were identified and addressed to ensure optimal search engine crawling and indexing.

## 2. Crawlability & Indexation

### 2.1 robots.txt
- **Status:** Resolved.
- **Finding:** The `robots.txt.ts` previously blocked the `/_astro/` directory (`Disallow: /_astro/`). 
- **Impact:** Search engines, particularly Googlebot, need access to CSS and JavaScript to render pages correctly (for Mobile-Friendly tests and Core Web Vitals assessment). Blocking these assets forces the bot to see an unstyled/raw HTML version of the page, which can negatively impact rankings.
- **Action:** Removed `Disallow: /_astro/` from `robots.txt.ts` to allow full asset crawling.

### 2.2 XML Sitemap
- **Status:** Good.
- **Finding:** A custom sitemap generator (`src/pages/sitemap.xml.ts`) correctly constructs absolute URLs across all supported locales (`pl`, `en`, `uk`, `ru`). It properly injects appropriate `priority` and `changefreq` based on page types (Home vs Services vs Blog).
- **Recommendation:** Ensure any newly created dynamic content types are added to this bespoke generator, as it acts independently of the standard `@astrojs/sitemap` integration.

## 3. On-Page SEO & Metadata

### 3.1 Canonical URLs
- **Status:** Good.
- **Finding:** The `BaseLayout.astro` correctly enforces absolute canonical URLs. The Astro config (`astro.config.mjs`) is set to `trailingSlash: 'never'`, and the canonical generator respects this by stripping trailing slashes. This prevents duplicate content issues resulting from trailing slash parity.

### 3.2 Hreflang Tags & Internationalization
- **Status:** Resolved.
- **Finding:** Static pages successfully use `generateAlternates()` from `src/config/seo.ts` to explicitly map their localized counterparts (e.g., `/pl/kontakt` mapping to `/en/contact`). However, the fallback function `getHreflangUrls` in `src/lib/seo.ts` blindly appended unprefixed localized paths (e.g., `/uslugi` to `/en/uslugi`), which would result in 404s and invalid hreflang tags if a developer forgot to explicitly define the translation mapping for a new page.
- **Action:** Modified `getHreflangUrls` so that it safely handles the root homepage and blog pages using `translationGroup`, but skips generating blind/invalid URLs for other unrecognized paths, preventing accidental broken hreflang clusters.

### 3.3 Meta Tags (Titles, Descriptions, Open Graph)
- **Status:** Good.
- **Finding:** `src/components/SEO.astro` efficiently outputs comprehensive metadata. It fully supports `og:image`, `twitter:card`, and uses localized variants when building Open Graph attributes.
- **Recommendation:** Continue using the explicitly defined overrides in page configurations (e.g. `const seo = { ... }`), keeping titles under 60 characters and descriptions under 160 characters.

## 4. Semantic HTML & Content Structure

- **Status:** Good.
- **Finding:** The application employs proper semantic HTML tags. The `BaseLayout.astro` wraps content in a standard `<main>` tag. The `Hero.astro` components utilize `<h1>` cleanly for primary page topics. Blog pages similarly enforce structured `<article>`, `<h1>`, and rich text configurations via PortableText.

## 5. Structured Data (Schema.org / JSON-LD)

- **Status:** Excellent.
- **Finding:** The site extensively utilizes structured data for:
  - `LocalBusiness` / `MedicalBusiness` / `HealthAndBeautyBusiness`
  - `Organization`
  - `BreadcrumbList`
  - `FAQPage`
  - `Service`
  - `BlogPosting` / `Article` (supporting `image`, `author`, `datePublished`)
- **Impact:** This deeply nested structured data strongly increases the chance of securing rich snippets (FAQs, Review Stars, Local Knowledge Graph).

## 6. Future Recommendations

1. **Performance & Core Web Vitals:** Continue monitoring performance since Astro typically ships zero client-side JavaScript by default. Ensure future integrations (like Google Analytics loaded in `BaseLayout`) maintain `async` or `defer` states.
2. **Missing Local Translations:** If expanding localized blog content, ensure `translationGroup` linkages in Sanity correctly align the documents across `pl`, `en`, `uk`, and `ru`.
3. **Automated Audits:** Periodically run Lighthouse CI and screaming frog / Ahrefs audits before major product launches to detect broken internal links or misconfigured hreflang setups early.
