import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import  federation  from "@originjs/vite-plugin-federation";


export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        pokemonDetail: "http://localhost:3001/remoteEntry.js",
        pokemonHistory: "http://localhost:3002/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom", "@mui/material"],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
});
