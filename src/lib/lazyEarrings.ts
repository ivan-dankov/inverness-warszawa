let earringsCache: any[] | null = null;

export const loadEarrings = async () => {
  if (earringsCache) return earringsCache;
  
  const module = await import('@/data/earrings.json');
  const rawEarrings = module.default;
  
  // No descriptions needed - all earrings have the same standard description now
  earringsCache = rawEarrings;
  
  return earringsCache;
};
