/**
 * Vercel Serverless Function for Decap CMS GitHub OAuth Proxy
 * This handles GitHub authentication for Decap CMS in production
 * 
 * Route: /api/decap-proxy/[...path]
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get the path from query params
  const pathParam = req.query.path;
  const apiPath = Array.isArray(pathParam) 
    ? pathParam.join('/') 
    : (pathParam as string) || '';

  if (!apiPath) {
    return res.status(400).json({ error: 'Path parameter required' });
  }

  // Proxy requests to GitHub API
  const githubApiUrl = `https://api.github.com/${apiPath}`;
  
  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Decap-CMS',
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add authorization if present
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization as string;
    }

    // Add content type for non-GET requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      headers['Content-Type'] = (req.headers['content-type'] as string) || 'application/json';
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
      message: error instanceof Error ? error.message : 'Unknown error',
      path: apiPath
    });
  }
}
