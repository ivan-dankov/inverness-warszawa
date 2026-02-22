import { PortableTextComponents } from '@portabletext/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Locale } from './seo';
import { urlFor, type TranslationMappings } from './sanity';

// Helper to check if text looks like a markdown table
function isMarkdownTable(text: string): boolean {
  const lines = text.trim().split('\n').filter(line => line.trim().length > 0);
  if (lines.length < 2) return false;

  // Check if at least 2 lines contain pipe characters
  const linesWithPipes = lines.filter(line => line.trim().includes('|'));
  if (linesWithPipes.length < 2) return false;

  // Check if we have a separator line (with dashes/colons)
  const hasSeparator = lines.some(line => {
    const trimmed = line.trim();
    return trimmed.match(/^\|[\s\-:]+(\|[\s\-:]+)*\|?$/) || trimmed.match(/^[\s\-:]+(\|[\s\-:]+)*\|?$/);
  });

  // If we have separator, it's definitely a table
  if (hasSeparator) return true;

  // If we have multiple lines with pipes and similar structure, likely a table
  if (linesWithPipes.length >= 2) {
    const firstLinePipes = (linesWithPipes[0].match(/\|/g) || []).length;
    // Check if other lines have similar pipe count
    const similarPipeCount = linesWithPipes.slice(1).every(line => {
      const pipeCount = (line.match(/\|/g) || []).length;
      return Math.abs(pipeCount - firstLinePipes) <= 1; // Allow 1 pipe difference
    });
    return similarPipeCount;
  }

  return false;
}

// Helper to extract plain text from Portable Text children, preserving structure
function extractText(children: any, preserveNewlines: boolean = true): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    const separator = preserveNewlines ? '\n' : '';
    return children.map(child => extractText(child, preserveNewlines)).join(separator);
  }
  if (children?.props?.children) {
    return extractText(children.props.children, preserveNewlines);
  }
  if (children?.children) {
    return extractText(children.children, preserveNewlines);
  }
  // For block-level elements, add newline
  if (preserveNewlines && (children?.type === 'block' || children?.nodeType === 'block')) {
    return '\n';
  }
  return '';
}

export function getPortableTextComponents(locale: Locale, translationMappings?: TranslationMappings): PortableTextComponents {
  return {
    block: {
      h1: ({ children }) => (
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 mt-8">{children}</h2>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 mt-12 pt-8 border-t border-border/50">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-12 relative pl-4 border-l-4 border-primary/30">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-8">{children}</h4>
      ),
      normal: ({ children, value }) => {
        // Try to extract text with newlines preserved for table detection
        const text = extractText(children, true);

        // Check if this is a markdown table
        if (isMarkdownTable(text)) {
          // Clean up the text - remove extra whitespace but preserve structure
          const cleanedText = text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');

          return (
            <div className="my-8 overflow-x-auto">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ children }) => (
                    <table className="min-w-full border-collapse border border-border rounded-lg overflow-hidden bg-card">
                      {children}
                    </table>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-muted/50">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="[&>tr:nth-child(even)]:bg-muted/20">
                      {children}
                    </tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="border-b border-border hover:bg-muted/10 transition-colors">
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-4 py-3 text-foreground">
                      {children}
                    </td>
                  ),
                }}
              >
                {cleanedText}
              </ReactMarkdown>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p className="text-foreground leading-relaxed mb-6 text-base">{children}</p>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary bg-muted/30 pl-6 pr-4 py-4 italic text-foreground my-8 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-none ml-0 space-y-4 text-foreground mb-8 mt-6 pl-0">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal ml-6 md:ml-8 space-y-4 text-foreground mb-8 mt-6 marker:text-primary marker:font-semibold">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="text-foreground leading-relaxed list-none flex items-start gap-3">
          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-[0.6em]"></span>
          <span className="flex-1">{children}</span>
        </li>
      ),
      number: ({ children }) => (
        <li className="text-foreground leading-relaxed pl-2">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-foreground bg-primary/10 px-1.5 py-0.5 rounded">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => {
        let href = value?.href || '#';
        const isExternal = href.startsWith('http');

        // Dynamic Link Resolution for internal blog links
        if (!isExternal && translationMappings) {
          // Check if it's an internal blog link (e.g. /pl/blog/jakies-id or /blog/some-slug)
          const blogMatch = href.match(/(?:\/[a-z]{2})?\/blog\/([^/?#]+)/);

          if (blogMatch && blogMatch[1]) {
            const originalSlug = blogMatch[1];
            const groupId = translationMappings.slugToGroupId[originalSlug];

            if (groupId) {
              const localizedSlug = translationMappings.groupIdToSlugs[groupId]?.[locale];
              if (localizedSlug) {
                // Rewrite the URL to guarantee the correct slug for the current locale
                // Maintain any hash or query parameters from the original href
                const urlParts = href.split(originalSlug);
                const suffix = urlParts[1] || '';
                href = `/${locale}/blog/${localizedSlug}${suffix}`;
              }
            }
          }
        }

        return (
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        return (
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            className="rounded-xl my-10 max-w-full h-auto shadow-lg border border-border/30"
            loading="lazy"
            decoding="async"
          />
        );
      },
      table: ({ value }) => {
        const { rows } = value || {};
        if (!rows || !Array.isArray(rows) || rows.length === 0) return null;

        // Determine if first row should be header (common pattern)
        // Check if we have at least 2 rows - if so, first is likely header
        const hasHeader = rows.length > 1;
        const headerRow = hasHeader ? rows[0] : null;
        const dataRows = hasHeader ? rows.slice(1) : rows;

        // Ensure all rows have cells array
        const safeRows = rows.filter((row: any) => row && Array.isArray(row.cells) && row.cells.length > 0);
        if (safeRows.length === 0) return null;

        return (
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-border rounded-lg overflow-hidden bg-card">
              {headerRow && headerRow.cells && Array.isArray(headerRow.cells) && (
                <thead>
                  <tr className="bg-muted/50">
                    {headerRow.cells.map((cell: string, index: number) => (
                      <th
                        key={index}
                        className="border border-border px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap"
                      >
                        {cell || ''}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {dataRows.map((row: { cells?: string[] }, rowIndex: number) => {
                  if (!row || !Array.isArray(row.cells) || row.cells.length === 0) return null;
                  return (
                    <tr
                      key={rowIndex}
                      className={`border-b border-border ${rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/30 transition-colors`}
                    >
                      {row.cells.map((cell: string, cellIndex: number) => (
                        <td
                          key={cellIndex}
                          className="border border-border px-4 py-3 text-foreground"
                        >
                          {cell || ''}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      },
    },
  };
}

