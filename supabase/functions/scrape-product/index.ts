import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url || !url.includes('kosmeta.lv')) {
      return new Response(
        JSON.stringify({ error: 'Invalid URL' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraping URL:', url);

    // Fetch the product page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    if (!doc) {
      throw new Error('Failed to parse HTML');
    }

    // Extract product description
    let description = '';
    
    // Try various common selectors for kosmeta.lv
    const descriptionSelectors = [
      '.product-description',
      '.product-details',
      '.item-description',
      '#product-description',
      '[itemprop="description"]',
      '.description',
      '.product-info',
      '.item-info',
      '#description',
    ];

    for (const selector of descriptionSelectors) {
      const element = doc.querySelector(selector);
      if (element && element.textContent.trim()) {
        description = element.textContent.trim();
        console.log(`Found description with selector: ${selector}`);
        break;
      }
    }

    // Fallback: try to get any meaningful content from main/content areas
    if (!description) {
      console.log('Trying fallback selectors...');
      const contentDiv = doc.querySelector('.content') || doc.querySelector('main') || doc.querySelector('.main');
      if (contentDiv) {
        description = contentDiv.textContent.trim().slice(0, 500);
      }
    }

    console.log('Extracted description length:', description.length);

    return new Response(
      JSON.stringify({ 
        description: description || 'No description available',
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Scraping error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        description: '',
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
