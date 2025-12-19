# Fixing Decap CMS Login Screen

## The Issue

You're seeing a login screen because Decap CMS needs authentication to access your Git repository. For local development, there are two options:

## Solution 1: Use Local Backend with Proxy Server (Recommended)

### Step 1: Start the Proxy Server

In a **separate terminal**, run:

```bash
npm run dev:cms
```

Or manually:
```bash
npx decap-server
```

This starts a proxy server on port 8081 that handles Git operations locally.

### Step 2: Access CMS

Visit: `http://localhost:8080/admin`

You should now see the CMS dashboard without login prompts.

## Solution 2: Edit Files Directly (Simplest)

Since the CMS requires setup, you can edit Markdown files directly:

1. **Open files in**: `src/content/blog/{lang}/`
2. **Edit with any editor** (VS Code, etc.)
3. **Commit and push** to Git
4. **Changes appear** after deployment

### File Structure:
```
src/content/blog/
  ├── pl/
  │   ├── czy-przekluwanie-uszu-boli.md
  │   ├── inverness-vs-pistolet.md
  │   └── od-jakiego-wieku-przekluwac-uszy-dziecku.md
  ├── en/
  ├── uk/
  └── ru/
```

### Markdown Format:
```markdown
---
title: "Article Title"
slug: "article-slug"
excerpt: "Article excerpt"
date: "2025-12-19"
image: "art001"
lang: "pl"
---

Your article content in Markdown...
```

## Current Configuration

The CMS is configured with:
- **Local backend**: Enabled (`local_backend: true`)
- **Backend**: `git-gateway` (requires proxy for local)
- **Content folder**: `src/content/blog/`
- **Languages**: pl, en, uk, ru

## Troubleshooting

### Still seeing login screen?
1. Make sure proxy server is running (`npm run dev:cms`)
2. Clear browser cache
3. Try incognito/private window
4. Check browser console for errors

### Proxy server won't start?
- Port 8081 might be in use
- Try: `lsof -ti:8081 | xargs kill -9`
- Or change port in `.env`: `PORT=8082`

### Want production setup?
For production, you'll need to configure:
- **Netlify**: Enable Netlify Identity + Git Gateway
- **Vercel**: Set up GitHub OAuth with proxy
- **Other**: Configure appropriate authentication

## Quick Start (Editing Files)

1. Open `src/content/blog/pl/czy-przekluwanie-uszu-boli.md`
2. Edit the Markdown content
3. Save the file
4. Commit: `git add . && git commit -m "Update article"`
5. Push: `git push`
6. Changes appear on site after deployment
