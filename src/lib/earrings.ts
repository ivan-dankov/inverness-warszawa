import earringsData from "@/data/earrings.json";
import earringsDescriptions from "@/data/earrings-descriptions.json";

export interface Earring {
  name: string;
  product_url: string;
  images: string[];
  price: string;
  description_points?: string[];
}

// Deduplicate images while preserving angle variants but removing size duplicates
export const getUniqueImages = (images: string[]): string[] => {
  const seen = new Set<string>();
  const uniqueImages: string[] = [];
  
  // Filter out kosmeta.lv images - only use mozfiles.com
  const filteredImages = images.filter(img => !img.includes('kosmeta.lv'));
  
  // Sort to prioritize /l/ over /m/ - /l/ will be kept when duplicates exist
  const sorted = [...filteredImages].sort((a, b) => {
    const aSize = a.includes('/l/') ? 'l' : a.includes('/m/') ? 'm' : 'other';
    const bSize = b.includes('/l/') ? 'l' : b.includes('/m/') ? 'm' : 'other';
    
    // Prefer /l/ over everything
    if (aSize === 'l' && bSize !== 'l') return -1;
    if (aSize !== 'l' && bSize === 'l') return 1;
    
    return 0;
  });
  
  for (const img of sorted) {
    // Create a unique key based on: variant letter + domain (NO SIZE)
    // This makes /m/K1232c-A and /l/K1232c-A collapse to the same key
    const variant = img.match(/-([A-Z])-/)?.[1] || 'default';
    const domain = new URL(img).hostname;
    
    const uniqueKey = `${variant}_${domain}`;
    
    if (!seen.has(uniqueKey)) {
      seen.add(uniqueKey);
      uniqueImages.push(img);
    }
  }
  
  return uniqueImages;
};

export const getAllEarrings = (): Earring[] => {
  // Create a map of descriptions by product_url for quick lookup
  const descriptionsMap = new Map(
    (earringsDescriptions as Array<{product_url: string; description_points: string[]}>)
      .map(d => [d.product_url, d.description_points])
  );
  
  return (earringsData as Earring[]).map(e => ({
    ...e,
    images: getUniqueImages(e.images),
    description_points: descriptionsMap.get(e.product_url) || []
  }));
};

export const getEarring = (index: number): Earring | null => {
  const earrings = getAllEarrings();
  if (index < 0 || index >= earrings.length) return null;
  return earrings[index];
};
