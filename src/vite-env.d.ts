/// <reference types="vite/client" />

// Global type declaration for vite-imagetools
declare global {
  interface ImportMeta {
    glob: (pattern: string, options?: { eager?: boolean; as?: string }) => Record<string, any>;
  }
}

// Allow importing images with query parameters
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

// Explicit declarations for query parameters
declare module '*.jpg?*' {
  const src: string;
  export default src;
}

declare module '*.jpeg?*' {
  const src: string;
  export default src;
}

declare module '*.png?*' {
  const src: string;
  export default src;
}

declare module '*.webp?*' {
  const src: string;
  export default src;
}

declare module '*.gif?*' {
  const src: string;
  export default src;
}

declare module '*.svg?*' {
  const src: string;
  export default src;
}

export {};
