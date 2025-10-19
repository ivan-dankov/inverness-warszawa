/// <reference types="vite/client" />

// vite-imagetools type declarations
declare module '*&format=webp' {
  const src: string;
  export default src;
}

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
