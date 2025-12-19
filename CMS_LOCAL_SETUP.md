# Decap CMS Local Development Setup

## Quick Start

### Option 1: Local Backend (Recommended for Development)

The CMS is now configured with `local_backend: true`, which means:

1. **No authentication needed** - Works directly with your local Git repository
2. **No proxy server needed** - Uses local file system
3. **Instant access** - Just visit `http://localhost:8080/admin`

### Access the CMS

Simply visit: **`http://localhost:8080/admin`**

You should see the CMS interface immediately without any login prompts.

## How It Works

With `local_backend: true`:
- Changes are saved directly to your local Git repository
- Files are written to `src/content/blog/{lang}/`
- No authentication required
- Works offline

## Production Setup

For production (when deployed), you'll need to:

1. **Remove `local_backend: true`** from `config.yml`
2. **Set up proper backend**:
   - **Netlify**: Use `git-gateway` with Netlify Identity
   - **Vercel**: Use GitHub OAuth with a proxy server
   - **Other**: Configure appropriate backend

## Current Configuration

```yaml
local_backend: true  # Only works on localhost

backend:
  name: git-gateway
  branch: main
```

## Troubleshooting

### Still seeing authentication errors?
- Make sure `local_backend: true` is in `config.yml`
- Clear browser cache
- Restart dev server
- Check browser console for errors

### Changes not saving?
- Verify you have write permissions to `src/content/blog/`
- Check Git repository is initialized
- Ensure files aren't locked by another process

### Want to use GitHub authentication?
For production, you'll need to set up a proxy server or use Netlify's Git Gateway.
