# How to Access Decap CMS

## URL
**Visit:** `http://localhost:8080/admin` (development) or `https://gentlepiercing.pl/admin` (production)

## Setup Steps

### 1. First Time Access
When you visit `/admin`, you'll be prompted to authenticate with GitHub.

### 2. GitHub Authentication
1. Click "Login with GitHub"
2. Authorize Decap CMS to access your repository
3. You'll be redirected back to the CMS

### 3. Using the CMS
Once authenticated, you can:
- **Create new articles**: Click "New Blog Article"
- **Edit existing articles**: Click on any article in the list
- **Manage content**: All changes are saved directly to your GitHub repository

## Configuration

The CMS is configured to:
- **Repository**: `ivan-dankov/inverness-warszawa`
- **Branch**: `main`
- **Content Location**: `src/content/blog/{lang}/`
- **Media Folder**: `public/assets/images/blog`

## Troubleshooting

### "Development Settings" Modal
If you see a modal asking for Netlify site URL:
- This appears when using `git-gateway` backend
- The config has been updated to use GitHub backend instead
- Refresh the page and you should see GitHub login

### Authentication Issues
- Make sure you have access to the GitHub repository
- Check that the repository name in `config.yml` matches your actual repo
- Try clearing browser cache and cookies

### Content Not Saving
- Verify you're authenticated (check top right corner)
- Ensure you have write access to the repository
- Check browser console for errors

## Alternative: Edit Files Directly

If CMS setup is problematic, you can edit Markdown files directly:
- Files are in `src/content/blog/{lang}/`
- Edit with any text editor
- Commit and push to Git
- Changes will appear after deployment
