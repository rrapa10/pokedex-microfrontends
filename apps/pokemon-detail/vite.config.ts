import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import  federation  from "@originjs/vite-plugin-federation";


export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "pokemonDetail",
      filename: "remoteEntry.js",
      exposes: {
        "./PokemonDetail": "./src/components/PokemonDetail.tsx", 
      },
      shared: ["react", "react-dom", "react-router-dom", "@mui/material"],
    }),
  ],
  server: {
    port: 3001, 
  },
  build: {
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
    target: "esnext",
    assetsDir: "",
  },
});
