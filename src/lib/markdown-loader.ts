/**
 * Utility functions for loading and parsing Markdown blog articles
 */

export interface BlogArticle {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string;
  lang: string;
  body: string;
}

/**
 * Load all blog articles from Markdown files
 * Uses Vite's import.meta.glob for runtime loading
 */
export async function loadBlogArticles(): Promise<BlogArticle[]> {
  // Use glob to import all markdown files as raw text
  // Use eager: true to ensure all files are included in production build
  // Paths in import.meta.glob are relative to the file using it (src/lib/)
  // IMPORTANT: In production, Vite may not properly handle eager loading with query params
  // So we use the deprecated but more reliable 'as: raw' syntax
  const modules = import.meta.glob('../content/blog/**/*.md', { 
    eager: true,
    as: 'raw'
  }) as Record<string, string>;

  const moduleKeys = Object.keys(modules);
  console.log(`[Markdown Loader] Found ${moduleKeys.length} markdown modules`);
  console.log(`[Markdown Loader] Module keys:`, moduleKeys);
  
  if (moduleKeys.length === 0) {
    console.error('[Markdown Loader] CRITICAL: No modules found! This means markdown files are not being loaded.');
    return [];
  }
  
  // Log first module to verify it's working
  const firstKey = moduleKeys[0];
  const firstContent = modules[firstKey];
  console.log(`[Markdown Loader] First module key: ${firstKey}`);
  console.log(`[Markdown Loader] First module type: ${typeof firstContent}`);
  if (typeof firstContent === 'string') {
    console.log(`[Markdown Loader] First module content length: ${firstContent.length}`);
    console.log(`[Markdown Loader] First module content preview: ${firstContent.substring(0, 100)}...`);
  }

  const articles: BlogArticle[] = [];

  for (const path in modules) {
    try {
      // With eager: true and as: 'raw', content should be a string
      const moduleContent = modules[path];
      
      if (!moduleContent || typeof moduleContent !== 'string') {
        console.warn(`[Markdown Loader] Invalid content for ${path}, type: ${typeof moduleContent}`);
        continue;
      }
      
      const content = moduleContent;
      
      if (!content || typeof content !== 'string') {
        console.warn(`No valid content found for ${path}, type:`, typeof content);
        continue;
      }
      
      // Parse frontmatter and body
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!frontmatterMatch) {
        console.warn(`No frontmatter found in ${path}, content length:`, content.length);
        continue;
      }

      const frontmatter = frontmatterMatch[1];
      const body = frontmatterMatch[2];

      // Extract frontmatter fields
      const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
      const slugMatch = frontmatter.match(/slug:\s*["'](.+?)["']/);
      const excerptMatch = frontmatter.match(/excerpt:\s*["'](.+?)["']/);
      const dateMatch = frontmatter.match(/date:\s*["'](.+?)["']/);
      const imageMatch = frontmatter.match(/image:\s*["'](.+?)["']/);
      const langMatch = frontmatter.match(/lang:\s*["'](.+?)["']/);

      // Extract language from path
      const langFromPath = path.match(/content\/blog\/(pl|en|uk|ru)\//)?.[1] || langMatch?.[1] || 'pl';

      if (titleMatch && slugMatch) {
        articles.push({
          title: titleMatch[1],
          slug: slugMatch[1],
          excerpt: excerptMatch?.[1] || '',
          date: dateMatch?.[1] || '',
          image: imageMatch?.[1] || '',
          lang: langFromPath,
          body,
        });
        console.log(`✓ Loaded article: ${titleMatch[1]} (${langFromPath})`);
      } else {
        console.warn(`Missing title or slug in ${path}`, { titleMatch, slugMatch });
      }
    } catch (error) {
      console.error(`Failed to load article from ${path}:`, error);
    }
  }

  console.log(`✓ Loaded ${articles.length} blog articles total`);
  return articles;
}

/**
 * Load a specific blog article by slug and language
 */
export async function loadBlogArticle(slug: string, lang: string): Promise<BlogArticle | null> {
  const articles = await loadBlogArticles();
  return articles.find(article => article.slug === slug && article.lang === lang) || null;
}

/**
 * Load all articles for a specific language
 */
export async function loadBlogArticlesByLang(lang: string): Promise<BlogArticle[]> {
  const articles = await loadBlogArticles();
  return articles.filter(article => article.lang === lang).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
