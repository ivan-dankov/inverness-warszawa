import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { convertMarkdownToPortableText } from './convert-markdown-to-portable-text';

// OLD LOCAL FUNCTION REMOVED - using imported version instead

function parseInlineText(text: string): { spans: any[]; markDefs: any[] } {
  if (!text) return { spans: [], markDefs: [] };
  
  const spans: any[] = [];
  let i = 0;
  let currentText = '';
  let markDefs: any[] = [];
  let markDefCounter = 0;
  
  while (i < text.length) {
    // Bold: **text** or __text__
    if ((text.substring(i, i + 2) === '**' || text.substring(i, i + 2) === '__') && 
        i + 2 < text.length) {
      if (currentText) {
        spans.push({ _type: 'span', text: currentText, _key: generateKey() });
        currentText = '';
      }
      
      const marker = text.substring(i, i + 2);
      i += 2;
      let boldText = '';
      
      while (i < text.length) {
        if (text.substring(i, i + 2) === marker) {
          i += 2;
          break;
        }
        boldText += text[i];
        i++;
      }
      
      if (boldText) {
        spans.push({ 
          _type: 'span', 
          text: boldText, 
          marks: ['strong'],
          _key: generateKey()
        });
      }
    }
    // Italic: *text* or _text_
    else if ((text[i] === '*' || text[i] === '_') && 
             i + 1 < text.length && 
             text[i + 1] !== text[i]) {
      if (currentText) {
        spans.push({ _type: 'span', text: currentText, _key: generateKey() });
        currentText = '';
      }
      
      const marker = text[i];
      i++;
      let italicText = '';
      
      while (i < text.length && text[i] !== marker) {
        italicText += text[i];
        i++;
      }
      
      if (i < text.length) i++;
      
      if (italicText) {
        spans.push({ 
          _type: 'span', 
          text: italicText, 
          marks: ['em'],
          _key: generateKey()
        });
      }
    }
    // Link: [text](url)
    else if (text[i] === '[') {
      if (currentText) {
        spans.push({ _type: 'span', text: currentText, _key: generateKey() });
        currentText = '';
      }
      
      i++;
      let linkText = '';
      while (i < text.length && text[i] !== ']') {
        linkText += text[i];
        i++;
      }
      i++;
      
      if (text[i] === '(') {
        i++;
        let linkUrl = '';
        while (i < text.length && text[i] !== ')') {
          linkUrl += text[i];
          i++;
        }
        if (i < text.length) i++;
        
        const markKey = `link-${markDefCounter++}`;
        markDefs.push({
          _key: markKey,
          _type: 'link',
          href: linkUrl,
        });
        
        spans.push({ 
          _type: 'span', 
          text: linkText, 
          marks: [markKey],
          _key: generateKey()
        });
      }
    }
    else {
      currentText += text[i];
      i++;
    }
  }
  
  if (currentText) {
    spans.push({ _type: 'span', text: currentText, _key: generateKey() });
  }
  
  if (spans.length === 0) {
    spans.push({ _type: 'span', text: text, _key: generateKey() });
  }
  
  return { spans, markDefs };
}

// REMOVED: Local function that was shadowing the imported one
// Now using the imported convertMarkdownToPortableText from './convert-markdown-to-portable-text'
/*
async function convertMarkdownToPortableText_OLD(markdown: string): Promise<any[]> {
  const blocks: any[] = [];
  const lines = markdown.split('\n');
  
  let currentParagraph: string[] = [];
  let currentListItems: string[] = [];
  let listType: 'bullet' | 'number' | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (!trimmed) {
      if (currentListItems.length > 0) {
        currentListItems.forEach((itemText) => {
          const { spans, markDefs } = parseInlineText(itemText);
          const block: any = {
            _type: 'block',
            _key: generateKey(),
            listItem: listType || 'bullet',
            children: spans,
          };
          if (markDefs.length > 0) {
            block.markDefs = markDefs;
          }
          blocks.push(block);
        });
        currentListItems = [];
        listType = null;
      }
      
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        const { spans, markDefs } = parseInlineText(text);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: spans,
          markDefs: markDefs,
        });
        currentParagraph = [];
      }
      continue;
    }
    
    if (trimmed.startsWith('# ')) {
      if (currentListItems.length > 0) {
        currentListItems.forEach((itemText) => {
          const { spans, markDefs } = parseInlineText(itemText);
          const block: any = {
            _type: 'block',
            _key: generateKey(),
            listItem: listType || 'bullet',
            children: spans,
          };
          if (markDefs.length > 0) {
            block.markDefs = markDefs;
          }
          blocks.push(block);
        });
        currentListItems = [];
        listType = null;
      }
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        const { spans, markDefs } = parseInlineText(text);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: spans,
          markDefs: markDefs,
        });
        currentParagraph = [];
      }
      
      const { spans, markDefs } = parseInlineText(trimmed.substring(2));
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h1',
        children: spans,
        markDefs: markDefs,
      });
    } else if (trimmed.startsWith('## ')) {
      if (currentListItems.length > 0) {
        currentListItems.forEach((itemText) => {
          const { spans, markDefs } = parseInlineText(itemText);
          const block: any = {
            _type: 'block',
            _key: generateKey(),
            listItem: listType || 'bullet',
            children: spans,
          };
          if (markDefs.length > 0) {
            block.markDefs = markDefs;
          }
          blocks.push(block);
        });
        currentListItems = [];
        listType = null;
      }
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        const { spans, markDefs } = parseInlineText(text);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: spans,
          markDefs: markDefs,
        });
        currentParagraph = [];
      }
      
      const { spans, markDefs } = parseInlineText(trimmed.substring(3));
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        children: spans,
        markDefs: markDefs,
      });
    } else if (trimmed.startsWith('### ')) {
      if (currentListItems.length > 0) {
        currentListItems.forEach((itemText) => {
          const { spans, markDefs } = parseInlineText(itemText);
          const block: any = {
            _type: 'block',
            _key: generateKey(),
            listItem: listType || 'bullet',
            children: spans,
          };
          if (markDefs.length > 0) {
            block.markDefs = markDefs;
          }
          blocks.push(block);
        });
        currentListItems = [];
        listType = null;
      }
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        const { spans, markDefs } = parseInlineText(text);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: spans,
          markDefs: markDefs,
        });
        currentParagraph = [];
      }
      
      const { spans, markDefs } = parseInlineText(trimmed.substring(4));
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        children: spans,
        markDefs: markDefs,
      });
    } else if (trimmed.match(/^[-*]\s/)) {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        const { spans, markDefs } = parseInlineText(text);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: spans,
          markDefs: markDefs,
        });
        currentParagraph = [];
      }
      
      if (listType !== 'bullet') {
        if (currentListItems.length > 0 && listType) {
          currentListItems.forEach((itemText) => {
            const { spans, markDefs } = parseInlineText(itemText);
            const block: any = {
              _type: 'block',
              _key: generateKey(),
              listItem: listType,
              children: spans,
            };
            if (markDefs.length > 0) {
              block.markDefs = markDefs;
            }
            blocks.push(block);
          });
        }
        currentListItems = [];
        listType = 'bullet';
      }
      
      currentListItems.push(trimmed.substring(2));
    } else if (trimmed.match(/^\d+\.\s/)) {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        const { spans, markDefs } = parseInlineText(text);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: spans,
          markDefs: markDefs,
        });
        currentParagraph = [];
      }
      
      if (listType !== 'number') {
        if (currentListItems.length > 0 && listType) {
          currentListItems.forEach((itemText) => {
            const { spans, markDefs } = parseInlineText(itemText);
            const block: any = {
              _type: 'block',
              _key: generateKey(),
              listItem: listType,
              children: spans,
            };
            if (markDefs.length > 0) {
              block.markDefs = markDefs;
            }
            blocks.push(block);
          });
        }
        currentListItems = [];
        listType = 'number';
      }
      
      const match = trimmed.match(/^\d+\.\s(.*)/);
      if (match) {
        currentListItems.push(match[1]);
      }
    } else {
      if (currentListItems.length > 0) {
        currentListItems.forEach((itemText) => {
          const { spans, markDefs } = parseInlineText(itemText);
          const block: any = {
            _type: 'block',
            _key: generateKey(),
            listItem: listType || 'bullet',
            children: spans,
          };
          if (markDefs.length > 0) {
            block.markDefs = markDefs;
          }
          blocks.push(block);
        });
        currentListItems = [];
        listType = null;
      }
      
      currentParagraph.push(trimmed);
    }
  }
  
  if (currentListItems.length > 0) {
    currentListItems.forEach((itemText) => {
      const { spans, markDefs } = parseInlineText(itemText);
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: listType || 'bullet',
        children: spans,
        markDefs: markDefs.length > 0 ? markDefs : undefined,
      });
    });
  }
  
  if (currentParagraph.length > 0) {
    const text = currentParagraph.join(' ');
    const { spans, markDefs } = parseInlineText(text);
        const block: any = {
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: spans,
        };
        if (markDefs.length > 0) {
          block.markDefs = markDefs;
        }
        blocks.push(block);
  }
  
  return blocks;
}
*/

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function updatePostFormatting() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN environment variable is required');
    process.exit(1);
  }

  const posts = [
    {
      path: join(process.cwd(), 'content/blog/pl/jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa.md'),
      locale: 'pl' as const,
      slug: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
    },
    {
      path: join(process.cwd(), 'content/blog/uk/yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava.md'),
      locale: 'uk' as const,
      slug: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
    },
    {
      path: join(process.cwd(), 'content/blog/ru/kak-podgotovit-rebenka-k-prokolu-ushey-varshava.md'),
      locale: 'ru' as const,
      slug: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava',
    },
    {
      path: join(process.cwd(), 'content/blog/en/how-to-prepare-a-child-for-ear-piercing-warsaw.md'),
      locale: 'en' as const,
      slug: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
    },
  ];

  console.log('🔄 Updating blog posts with improved formatting...\n');

  for (const postInfo of posts) {
    try {
      // Find existing post
      const existingPost = await client.fetch(
        `*[_type == "post" && slug.current == $slug && locale == $locale][0]`,
        { slug: postInfo.slug, locale: postInfo.locale }
      );

      if (!existingPost) {
        console.log(`⚠️  Post not found: ${postInfo.slug} (${postInfo.locale}), skipping`);
        continue;
      }

      console.log(`📝 Updating: ${existingPost.title}`);

      // Read markdown file
      const fileContent = readFileSync(postInfo.path, 'utf-8');
      const { content } = matter(fileContent);

      // Convert to portable text using Sanity's official block-tools
      let portableText;
      try {
        console.log(`  Calling converter with content length: ${content.length}`);
        portableText = convertMarkdownToPortableText(content);
        console.log(`  Converter returned type:`, typeof portableText);
        console.log(`  Is array:`, Array.isArray(portableText));
        console.log(`  Converter returned:`, portableText ? `${portableText.length} blocks` : 'undefined');
        if (portableText && Array.isArray(portableText)) {
          const listItems = portableText.filter((b: any) => b.listItem);
          console.log(`  List items in result: ${listItems.length}`);
        } else if (portableText) {
          console.log(`  Value:`, JSON.stringify(portableText).substring(0, 200));
        }
      } catch (err: any) {
        console.error(`  ❌ Converter error:`, err.message);
        console.error(`  Stack:`, err.stack?.substring(0, 200));
        continue;
      }

      if (!portableText || !Array.isArray(portableText) || portableText.length === 0) {
        console.error(`  ❌ Invalid conversion result - skipping`);
        continue;
      }

      const listItems = portableText.filter((b: any) => b.listItem);
      console.log(`  Found ${listItems.length} list items`);

      // Update the post
      const result = await client
        .patch(existingPost._id)
        .set({ content: portableText })
        .commit();

      console.log(`✅ Updated: ${existingPost.title} (${result.content?.length || 0} blocks)\n`);
    } catch (error: any) {
      console.error(`❌ Error updating ${postInfo.slug}:`, error.message);
      if (error.details) {
        console.error('  Details:', error.details);
      }
    }
  }

  console.log('✅ All posts updated!');
}

updatePostFormatting().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

