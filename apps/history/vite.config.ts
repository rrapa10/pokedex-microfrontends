import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import  federation  from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "pokemonHistory",
      filename: "remoteEntry.js", // Asegura que esté en la raíz
      exposes: {
        "./PokemonHistory": "./src/components/PokemonHistory",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 3002,
  },
  build: {
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
    target: "esnext",
    assetsDir: "",
  },
});
