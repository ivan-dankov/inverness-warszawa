import earringsDescriptions from "@/data/earrings-descriptions.json";

let earringsCache: any[] | null = null;

export const loadEarrings = async () => {
  if (earringsCache) return earringsCache;
  
  const module = await import('@/data/earrings.json');
  const rawEarrings = module.default;
  
  // Create a map of descriptions by product_url for quick lookup
  const descriptionsMap = new Map(
    (earringsDescriptions as Array<{product_url: string; description_points: string[]}>)
      .map(d => [d.product_url, d.description_points])
  );
  
  // Add descriptions to earrings
  earringsCache = rawEarrings.map((e: any) => ({
    ...e,
    description_points: descriptionsMap.get(e.product_url) || []
  }));
  
  return earringsCache;
};
