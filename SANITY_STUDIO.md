# Sanity Studio

Sanity Studio is set up to manage your blog posts.

## Running Sanity Studio

To start the Sanity Studio development server:

```bash
npm run sanity
```

Or:

```bash
npx sanity dev
```

The studio will be available at: **http://localhost:3333**

## First Time Setup

1. When you first open the studio, you'll be asked to log in with your Sanity account
2. Make sure you're logged into the account that has access to project `nfwijj0y`
3. Once logged in, you'll see the "Blog Post" document type

## Managing Blog Posts

- **View all posts**: Click on "Blog Post" in the sidebar
- **Create a new post**: Click "Create" button
- **Edit a post**: Click on any post in the list
- **Delete a post**: Open a post and click the "Delete" button

## Important Fields

- **Title**: The post title
- **Slug**: Auto-generated from title (or edit manually)
- **Locale**: Select pl, uk, ru, or en
- **Translation Group ID**: Use the same ID for all translations of the same article
  - Example: `how-to-prepare-child-ear-piercing` for all 4 language versions
- **Excerpt**: Short description for the blog index
- **Content**: Rich text editor for the post content
- **Cover Image**: Upload the main image for the post
- **Published At**: Set the publication date
- **Meta Title/Description**: Optional SEO overrides

## Tips

- Use the Vision tool (eye icon) to test GROQ queries
- The studio auto-saves as you type
- Images are automatically optimized by Sanity CDN



