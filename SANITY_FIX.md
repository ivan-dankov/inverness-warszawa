# Fixing Sanity Studio 504 Errors

If you're seeing "504 (Outdated Optimize Dep)" errors in the browser console:

## Quick Fix:

1. **Stop the studio** (Ctrl+C in the terminal)

2. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   ```

3. **Restart the studio:**
   ```bash
   npm run sanity
   ```

4. **Hard refresh your browser:**
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

## Alternative: Use Sanity Studio in a separate terminal

If the issue persists, try running the studio in a completely fresh terminal:

```bash
# In a new terminal window
cd /Users/ivandankov/Documents/Dev\ Projects/inverness-warszawa
npm run sanity
```

The studio should be accessible at: **http://localhost:3333**

## If errors persist:

The 504 errors are usually temporary Vite optimization issues. They often resolve after:
- Waiting 30-60 seconds for Vite to finish optimizing
- Refreshing the browser
- Clearing browser cache

The studio should still function even with these console warnings.



