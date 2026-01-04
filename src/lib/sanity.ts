import { sanityClient } from '../../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { Locale } from './seo';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any): ImageUrlBuilder {
  return builder.image(source);
}

export interface Author {
  _id: string;
  name: string;
  slug: string;
  locale: Locale;
  translationGroupId: string;
  title?: string;
  bio?: string;
  image?: any;
  email?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  locale: Locale;
  translationGroupId: string;
  excerpt: string;
  content: any[];
  coverImage: any;
  publishedAt: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: any;
  author: Author;
  relatedArticles?: Post[];
}

export interface PostTranslationGroup {
  [locale: string]: Post;
}

/**
 * Get all posts
 * Optimized: Only fetches necessary fields, images should be sized via urlFor() helper
 */
export async function getAllPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    locale,
    translationGroupId,
    excerpt,
    "author": author-> {
      _id,
      name,
      "slug": slug.current,
      locale,
      translationGroupId,
      title,
      bio,
      image {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      },
      email,
      social
    },
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    coverImage {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions
        }
      }
    },
    publishedAt,
    updatedAt,
    metaTitle,
    metaDescription,
    ogImage {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions
        }
      }
    }
  }`;

  return await sanityClient.fetch(query);
}

/**
 * Get all posts by locale
 * Optimized: Only fetches necessary fields, images include metadata for sizing
 */
export async function getPostsByLocale(locale: Locale): Promise<Post[]> {
  const query = `*[_type == "post" && locale == $locale && (!defined(author->locale) || author->locale == $locale)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    locale,
    translationGroupId,
    excerpt,
    "author": author-> {
      _id,
      name,
      "slug": slug.current,
      locale,
      translationGroupId,
      title,
      bio,
      image {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      },
      email,
      social
    },
    coverImage {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions
        }
      }
    },
    publishedAt,
    updatedAt,
    metaTitle,
    metaDescription,
    ogImage {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions
        }
      }
    }
  }`;

  return await sanityClient.fetch(query, { locale });
}

/**
 * Get a single post by slug and locale
 * Optimized: Includes image metadata, only fetches necessary related article fields
 */
export async function getPostBySlug(slug: string, locale: Locale): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug && locale == $locale && (!defined(author->locale) || author->locale == $locale)][0] {
    _id,
    title,
    "slug": slug.current,
    locale,
    translationGroupId,
    excerpt,
    "author": author-> {
      _id,
      name,
      "slug": slug.current,
      locale,
      translationGroupId,
      title,
      bio,
      image {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      },
      email,
      social
    },
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    coverImage {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions
        }
      }
    },
    publishedAt,
    updatedAt,
    metaTitle,
    metaDescription,
    ogImage {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions
        }
      }
    },
    "relatedArticles": relatedArticles[]-> {
      _id,
      title,
      "slug": slug.current,
      locale,
      excerpt,
      coverImage {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      },
      publishedAt
    }
  }`;

  const post = await sanityClient.fetch(query, { slug, locale });
  if (!post) return null;
  
  // Filter related articles to only show those in the same locale
  if (post.relatedArticles) {
    post.relatedArticles = post.relatedArticles.filter(
      (article: Post) => article.locale === locale && article.slug !== slug
    );
  }
  
  return post;
}

/**
 * Get all posts in a translation group
 * Optimized: Only fetches slug and locale for hreflang tags
 */
export async function getTranslationGroup(translationGroupId: string): Promise<PostTranslationGroup> {
  const query = `*[_type == "post" && translationGroupId == $translationGroupId] {
    _id,
    title,
    "slug": slug.current,
    locale,
    translationGroupId
  }`;

  const posts = await sanityClient.fetch(query, { translationGroupId });
  const group: PostTranslationGroup = {};

  posts.forEach((post: Post) => {
    group[post.locale] = post;
  });

  return group;
}

/**
 * Get all post slugs for static path generation
 */
export async function getAllPostSlugs(): Promise<Array<{ locale: Locale; slug: string }>> {
  const query = `*[_type == "post"] {
    locale,
    "slug": slug.current
  }`;

  const results = await sanityClient.fetch(query);
  return results.map((post: { locale: string; slug: string }) => ({
    locale: post.locale as Locale,
    slug: post.slug,
  }));
}

/**
 * Convert Sanity portable text to HTML
 * This is a simplified version - you may want to use @portabletext/react for more complex rendering
 */
export function portableTextToHtml(content: any[]): string {
  if (!content || !Array.isArray(content)) return '';

  return content
    .map((block) => {
      if (block._type === 'block') {
        const text = block.children.map((child: any) => child.text).join('');
        const style = block.style || 'normal';

        if (style === 'h1') return `<h1>${text}</h1>`;
        if (style === 'h2') return `<h2>${text}</h2>`;
        if (style === 'h3') return `<h3>${text}</h3>`;
        if (style === 'h4') return `<h4>${text}</h4>`;
        if (style === 'blockquote') return `<blockquote>${text}</blockquote>`;
        return `<p>${text}</p>`;
      }

      if (block._type === 'image') {
        const imageUrl = urlFor(block).width(1200).url();
        const alt = block.alt || '';
        return `<img src="${imageUrl}" alt="${alt}" />`;
      }

      return '';
    })
    .join('');
}

// SEO-related interfaces and queries

export interface PageSEO {
  _id: string;
  pageKey: 'home' | 'aftercare' | 'blog';
  locale: Locale;
  title: string;
  description: string;
  ogImage?: any;
}

export interface ServicePageSEO {
  _id: string;
  serviceSlug: string;
  locale: Locale;
  title: string;
  description: string;
  ogImage?: any;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  locale: Locale;
  order: number;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteUrl: string;
  organization: {
    name: string;
    logo?: any;
    logoWide?: any;
    instagram?: string;
  };
  business: {
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    telephone: string;
    openingHours: string;
    priceRange: string;
  };
  ratings: {
    ratingValue: string;
    reviewCount: string;
  };
}

/**
 * Get page SEO by page key and locale
 */
export async function getPageSEO(pageKey: 'home' | 'aftercare' | 'blog', locale: Locale): Promise<PageSEO | null> {
  const query = `*[_type == "pageSeo" && pageKey == $pageKey && locale == $locale][0] {
    _id,
    pageKey,
    locale,
    title,
    description,
    ogImage {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions
        }
      }
    }
  }`;

  return await sanityClient.fetch(query, { pageKey, locale });
}

/**
 * Get service page SEO by service slug and locale
 */
export async function getServicePageSEO(serviceSlug: string, locale: Locale): Promise<ServicePageSEO | null> {
  const query = `*[_type == "servicePageSeo" && serviceSlug == $serviceSlug && locale == $locale][0] {
    _id,
    serviceSlug,
    locale,
    title,
    description,
    ogImage {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions
        }
      }
    }
  }`;

  return await sanityClient.fetch(query, { serviceSlug, locale });
}

/**
 * Get all FAQs by locale, ordered by display order
 */
export async function getFAQsByLocale(locale: Locale): Promise<FAQ[]> {
  const query = `*[_type == "faq" && locale == $locale] | order(order asc) {
    _id,
    question,
    answer,
    locale,
    order
  }`;

  return await sanityClient.fetch(query, { locale });
}

/**
 * Get site settings (singleton document)
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteUrl,
    organization {
      name,
      logo {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      },
      logoWide {
        ...,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions
          }
        }
      },
      instagram
    },
    business {
      address {
        street,
        city,
        postalCode,
        country
      },
      telephone,
      openingHours,
      priceRange
    },
    ratings {
      ratingValue,
      reviewCount
    }
  }`;

  return await sanityClient.fetch(query);
}

