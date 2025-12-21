import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { convertMarkdownToPortableText } from './convert-markdown-to-portable-text';

const filePath = join(process.cwd(), 'content/blog/en/how-to-prepare-a-child-for-ear-piercing-warsaw.md');
const fileContent = readFileSync(filePath, 'utf-8');
const { content } = matter(fileContent);

console.log('Converting markdown...');
const blocks = convertMarkdownToPortableText(content);

console.log(`\nConverted to ${blocks.length} blocks`);
console.log('\nFirst 10 blocks:');
blocks.slice(0, 10).forEach((block: any, i: number) => {
  console.log(`\nBlock ${i}:`, {
    _type: block._type,
    style: block.style,
    listItem: block.listItem,
    childrenCount: block.children?.length,
    firstChildText: block.children?.[0]?.text?.substring(0, 50),
  });
});

const listBlocks = blocks.filter((b: any) => b.listItem);
console.log(`\n\nFound ${listBlocks.length} list items`);
if (listBlocks.length > 0) {
  console.log('\nFirst list item:');
  console.log(JSON.stringify(listBlocks[0], null, 2));
}

