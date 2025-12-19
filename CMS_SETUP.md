# Decap CMS Setup Guide

## Accessing the CMS

### Development
Visit: `http://localhost:8080/admin`

### Production
Visit: `https://gentlepiercing.pl/admin`

## Current Configuration

The CMS is configured to:
- **Backend**: Git Gateway (requires Netlify Identity)
- **Content Location**: `src/content/blog/`
- **Media Folder**: `public/assets/images/blog`
- **Languages**: Polish (pl), English (en), Ukrainian (uk), Russian (ru)

## Setup Options

### Option 1: Netlify (Recommended for Git Gateway)

If deploying to Netlify:

1. **Enable Netlify Identity**:
   - Go to Netlify Dashboard → Site Settings → Identity
   - Click "Enable Identity"
   - Enable "Git Gateway" under Identity → Services

2. **Configure Git Gateway**:
   - Go to Site Settings → Identity → Services → Git Gateway
   - Click "Enable Git Gateway"
   - Authorize Netlify to access your Git provider

3. **Set up Authentication**:
   - Go to Identity → Registration
   - Enable "Open registration" or invite users manually
   - Users can sign up/login at `/admin`

### Option 2: GitHub OAuth (For Vercel/Other Hosts)

If deploying to Vercel or other platforms, update `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: your-username/your-repo-name
  branch: main
  base_url: https://api.github.com
  auth_type: pkce
```

Then:
1. Create a GitHub OAuth App
2. Set Authorization callback URL to your site's `/admin` page
3. Add Client ID to environment variables

### Option 3: Local Development (No Auth)

For local development without authentication, you can use:

```yaml
backend:
  name: file-system
  api_root: /api
```

Note: This only works locally and won't work in production.

## Content Structure

Articles are stored in:
```
src/content/blog/
  ├── pl/
  │   ├── article-slug.md
  │   └── ...
  ├── en/
  │   ├── article-slug.md
  │   └── ...
  ├── uk/
  └── ru/
```

Each article has frontmatter:
```yaml
---
title: "Article Title"
slug: "article-slug"
excerpt: "Article excerpt"
date: "2025-12-19"
image: "art001"
lang: "pl"
---

Article content in Markdown...
```

## Troubleshooting

### CMS Not Loading
- Check browser console for errors
- Verify `/admin/index.html` is accessible
- Ensure Decap CMS script loads correctly

### Authentication Issues
- Verify Netlify Identity is enabled
- Check Git Gateway is enabled
- Ensure user has proper permissions

### Content Not Saving
- Check Git repository permissions
- Verify branch name matches config (`main`)
- Check file paths are correct

## Alternative: Use Git Directly

If CMS setup is complex, you can edit Markdown files directly:
- Files are in `src/content/blog/{lang}/`
- Edit with any Markdown editor
- Commit and push to Git
- Changes will appear after deployment
