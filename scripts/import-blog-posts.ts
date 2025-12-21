import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// Initialize Sanity client with write access
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

// Simple markdown to portable text converter
async function markdownToPortableText(markdown: string): Promise<any[]> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  const html = String(result);
  
  // Convert HTML to portable text blocks
  // This is a simplified version - you may want to use a more robust converter
  const blocks: any[] = [];
  const lines = markdown.split('\n');
  
  let currentParagraph: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (!trimmed) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        });
        currentParagraph = [];
      }
      continue;
    }
    
    if (trimmed.startsWith('# ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        });
        currentParagraph = [];
      }
      blocks.push({
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: trimmed.substring(2) }],
      });
    } else if (trimmed.startsWith('## ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        });
        currentParagraph = [];
      }
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: trimmed.substring(3) }],
      });
    } else if (trimmed.startsWith('### ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        });
        currentParagraph = [];
      }
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: trimmed.substring(4) }],
      });
    } else if (trimmed.startsWith('- ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        });
        currentParagraph = [];
      }
      blocks.push({
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', text: trimmed.substring(2) }],
      });
    } else {
      currentParagraph.push(trimmed);
    }
  }
  
  if (currentParagraph.length > 0) {
    blocks.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: currentParagraph.join(' ') }],
    });
  }
  
  return blocks;
}

// Convert markdown text with inline formatting to portable text spans
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
      // Save current text if any
      if (currentText) {
        spans.push({ _type: 'span', text: currentText, _key: generateKey() });
        currentText = '';
      }
      
      const marker = text.substring(i, i + 2);
      i += 2;
      let boldText = '';
      
      // Find closing marker
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
    // Italic: *text* or _text_ (but not ** or __)
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
      
      if (i < text.length) i++; // skip closing marker
      
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
      
      i++; // skip [
      let linkText = '';
      while (i < text.length && text[i] !== ']') {
        linkText += text[i];
        i++;
      }
      i++; // skip ]
      
      if (text[i] === '(') {
        i++; // skip (
        let linkUrl = '';
        while (i < text.length && text[i] !== ')') {
          linkUrl += text[i];
          i++;
        }
        if (i < text.length) i++; // skip )
        
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
  
  // If no spans were created, create a simple one
  if (spans.length === 0) {
    spans.push({ _type: 'span', text: text, _key: generateKey() });
  }
  
  return { spans, markDefs };
}

// Generate a unique key for blocks
function generateKey(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Better markdown to portable text converter
async function convertMarkdownToPortableText(markdown: string): Promise<any[]> {
  const blocks: any[] = [];
  const lines = markdown.split('\n');
  
  let currentParagraph: string[] = [];
  let currentListItems: string[] = [];
  let listType: 'bullet' | 'number' | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (!trimmed) {
      // Empty line - flush current content
      if (currentListItems.length > 0) {
        // Close list
        currentListItems.forEach((itemText) => {
          const { spans, markDefs } = parseInlineText(itemText);
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: listType || 'bullet',
            children: spans,
            markDefs: markDefs,
          });
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
    
    // Headers
    if (trimmed.startsWith('# ')) {
      // Flush any current content
      if (currentListItems.length > 0) {
        currentListItems.forEach((itemText) => {
          const { spans, markDefs } = parseInlineText(itemText);
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: listType || 'bullet',
            children: spans,
            markDefs: markDefs,
          });
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
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: listType || 'bullet',
            children: spans,
            markDefs: markDefs,
          });
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
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: listType || 'bullet',
            children: spans,
            markDefs: markDefs,
          });
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
      // Bullet list item
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
        // Start new bullet list
        if (currentListItems.length > 0 && listType) {
          currentListItems.forEach((itemText) => {
            const { spans, markDefs } = parseInlineText(itemText);
            blocks.push({
              _type: 'block',
              _key: generateKey(),
              style: 'normal',
              listItem: listType,
              children: spans,
              markDefs: markDefs,
            });
          });
        }
        currentListItems = [];
        listType = 'bullet';
      }
      
      currentListItems.push(trimmed.substring(2));
    } else if (trimmed.match(/^\d+\.\s/)) {
      // Numbered list item
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
        // Start new numbered list
        if (currentListItems.length > 0 && listType) {
          currentListItems.forEach((itemText) => {
            const { spans, markDefs } = parseInlineText(itemText);
            blocks.push({
              _type: 'block',
              _key: generateKey(),
              style: 'normal',
              listItem: listType,
              children: spans,
              markDefs: markDefs,
            });
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
      // Regular paragraph
      if (currentListItems.length > 0) {
        // Close list
        currentListItems.forEach((itemText) => {
          const { spans, markDefs } = parseInlineText(itemText);
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: listType || 'bullet',
            children: spans,
            markDefs: markDefs,
          });
        });
        currentListItems = [];
        listType = null;
      }
      
      currentParagraph.push(trimmed);
    }
  }
  
  // Flush remaining content
  if (currentListItems.length > 0) {
    currentListItems.forEach((itemText) => {
      const { spans, markDefs } = parseInlineText(itemText);
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: listType || 'bullet',
        children: spans,
        markDefs: markDefs,
      });
    });
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
  }
  
  return blocks;
}

async function uploadImage(imagePath: string): Promise<string | null> {
  try {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: imagePath.split('/').pop() || 'image.jpg',
    });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error);
    return null;
  }
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string;
  lang: string;
  content: string;
}

async function importBlogPost(
  filePath: string,
  locale: 'pl' | 'uk' | 'ru' | 'en',
  translationGroupId: string,
  coverImageId: string | null
) {
  const fileContent = readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const post: BlogPost = data as BlogPost;
  
  console.log(`Importing ${locale} post: ${post.title}`);
  
  const portableText = await convertMarkdownToPortableText(content);
  
  const document = {
    _type: 'post',
    title: post.title,
    slug: {
      _type: 'slug',
      current: post.slug,
    },
    locale: locale,
    translationGroupId: translationGroupId,
    excerpt: post.excerpt,
    content: portableText,
    coverImage: coverImageId
      ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: coverImageId,
          },
        }
      : undefined,
    publishedAt: new Date(post.date).toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  try {
    const result = await client.create(document);
    console.log(`✅ Created post: ${result._id}`);
    return result;
  } catch (error: any) {
    if (error.statusCode === 409) {
      console.log(`⚠️  Post already exists, skipping: ${post.slug}`);
      return null;
    }
    throw error;
  }
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN environment variable is required');
    console.log('Get your token from: https://sanity.io/manage');
    process.exit(1);
  }
  
  const translationGroupId = 'how-to-prepare-child-ear-piercing';
  const imagePath = join(process.cwd(), 'src/assets/blog/art001.jpg');
  
  console.log('📤 Uploading cover image...');
  let coverImageId: string | null = null;
  try {
    coverImageId = await uploadImage(imagePath);
    if (coverImageId) {
      console.log(`✅ Cover image uploaded: ${coverImageId}`);
    } else {
      console.log('⚠️  Could not upload image. Posts will be created without cover images.');
      console.log('   You can add images manually in Sanity Studio later.');
    }
  } catch (error) {
    console.log('⚠️  Image upload failed. Posts will be created without cover images.');
    console.log('   You can add images manually in Sanity Studio later.');
    console.log('   Error:', (error as Error).message);
  }
  
  const posts = [
    {
      path: join(process.cwd(), 'content/blog/pl/jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa.md'),
      locale: 'pl' as const,
    },
    {
      path: join(process.cwd(), 'content/blog/uk/yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava.md'),
      locale: 'uk' as const,
    },
    {
      path: join(process.cwd(), 'content/blog/ru/kak-podgotovit-rebenka-k-prokolu-ushey-varshava.md'),
      locale: 'ru' as const,
    },
    {
      path: join(process.cwd(), 'content/blog/en/how-to-prepare-a-child-for-ear-piercing-warsaw.md'),
      locale: 'en' as const,
    },
  ];
  
  console.log('\n📝 Importing blog posts...\n');
  
  for (const post of posts) {
    await importBlogPost(post.path, post.locale, translationGroupId, coverImageId);
  }
  
  console.log('\n✅ All posts imported successfully!');
  if (!coverImageId) {
    console.log('\n📸 Remember to add cover images in Sanity Studio:');
    console.log('   1. Go to Sanity Studio');
    console.log('   2. Open each blog post');
    console.log('   3. Upload art001.jpg as the cover image');
  }
}

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

