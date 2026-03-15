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
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
  };
  author?: Author;
  relatedArticles?: Post[];
  structuredDataJson?: string; // JSON string from Sanity
}

export interface PostTranslationGroup {
  [locale: string]: Post;
}

/**
 * Get all posts
 * Optimized: Only fetches necessary fields, images should be sized via urlFor() helper
 */
export async function getAllPosts(): Promise<Post[]> {
  const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
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
    "seo": {
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
    }
  }`;

  return await sanityClient.fetch(query);
}

/**
 * Get all posts by locale
 * Optimized: Only fetches necessary fields, images include metadata for sizing
 */
export async function getPostsByLocale(locale: Locale): Promise<Post[]> {
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && locale == $locale] | order(publishedAt desc) {
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
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug && locale == $locale][0] {
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
    "seo": {
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
    },
    structuredDataJson,
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
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && translationGroupId == $translationGroupId] {
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
  const query = `*[_type == "post" && !(_id in path("drafts.**"))] {
    locale,
    "slug": slug.current
  }`;

  const results = await sanityClient.fetch(query);
  return results.map((post: { locale: string; slug: string }) => ({
    locale: post.locale as Locale,
    slug: post.slug,
  }));
}

export interface TranslationMappings {
  slugToGroupId: Record<string, string>; // e.g. "piercing-uszu" -> "group-123"
  groupIdToSlugs: Record<string, Record<Locale, string>>; // e.g. "group-123" -> { pl: "piercing-uszu", en: "ear-piercing" }
}

/**
 * Fetch a mapping of all posts to resolve internal links dynamically.
 */
export async function getAllPostTranslationMappings(): Promise<TranslationMappings> {
  const query = `*[_type == "post" && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    locale,
    translationGroupId
  }`;

  const posts = await sanityClient.fetch(query);

  const mappings: TranslationMappings = {
    slugToGroupId: {},
    groupIdToSlugs: {}
  };

  posts.forEach((post: { slug: string; locale: Locale; translationGroupId: string }) => {
    if (!post.slug || !post.translationGroupId || !post.locale) return;

    // Map the slug to its group ID
    mappings.slugToGroupId[post.slug] = post.translationGroupId;

    // Map the group ID to its localized slugs
    if (!mappings.groupIdToSlugs[post.translationGroupId]) {
      mappings.groupIdToSlugs[post.translationGroupId] = {} as Record<Locale, string>;
    }
    mappings.groupIdToSlugs[post.translationGroupId][post.locale] = post.slug;
  });

  return mappings;
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

// Note: SEO, FAQs, and site settings are now managed in code
// Only blog-related functions remain in this file

