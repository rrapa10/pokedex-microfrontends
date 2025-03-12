// global.d.ts
export {};

declare global {
  interface Window {
    __MF_RUNTIME__?: any; // Puedes ajustar el tipo si sabes su estructura
  }
}
