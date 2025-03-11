# 📌 Proyecto con Shell y Microfrontend

## 📖 Descripción

Este proyecto implementa una arquitectura basada en **Microfrontend**, utilizando un **Shell** que integra múltiples aplicaciones independientes. Cada microfrontend es una aplicación autónoma que puede ser desarrollada y desplegada de manera independiente, mejorando la escalabilidad y el mantenimiento del sistema.

## 🏗️ Estructura del Proyecto

```
/project-root
│── shell/              # Aplicación principal (Host)
│── pokemon-detail/     # Primer microfrontend
│── history/            # Segundo microfrontend
│── README.md           # Documentación
```

## 🛠 Tecnologías Utilizadas

- React + Vite
- Module Federation (Webpack 5)
- Material-UI (MUI)
- TypeScript
- LocalStorage (para persistencia de datos en `historia`)

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/rrapa10/pokedex-microfrontends.git
cd tu-repo
```

### 2️⃣ Instalación de dependencias

```sh
# Instalar dependencias en el Shell
cd shell
pnpm install

# Instalar dependencias en los microfrontends
cd pokemon-detail
pnpm install

cd history
pnpm install
```

## ▶️ Ejecución del Proyecto

### 1️⃣ Levantar el Shell (Host)

```sh
cd shell
pnpm pnpm run dev   
```

Acceder a: `http://localhost:3000`

### 2️⃣ Levantar Microfrontends

```sh
# Microfrontend 1
cd pokemon-detail
pnpm run build && pnpm serve

# Microfrontend 2
cd history
pnpm run build && pnpm serve
```

## 🔗 Integración entre el Shell y los Microfrontends

Los microfrontends se cargan dinámicamente dentro del Shell utilizando **Module Federation** de Webpack.

Ejemplo de configuración en `vite.config.js` del Shell:

```ts
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
```

Ejemplo de configuración en `vite.config.js` de un microfrontend:

```ts
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
```

## 🛠️ Tecnologías Utilizadas

- **React + TypeScript**
- **Vite Module Federation**
- **Material UI (MUI)**
- **Microfrontend Architecture**

## 📜 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un **Issue** o un **Pull Request**.

