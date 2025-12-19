/**
 * Vercel Serverless Function for Decap CMS GitHub OAuth Proxy
 * This handles GitHub authentication for Decap CMS in production
 * 
 * Route: /api/decap-proxy/[...path]
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get the path from query params or URL
  const path = req.query.path || req.url.replace('/api/decap-proxy/', '');
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  // Proxy requests to GitHub API
  const githubApiUrl = `https://api.github.com/${apiPath}`;
  
  try {
    const headers = {
      'User-Agent': 'Decap-CMS',
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add authorization if present
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    // Add content type for non-GET requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      headers['Content-Type'] = req.headers['content-type'] || 'application/json';
    }

    const response = await fetch(githubApiUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' && req.body 
        ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
        : undefined,
    });

    const data = await response.text();
    
    // Forward response status and headers
    res.status(response.status);
    
    // Copy relevant headers
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy error', 
      message: error.message,
      path: apiPath
    });
  }
}
