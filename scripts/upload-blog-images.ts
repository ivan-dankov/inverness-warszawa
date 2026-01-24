import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

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

// Image mappings: article image name -> file path
const imageMappings: Record<string, string> = {
  'art001': join(process.cwd(), 'src/assets/blog/art001.jpg'),
  'art002': join(process.cwd(), 'src/assets/blog/art002.jpg'),
  'art003': join(process.cwd(), 'src/assets/blog/art003.jpg'),
  'art004': join(process.cwd(), 'src/assets/blog/art004.png'),
};

// Also try alternative paths
const alternativePaths: Record<string, string[]> = {
  'art001': [
    join(process.cwd(), 'src/assets/blog/art001.png'),
    join(process.cwd(), 'public/blog/art001.jpg'),
    join(process.cwd(), 'public/blog/art001.png'),
  ],
  'art002': [
    join(process.cwd(), 'src/assets/blog/art002.png'),
    join(process.cwd(), 'public/blog/art002.jpg'),
    join(process.cwd(), 'public/blog/art002.png'),
  ],
  'art003': [
    join(process.cwd(), 'src/assets/blog/art003.png'),
    join(process.cwd(), 'public/blog/art003.jpg'),
    join(process.cwd(), 'public/blog/art003.png'),
  ],
  'art004': [
    join(process.cwd(), 'src/assets/blog/art004.jpg'),
    join(process.cwd(), 'public/blog/art004.jpg'),
  ],
};

async function findImageFile(imageName: string): Promise<string | null> {
  const primaryPath = imageMappings[imageName];
  if (primaryPath) {
    try {
      readFileSync(primaryPath);
      return primaryPath;
    } catch (e) {
      // Try alternatives
    }
  }

  const alternatives = alternativePaths[imageName] || [];
  for (const altPath of alternatives) {
    try {
      readFileSync(altPath);
      return altPath;
    } catch (e) {
      // Continue to next alternative
    }
  }

  return null;
}

async function uploadImage(imagePath: string, filename: string): Promise<string | null> {
  try {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    console.log(`  ✅ Uploaded: ${filename} -> ${asset._id}`);
    return asset._id;
  } catch (error: any) {
    console.error(`  ❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function updatePostWithImage(postSlug: string, locale: string, imageAssetId: string) {
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug && locale == $locale][0]`,
      { slug: postSlug, locale }
    );

    if (!post) {
      console.log(`  ⚠️  Post not found: ${postSlug} (${locale})`);
      return;
    }

    await client
      .patch(post._id)
      .set({
        coverImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId,
          },
        },
      })
      .commit();

    console.log(`  ✅ Updated post: ${post.title}`);
  } catch (error: any) {
    console.error(`  ❌ Failed to update post:`, error.message);
  }
}

async function processImage(imageName: string, posts: Array<{ slug: string; locale: string }>) {
  console.log(`\n📸 Processing image: ${imageName}`);
  
  const imagePath = await findImageFile(imageName);
  if (!imagePath) {
    console.log(`  ❌ Image file not found: ${imageName}`);
    console.log(`  Tried paths:`);
    if (imageMappings[imageName]) {
      console.log(`    - ${imageMappings[imageName]}`);
    }
    if (alternativePaths[imageName]) {
      alternativePaths[imageName].forEach(path => console.log(`    - ${path}`));
    }
    return;
  }

  console.log(`  📁 Found at: ${imagePath}`);
  
  const extension = imagePath.split('.').pop() || 'jpg';
  const filename = `${imageName}.${extension}`;
  
  const assetId = await uploadImage(imagePath, filename);
  if (!assetId) {
    return;
  }

  // Update all posts that use this image
  for (const post of posts) {
    await updatePostWithImage(post.slug, post.locale, assetId);
  }
}

async function uploadAllImages() {
  console.log('🔄 Uploading blog article images...\n');

  // Article groups with their image references
  const imageGroups = [
    {
      imageName: 'art001',
      posts: [
        { slug: 'does-ear-piercing-hurt', locale: 'en' },
        { slug: 'czy-przekluwanie-uszu-boli', locale: 'pl' },
        { slug: 'chy-bolyt-prokol-vukh', locale: 'uk' },
        { slug: 'bolit-li-prokalyvanie-ushey', locale: 'ru' },
      ],
    },
    {
      imageName: 'art002',
      posts: [
        { slug: 'inverness-vs-gun', locale: 'en' },
        { slug: 'inverness-vs-pistolet', locale: 'pl' },
        { slug: 'inverness-vs-pistolet', locale: 'uk' },
        { slug: 'inverness-vs-pistolet', locale: 'ru' },
      ],
    },
    {
      imageName: 'art003',
      posts: [
        { slug: 'at-what-age-to-pierce-child-ears', locale: 'en' },
        { slug: 'od-jakiego-wieku-przekluwac-uszy-dziecku', locale: 'pl' },
        { slug: 'z-yakoho-viku-prokoluvaty-vukha-dytyni', locale: 'uk' },
        { slug: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku', locale: 'ru' },
      ],
    },
    {
      imageName: 'art004',
      posts: [
        { slug: 'how-to-prepare-a-child-for-ear-piercing-warsaw', locale: 'en' },
        { slug: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa', locale: 'pl' },
        { slug: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava', locale: 'uk' },
        { slug: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava', locale: 'ru' },
      ],
    },
  ];

  for (const group of imageGroups) {
    await processImage(group.imageName, group.posts);
  }

  console.log('\n✅ Image upload complete!');
}

uploadAllImages().catch(console.error);







