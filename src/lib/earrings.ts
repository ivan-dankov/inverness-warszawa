import earringsData from "@/data/earrings.json";

export interface Earring {
  name: string;
  product_url: string;
  images: string[];
  price: string;
}

// Deduplicate images - prefer larger /l/ versions
export const getUniqueImages = (images: string[]): string[] => {
  const seen = new Set<string>();
  const uniqueImages: string[] = [];
  
  // Sort to prioritize /l/ over /m/ over others
  const sorted = [...images].sort((a, b) => {
    if (a.includes('/l/') && !b.includes('/l/')) return -1;
    if (!a.includes('/l/') && b.includes('/l/')) return 1;
    return 0;
  });
  
  for (const img of sorted) {
    const filename = img.split('/').pop() || '';
    const cleanName = filename.split('-')[0]; // Get base name without variants
    
    if (!seen.has(cleanName)) {
      seen.add(cleanName);
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
