import { PortableTextComponents } from '@portabletext/react';
import type { Locale } from './seo';
import { urlFor } from './sanity';

export function getPortableTextComponents(locale: Locale): PortableTextComponents {
  return {
    block: {
      h1: ({ children }) => (
        <h1 class="text-4xl sm:text-5xl font-bold text-foreground mb-6 mt-8">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-6 mt-12 pt-8 border-t border-border/50">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 class="text-2xl sm:text-3xl font-semibold text-foreground mb-4 mt-12 relative pl-4 border-l-4 border-primary/30">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 class="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-8">{children}</h4>
      ),
      normal: ({ children }) => (
        <p class="text-foreground leading-relaxed mb-6 text-base">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote class="border-l-4 border-primary bg-muted/30 pl-6 pr-4 py-4 italic text-foreground my-8 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul class="list-none ml-0 space-y-4 text-foreground mb-8 mt-6 pl-0">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol class="list-decimal ml-6 md:ml-8 space-y-4 text-foreground mb-8 mt-6 marker:text-primary marker:font-semibold">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li class="text-foreground leading-relaxed list-none flex items-start gap-3">
          <span class="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-[0.6em]"></span>
          <span class="flex-1">{children}</span>
        </li>
      ),
      number: ({ children }) => (
        <li class="text-foreground leading-relaxed pl-2">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong class="font-semibold text-foreground bg-primary/10 px-1.5 py-0.5 rounded">{children}</strong>
      ),
      em: ({ children }) => <em class="italic">{children}</em>,
      link: ({ value, children }) => {
        const href = value?.href || '#';
        const isExternal = href.startsWith('http');
        return (
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            class="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors"
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
          />
        );
      },
      table: ({ value }) => {
        const { rows } = value;
        if (!rows || !Array.isArray(rows) || rows.length === 0) return null;

        // Determine if first row should be header (common pattern)
        const hasHeader = rows.length > 0;
        const headerRow = hasHeader ? rows[0] : null;
        const dataRows = hasHeader ? rows.slice(1) : rows;

        return (
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-border rounded-lg overflow-hidden bg-card">
              {headerRow && (
                <thead>
                  <tr className="bg-muted/50">
                    {headerRow.cells.map((cell: string, index: number) => (
                      <th
                        key={index}
                        className="border border-border px-4 py-3 text-left font-semibold text-foreground"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {dataRows.map((row: { cells: string[] }, rowIndex: number) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"}
                  >
                    {row.cells.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="border border-border px-4 py-3 text-foreground"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
    },
  };
}

