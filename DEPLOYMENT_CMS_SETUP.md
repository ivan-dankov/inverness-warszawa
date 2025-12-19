# Decap CMS Production Setup Guide

## Overview

Decap CMS is configured to work in production using GitHub OAuth authentication. This allows content editors to log in with their GitHub account and edit blog articles directly from the website.

## Access URL

**Production**: `https://gentlepiercing.pl/admin`

## Setup Steps for Production

### 1. Create GitHub OAuth App

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: `Gentle Piercing CMS`
   - **Homepage URL**: `https://gentlepiercing.pl`
   - **Authorization callback URL**: `https://gentlepiercing.pl/admin`
4. Click "Register application"
5. **Copy the Client ID** (you'll need this)
6. **Generate a Client Secret** and copy it

### 2. Configure Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:

```
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
```

3. Make sure they're set for **Production** environment
4. Redeploy your site

### 3. Update Proxy Function (if needed)

The proxy function at `api/decap-proxy.js` handles GitHub API requests. It should work automatically, but verify:

- File exists: `api/decap-proxy.js`
- Vercel detects it as a serverless function
- No errors in Vercel function logs

### 4. Test CMS Access

1. Visit `https://gentlepiercing.pl/admin`
2. Click "Login with GitHub"
3. Authorize the application
4. You should see the CMS dashboard

## How It Works

1. **User visits** `/admin`
2. **Clicks "Login with GitHub"**
3. **GitHub OAuth flow** authenticates the user
4. **CMS loads** with access to repository
5. **User can edit** blog articles in `src/content/blog/`
6. **Changes are committed** directly to GitHub
7. **Vercel auto-deploys** the changes

## Content Structure

Articles are stored in:
```
src/content/blog/
  ├── pl/          # Polish articles
  ├── en/          # English articles
  ├── uk/          # Ukrainian articles
  └── ru/          # Russian articles
```

Each article is a Markdown file with frontmatter:
```markdown
---
title: "Article Title"
slug: "article-slug"
excerpt: "Article excerpt"
date: "2025-12-19"
image: "art001"
lang: "pl"
---

Article content...
```

## Permissions

Users who log in need:
- **Read access** to the repository (to view content)
- **Write access** to the repository (to edit content)

Make sure the GitHub OAuth App has the `repo` scope enabled.

## Troubleshooting

### "Not Found" Error
- Check that `api/decap-proxy.js` exists
- Verify Vercel is deploying the API route
- Check Vercel function logs

### Authentication Fails
- Verify GitHub OAuth App callback URL matches your domain
- Check environment variables are set correctly
- Ensure OAuth App has `repo` scope

### Changes Not Saving
- Verify user has write access to repository
- Check GitHub repository permissions
- Review Vercel deployment logs

### CMS Not Loading
- Check browser console for errors
- Verify Decap CMS script loads: `https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js`
- Check network tab for failed requests

## Security Notes

- Only authorized GitHub users can access the CMS
- All changes are tracked in Git history
- Content is version controlled
- No database needed - everything is in Git

## Alternative: Direct Git Editing

If CMS setup is complex, content editors can:
1. Edit files directly in GitHub web interface
2. Use GitHub Desktop app
3. Clone repository and edit locally
4. Commit and push changes

All methods result in the same outcome - changes in Git trigger Vercel deployment.
