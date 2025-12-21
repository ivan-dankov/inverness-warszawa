# Blog Import Script

This script imports your markdown blog posts into Sanity CMS.

## Prerequisites

1. **Sanity API Token**: You need a write token from Sanity
   - Go to https://sanity.io/manage
   - Select your project (`nfwijjoy`)
   - Go to **API** → **Tokens**
   - Click **Add API token**
   - Name it (e.g., "Blog Import")
   - Give it **Editor** permissions
   - Copy the token

## Usage

1. Set the environment variable with your Sanity token:
   ```bash
   export SANITY_API_TOKEN="your-token-here"
   ```

   Or on Windows:
   ```cmd
   set SANITY_API_TOKEN=your-token-here
   ```

2. Run the import script:
   ```bash
   npm run import-blog
   ```

The script will:
- Upload the cover image (`art001.jpg`) to Sanity
- Import all 4 blog posts (pl, uk, ru, en) with the same `translationGroupId`
- Skip posts that already exist (based on slug)

## What gets imported

- **Title**: From frontmatter
- **Slug**: From frontmatter
- **Locale**: pl, uk, ru, or en
- **Translation Group ID**: `how-to-prepare-child-ear-piercing` (same for all translations)
- **Excerpt**: From frontmatter
- **Content**: Converted from markdown to Sanity portable text
- **Cover Image**: `art001.jpg` uploaded to Sanity
- **Published Date**: From frontmatter `date` field

## Troubleshooting

- **"SANITY_API_TOKEN environment variable is required"**: Set the token as shown above
- **"Failed to upload cover image"**: Check that `src/assets/blog/art001.jpg` exists
- **"Post already exists"**: The script will skip existing posts. Delete them in Sanity Studio if you want to re-import

