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
  // Use lazy loading (eager: false) to avoid loading all articles upfront
  // This significantly reduces initial bundle size - markdown files are only loaded when blog is accessed
  // Paths in import.meta.glob are relative to the file using it (src/lib/)
  const modules = import.meta.glob('../content/blog/**/*.md', { 
    eager: false,
    as: 'raw'
  }) as Record<string, () => Promise<string>>;

  const moduleKeys = Object.keys(modules);
  
  if (moduleKeys.length === 0) {
    console.error('[Markdown Loader] CRITICAL: No modules found! This means markdown files are not being loaded.');
    return [];
  }

  const articles: BlogArticle[] = [];

  // Load all markdown files in parallel for better performance
  const loadPromises = moduleKeys.map(async (path) => {
    try {
      // With eager: false, modules are functions that return promises
      const loadModule = modules[path];
      if (!loadModule || typeof loadModule !== 'function') {
        console.warn(`[Markdown Loader] Invalid module loader for ${path}`);
        return null;
      }
      
      const content = await loadModule();
      
      if (!content || typeof content !== 'string') {
        console.warn(`No valid content found for ${path}, type:`, typeof content);
        return null;
      }
      
      // Parse frontmatter and body
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!frontmatterMatch) {
        console.warn(`No frontmatter found in ${path}, content length:`, content.length);
        return null;
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
        return {
          title: titleMatch[1],
          slug: slugMatch[1],
          excerpt: excerptMatch?.[1] || '',
          date: dateMatch?.[1] || '',
          image: imageMatch?.[1] || '',
          lang: langFromPath,
          body,
        };
      } else {
        console.warn(`Missing title or slug in ${path}`, { titleMatch, slugMatch });
        return null;
      }
    } catch (error) {
      console.error(`Failed to load article from ${path}:`, error);
      return null;
    }
  });

  // Wait for all markdown files to load
  const loadedArticles = await Promise.all(loadPromises);
  
  // Filter out null results and add to articles array
  for (const article of loadedArticles) {
    if (article) {
      articles.push(article);
    }
  }

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
