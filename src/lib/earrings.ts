import earringsData from "@/data/earrings.json";

export interface Earring {
  name: string;
  product_url: string;
  images: string[];
  price: string;
}

// Deduplicate images while preserving size and angle variants
export const getUniqueImages = (images: string[]): string[] => {
  const seen = new Set<string>();
  const uniqueImages: string[] = [];
  
  // Sort to prioritize /l/ over /m/ for the SAME variant
  const sorted = [...images].sort((a, b) => {
    const aSize = a.includes('/l/') ? 'l' : a.includes('/m/') ? 'm' : 'other';
    const bSize = b.includes('/l/') ? 'l' : b.includes('/m/') ? 'm' : 'other';
    
    // Extract variant letters (A, B, C, etc.)
    const aVariant = a.match(/-([A-Z])-/)?.[1] || '';
    const bVariant = b.match(/-([A-Z])-/)?.[1] || '';
    
    // If same variant, prefer /l/ over /m/
    if (aVariant === bVariant) {
      if (aSize === 'l' && bSize !== 'l') return -1;
      if (aSize !== 'l' && bSize === 'l') return 1;
    }
    
    return 0;
  });
  
  for (const img of sorted) {
    // Create a unique key based on: size + variant letter + domain
    const size = img.includes('/l/') ? 'l' : img.includes('/m/') ? 'm' : 'other';
    const variant = img.match(/-([A-Z])-/)?.[1] || 'default';
    const domain = new URL(img).hostname;
    
    const uniqueKey = `${size}_${variant}_${domain}`;
    
    if (!seen.has(uniqueKey)) {
      seen.add(uniqueKey);
      uniqueImages.push(img);
    }
  }
  
  return uniqueImages;
};

export const getAllEarrings = (): Earring[] => {
  return (earringsData as Earring[]).map(e => ({
    ...e,
    images: getUniqueImages(e.images)
  }));
};

export const getEarring = (index: number): Earring | null => {
  const earrings = getAllEarrings();
  if (index < 0 || index >= earrings.length) return null;
  return earrings[index];
};
