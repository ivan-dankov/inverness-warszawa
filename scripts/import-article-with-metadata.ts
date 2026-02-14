import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { convertMarkdownToPortableText } from './convert-markdown-to-portable-text';

const getClient = () => {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error('SANITY_API_TOKEN is required');
  }

  return createClient({
    projectId: 'nfwijj0y',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: token,
  });
};

const client = getClient();

type Locale = 'pl' | 'uk' | 'ru' | 'en';

interface ArticleMetadata {
  title: string;
  content: string; // Markdown content only (before first ---)
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
  structuredDataJson: string;
}

/**
 * Parse article markdown file with metadata sections
 * Expected structure:
 * # Title
 * Content...
 * ---
 * ## 📊 SEO METADATA
 * ### Meta Title
 * ...
 * ## 🔥 JSON-LD Schema
 * ...
 */
function parseArticleMarkdown(filePath: string): ArticleMetadata {
  const fileContent = readFileSync(filePath, 'utf-8');

  // Split by first --- separator
  const parts = fileContent.split(/^---$/m);

  if (parts.length < 2) {
    throw new Error('Article must have content and metadata sections separated by ---');
  }

  const content = parts[0].trim();
  const metadataSections = parts.slice(1).join('---').trim();

  // Extract title from content (first H1)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '';

  if (!title) {
    throw new Error('Article must have an H1 title');
  }

  // Extract metadata fields
  const metaTitle = extractMetadataField(metadataSections, 'Meta Title');
  const metaDescription = extractMetadataField(metadataSections, 'Meta Description');
  const excerpt = extractMetadataField(metadataSections, 'Excerpt');
  const urlSlug = extractMetadataField(metadataSections, 'URL Slug');

  // Extract JSON-LD Schema (handle both with and without emoji)
  const schemaMatch = metadataSections.match(/##\s+(?:🔥\s+)?JSON-LD Schema.*?```json\s*([\s\S]*?)```/s);
  const structuredDataJson = schemaMatch ? schemaMatch[1].trim() : '';

  // Validate JSON-LD if present
  if (structuredDataJson) {
    try {
      JSON.parse(structuredDataJson);
    } catch (error) {
      console.warn('Warning: JSON-LD is not valid JSON:', error);
    }
  }

  return {
    title,
    content,
    excerpt,
    metaTitle,
    metaDescription,
    urlSlug,
    structuredDataJson,
  };
}

/**
 * Extract a metadata field value from the metadata sections
 */
function extractMetadataField(metadataSections: string, fieldName: string): string {
  // Match pattern like: ### Meta Title (X characters)\nValue
  // or ### Meta Title\nValue
  const pattern = new RegExp(`###\\s+${fieldName}[^\\n]*\\n([^#]+?)(?=###|##|---|$)`, 's');
  const match = metadataSections.match(pattern);

  if (!match) {
    console.warn(`Warning: Could not find metadata field: ${fieldName}`);
    return '';
  }

  return match[1].trim();
}

/**
 * Get author by locale from Sanity
 */
async function getAuthorByLocale(locale: Locale): Promise<string> {
  // Try with the correct translation group first
  let author = await client.fetch(
    `*[_type == "author" && translationGroupId == "author-kseniya-askerka" && locale == $locale][0] {
      _id
    }`,
    { locale }
  );

  // Fallback to searching by name and locale or just translationGroupId "author"
  if (!author) {
    author = await client.fetch(
      `*[_type == "author" && translationGroupId == "author" && locale == $locale][0] {
        _id
      }`,
      { locale }
    );
  }

  // Final fallback: just find any author with matching locale
  if (!author) {
    author = await client.fetch(
      `*[_type == "author" && locale == $locale][0] {
        _id
      }`,
      { locale }
    );
  }

  if (!author) {
    throw new Error(`Author not found for locale: ${locale}`);
  }

  return author._id;
}

/**
 * Import article to Sanity
 */
async function importArticle(
  filePath: string,
  locale: Locale,
  translationGroupId: string
): Promise<void> {
  console.log(`\n📄 Processing article: ${filePath}`);
  console.log(`   Locale: ${locale}`);
  console.log(`   Translation Group: ${translationGroupId}`);

  // Parse the markdown file
  const metadata = parseArticleMarkdown(filePath);

  console.log(`   Title: ${metadata.title}`);
  console.log(`   Slug: ${metadata.urlSlug}`);

  console.log(`   Slug: '${metadata.urlSlug}'`);

  // Check if post already exists
  const existing = await client.fetch(
    `*[_type == "post" && slug.current == $slug && locale == $locale][0]`,
    { slug: metadata.urlSlug, locale }
  );

  if (existing) {
    console.log(`   ⚠️  Post already exists, skipping. Found ID: ${existing._id}, Slug: '${existing.slug.current}'`);
    return;
  }

  // Get author
  console.log(`   🔍 Looking up author for locale ${locale}...`);
  const authorId = await getAuthorByLocale(locale);
  console.log(`   ✓ Found author: ${authorId}`);

  // Convert content to portable text
  console.log(`   📝 Converting markdown to portable text...`);
  const portableText = convertMarkdownToPortableText(metadata.content);

  if (!portableText || !Array.isArray(portableText) || portableText.length === 0) {
    throw new Error('Failed to convert markdown to portable text');
  }

  console.log(`   ✓ Converted ${portableText.length} blocks`);

  // Create post document
  const post = {
    _type: 'post',
    title: metadata.title,
    slug: {
      _type: 'slug',
      current: metadata.urlSlug,
    },
    locale: locale,
    translationGroupId: translationGroupId,
    excerpt: metadata.excerpt,
    content: portableText,
    author: {
      _type: 'reference',
      _ref: authorId,
    },
    seo: {
      metaTitle: metadata.metaTitle,
      metaDescription: metadata.metaDescription,
    },
    structuredDataJson: metadata.structuredDataJson || undefined,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  console.log(`   💾 Creating post in Sanity...`);
  const result = await client.create(post);
  console.log(`   ✅ Created post: ${result._id}`);
  console.log(`   📍 View at: https://gentlepiercing.pl/${locale}/blog/${metadata.urlSlug}`);
}

/**
 * Main function to handle command line arguments
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse command line arguments
  let filePath = '';
  let locale: Locale = 'pl';
  let translationGroupId = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) {
      filePath = args[i + 1];
      i++;
    } else if (args[i] === '--locale' && args[i + 1]) {
      locale = args[i + 1] as Locale;
      i++;
    } else if (args[i] === '--group' && args[i + 1]) {
      translationGroupId = args[i + 1];
      i++;
    }
  }

  // Validate arguments
  if (!filePath) {
    console.error('❌ Error: --file argument is required');
    console.log('\nUsage:');
    console.log('  npx tsx scripts/import-article-with-metadata.ts --file <path> --locale <pl|en|uk|ru> --group <translationGroupId>');
    console.log('\nExample:');
    console.log('  npx tsx scripts/import-article-with-metadata.ts --file "Article_7.md" --locale pl --group "ear-piercing-cost-warsaw-2026"');
    process.exit(1);
  }

  if (!['pl', 'en', 'uk', 'ru'].includes(locale)) {
    console.error('❌ Error: --locale must be one of: pl, en, uk, ru');
    process.exit(1);
  }

  if (!translationGroupId) {
    console.error('❌ Error: --group argument is required');
    process.exit(1);
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
    console.log('Get your token from: https://sanity.io/manage');
    process.exit(1);
  }

  console.log('🚀 Starting article import...');

  try {
    await importArticle(filePath, locale, translationGroupId);
    console.log('\n✅ Article imported successfully!');
  } catch (error: any) {
    console.error('\n❌ Import failed:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

