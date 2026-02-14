import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import matter from 'gray-matter';

const fileContent = readFileSync('/Users/ivandankov/Downloads/Article_7_EN.md', 'utf-8');
const { content: markdown } = matter(fileContent);

// Find the code block section
const codeBlockStart = markdown.indexOf('**Gun - Actual Final Cost:**');
const codeBlockSection = markdown.substring(codeBlockStart, codeBlockStart + 200);

console.log('Markdown section:');
console.log(codeBlockSection);
console.log('\n---\n');

// Convert to HTML
const html = marked(codeBlockSection, { gfm: true });
console.log('HTML output:');
console.log(html);
console.log('\n---\n');

// Parse HTML
const dom = new JSDOM();
const parser = new dom.window.DOMParser();
const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
const container = doc.querySelector('div');

const preElements = container.querySelectorAll('pre');
console.log(`Found ${preElements.length} <pre> elements:`);
preElements.forEach((pre, i) => {
  console.log(`\nPre ${i + 1}:`);
  console.log('  OuterHTML:', pre.outerHTML.substring(0, 150));
  const code = pre.querySelector('code');
  console.log('  Has <code>:', !!code);
  if (code) {
    console.log('  Code text:', code.textContent?.substring(0, 100));
  }
  console.log('  TextContent:', pre.textContent?.substring(0, 100));
});


