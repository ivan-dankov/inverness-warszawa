import { sanityClient } from '../../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { Locale } from './seo';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any): ImageUrlBuilder {
  return builder.image(source);
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
  const query = `*[_type == "post" && locale == $locale] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    locale,
    translationGroupId,
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
  const query = `*[_type == "post" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    "slug": slug.current,
    locale,
    translationGroupId,
    excerpt,
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

