import { marked } from 'marked';
import { JSDOM } from 'jsdom';

// Simple markdown to portable text converter using marked + manual conversion
export function convertMarkdownToPortableText(markdown: string): any[] {
  // Removed debug logging
  if (!markdown || typeof markdown !== 'string') {
    console.error('Invalid markdown input:', typeof markdown);
    return [];
  }

  // Set up DOM parser for Node.js (do it inside the function to avoid issues)
  const dom = new JSDOM();
  if (!global.DOMParser) {
    global.DOMParser = dom.window.DOMParser;
  }

  // Convert markdown to HTML
  let html: string;
  try {
    html = marked(markdown, {
      gfm: true,
      breaks: false,
    });
  } catch (err) {
    console.error('Marked conversion error:', err);
    return [];
  }

  // Parse HTML and convert to portable text
  const parser = new dom.window.DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const container = doc.querySelector('div')!;

  if (!container) {
    console.error('Failed to parse HTML');
    return [];
  }

  const blocks: any[] = [];
  let keyCounter = 0;

  function generateKey(): string {
    return `key-${keyCounter++}-${Math.random().toString(36).substring(2, 15)}`;
  }

  function parseNode(node: Node): void {
    if (node.nodeType === 3) {
      // Text node
      const text = node.textContent?.trim();
      if (text) {
        // Add to current block or create new one
        if (blocks.length === 0 || blocks[blocks.length - 1]._type !== 'block') {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [],
          });
        }
        const lastBlock = blocks[blocks.length - 1];
        if (lastBlock.children.length === 0 || lastBlock.children[lastBlock.children.length - 1].text) {
          lastBlock.children.push({
            _type: 'span',
            _key: generateKey(),
            text: text,
          });
        } else {
          lastBlock.children[lastBlock.children.length - 1].text += ' ' + text;
        }
      }
    } else if (node.nodeType === 1) {
      // Element node
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (tagName === 'h1') {
        const { spans, markDefs } = parseInlineNodes(element);
        const block: any = {
          _type: 'block',
          _key: generateKey(),
          style: 'h1',
          children: spans,
        };
        if (markDefs && markDefs.length > 0) {
          block.markDefs = markDefs;
        }
        blocks.push(block);
      } else if (tagName === 'h2') {
        const { spans, markDefs } = parseInlineNodes(element);
        const block: any = {
          _type: 'block',
          _key: generateKey(),
          style: 'h2',
          children: spans,
        };
        if (markDefs && markDefs.length > 0) {
          block.markDefs = markDefs;
        }
        blocks.push(block);
      } else if (tagName === 'h3') {
        const { spans, markDefs } = parseInlineNodes(element);
        const block: any = {
          _type: 'block',
          _key: generateKey(),
          style: 'h3',
          children: spans,
        };
        if (markDefs && markDefs.length > 0) {
          block.markDefs = markDefs;
        }
        blocks.push(block);
      } else if (tagName === 'h4') {
        const { spans, markDefs } = parseInlineNodes(element);
        const block: any = {
          _type: 'block',
          _key: generateKey(),
          style: 'h3', // Sanity schema only has h1, h2, h3, so h4 -> h3
          children: spans,
        };
        if (markDefs && markDefs.length > 0) {
          block.markDefs = markDefs;
        }
        blocks.push(block);
      } else if (tagName === 'ul') {
        Array.from(element.children).forEach((li) => {
          if (li.tagName.toLowerCase() === 'li') {
            const { spans, markDefs } = parseInlineNodes(li);
            const block: any = {
              _type: 'block',
              _key: generateKey(),
              listItem: 'bullet',
              level: 1,
              children: spans,
            };
            if (markDefs && markDefs.length > 0) {
              block.markDefs = markDefs;
            }
            blocks.push(block);
          }
        });
      } else if (tagName === 'ol') {
        Array.from(element.children).forEach((li) => {
          if (li.tagName.toLowerCase() === 'li') {
            const { spans, markDefs } = parseInlineNodes(li);
            const block: any = {
              _type: 'block',
              _key: generateKey(),
              listItem: 'number',
              level: 1,
              children: spans,
            };
            if (markDefs && markDefs.length > 0) {
              block.markDefs = markDefs;
            }
            blocks.push(block);
          }
        });
      } else if (tagName === 'p') {
        const { spans, markDefs } = parseInlineNodes(element);
        const block: any = {
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: spans,
        };
        if (markDefs && markDefs.length > 0) {
          block.markDefs = markDefs;
        }
        blocks.push(block);
      } else if (tagName === 'pre') {
        // Handle code blocks - try to convert cost comparison blocks to tables
        const codeElement = element.querySelector('code');
        const codeText = codeElement ? codeElement.textContent : element.textContent;
        if (codeText) {
          const lines = codeText.split('\n').filter(line => line.trim());
          
          // Check if this looks like a cost comparison table (has separator line and cost totals)
          const hasSeparator = lines.some(line => line.includes('─') || line.includes('='));
          const hasCostTotal = lines.some(line => {
            const upper = line.toUpperCase();
            return upper.includes('COST') || 
                   upper.includes('KOSZT') ||
                   upper.includes('ВАРТІСТЬ') ||
                   upper.includes('ВЫТРАТ') ||
                   upper.includes('РАЗОМ') ||
                   upper.includes('ИТОГО') ||
                   upper.includes('КОШТУЄ') ||
                   upper.includes('СТОИТ') ||
                   upper.includes('СТОИМОСТЬ') ||
                   upper.includes('ЗЛОТЫХ') ||
                   upper.includes('ЗЛОТИХ') ||
                   upper.includes('PLN');
          });
          
          // Also check if it has multiple lines with numbers (costs) - this is a cost comparison
          const hasMultipleCosts = lines.filter(line => {
            const trimmed = line.trim();
            return /[+\-]?\s*\d+[\d\s\-–]*(?:PLN|zł|злотих|злотых|EUR|USD|%)/i.test(trimmed);
          }).length >= 3;
          
          if (hasSeparator && (hasCostTotal || hasMultipleCosts) && lines.length >= 5) {
            // Convert to table format
            // First line is usually a header/description, last few lines are totals
            // Middle lines are items with costs
            const rows: any[] = [];
            
            // Find separator line index
            const separatorIndex = lines.findIndex(line => line.includes('─') || line.includes('='));
            
            // Items before separator
            const items = lines.slice(0, separatorIndex);
            // Totals after separator
            const totals = lines.slice(separatorIndex + 1);
            
            // Add item rows
            items.forEach(item => {
              const trimmed = item.trim();
              
              // Skip separator lines
              if (trimmed.includes('─') || trimmed.includes('=')) {
                return;
              }
              
              // Look for any value at the end: costs, percentages, time periods
              // Pattern: spaces + value (cost, %, time) at end of string
              const valuePattern = /(\s{2,}|:\s*)([<~+\-]?\s*\d+(?:-\d+)?[\d\s\-–]*(?:PLN|zł|злотих|злотых|EUR|USD|%|weeks?|tyg\.?|tygodni|недель|тижнів)(?:\s*\([^)]+\))?)\s*$/i;
              const match = trimmed.match(valuePattern);
              
              if (match) {
                // Found value at the end
                const value = match[2].trim();
                const itemText = trimmed.substring(0, match.index).trim();
                // Remove trailing colon if present
                const cleanItemText = itemText.replace(/:$/, '');
                
                rows.push({
                  _key: generateKey(),
                  _type: 'tableRow',
                  cells: [cleanItemText || trimmed, value]
                });
              } else {
                // No value found - keep as single row
                rows.push({
                  _key: generateKey(),
                  _type: 'tableRow',
                  cells: [trimmed, '']
                });
              }
            });
            
            // Add total rows
            totals.forEach(total => {
              const trimmed = total.trim();
              
              // Look for any value at the end: costs, percentages, time periods
              const valuePattern = /(\s{2,}|:\s*)([<~]?\s*\d+(?:-\d+)?[\d\s\-–]*(?:PLN|zł|злотих|злотых|EUR|USD|%|weeks?|tyg\.?|tygodni|недель|тижнів))(?:\s*\([^)]+\))?\s*$/i;
              const match = trimmed.match(valuePattern);
              
              if (match) {
                const value = match[2].trim();
                const totalText = trimmed.substring(0, match.index).trim();
                // Remove trailing colon if present
                const cleanTotalText = totalText.replace(/:$/, '');
                
                rows.push({
                  _key: generateKey(),
                  _type: 'tableRow',
                  cells: [cleanTotalText || trimmed, value]
                });
              } else {
                rows.push({
                  _key: generateKey(),
                  _type: 'tableRow',
                  cells: [trimmed, '']
                });
              }
            });
            
            if (rows.length > 1) {
              blocks.push({
                _type: 'table',
                _key: generateKey(),
                rows: rows
              });
            } else {
              // Fallback to regular text blocks if conversion fails
              lines.forEach((line) => {
                blocks.push({
                  _type: 'block',
                  _key: generateKey(),
                  style: 'normal',
                  children: [{ _type: 'span', _key: generateKey(), text: line }],
                });
              });
            }
          } else {
            // Regular code block - convert to text blocks
            lines.forEach((line) => {
              blocks.push({
                _type: 'block',
                _key: generateKey(),
                style: 'normal',
                children: [{ _type: 'span', _key: generateKey(), text: line }],
              });
            });
          }
        }
      } else if (tagName === 'table') {
        // Handle tables - convert to Sanity table format
        const rows: any[] = [];
        const tbody = element.querySelector('tbody') || element;
        const thead = element.querySelector('thead');
        
        // Process all rows (header + body)
        const allRows: Element[] = [];
        if (thead) {
          allRows.push(...Array.from(thead.querySelectorAll('tr')));
        }
        allRows.push(...Array.from(tbody.querySelectorAll('tr')));
        
        allRows.forEach((row) => {
          const cells: string[] = [];
          Array.from(row.querySelectorAll('th, td')).forEach((cell) => {
            cells.push(cell.textContent?.trim() || '');
          });
          if (cells.length > 0) {
            rows.push({
              _key: generateKey(),
              _type: 'tableRow',
              cells: cells
            });
          }
        });
        
        if (rows.length > 0) {
          blocks.push({
            _type: 'table',
            _key: generateKey(),
            rows: rows
          });
        }
      } else {
        // Recursively process children
        Array.from(node.childNodes).forEach(parseNode);
      }
    }
  }

  function parseInlineNodes(element: Element, parentBlock?: any): { spans: any[]; markDefs: any[] } {
    const spans: any[] = [];
    const markDefs: any[] = [];
    let linkCounter = 0;

    function processNode(node: Node): void {
      if (node.nodeType === 3) {
        // Text node
        const text = node.textContent;
        if (text && text.trim()) {
          spans.push({
            _type: 'span',
            _key: generateKey(),
            text: text,
          });
        }
      } else if (node.nodeType === 1) {
        const el = node as Element;
        const tag = el.tagName.toLowerCase();

        if (tag === 'strong' || tag === 'b') {
          Array.from(el.childNodes).forEach((child) => {
            if (child.nodeType === 3 && child.textContent?.trim()) {
              spans.push({
                _type: 'span',
                _key: generateKey(),
                text: child.textContent,
                marks: ['strong'],
              });
            } else {
              processNode(child);
            }
          });
        } else if (tag === 'em' || tag === 'i') {
          Array.from(el.childNodes).forEach((child) => {
            if (child.nodeType === 3 && child.textContent?.trim()) {
              spans.push({
                _type: 'span',
                _key: generateKey(),
                text: child.textContent,
                marks: ['em'],
              });
            } else {
              processNode(child);
            }
          });
        } else if (tag === 'a') {
          const href = el.getAttribute('href') || '#';
          const linkKey = `link-${linkCounter++}`;
          markDefs.push({
            _key: linkKey,
            _type: 'link',
            href: href,
          });
          Array.from(el.childNodes).forEach((child) => {
            if (child.nodeType === 3 && child.textContent?.trim()) {
              spans.push({
                _type: 'span',
                _key: generateKey(),
                text: child.textContent,
                marks: [linkKey],
              });
            } else {
              processNode(child);
            }
          });
        } else {
          Array.from(el.childNodes).forEach(processNode);
        }
      }
    }

    Array.from(element.childNodes).forEach(processNode);

    if (spans.length === 0) {
      const text = element.textContent?.trim();
      if (text) {
        spans.push({ _type: 'span', _key: generateKey(), text: text });
      }
    }

    return { spans, markDefs };
  }

  Array.from(container.childNodes).forEach(parseNode);

  if (blocks.length === 0) {
    // Fallback: create a simple block from the text
    const text = container.textContent?.trim();
    if (text) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [{ _type: 'span', _key: generateKey(), text: text }],
      });
    }
  }

  return blocks;
}

