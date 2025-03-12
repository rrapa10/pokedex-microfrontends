if (window.__MF_RUNTIME__) {
  window.__MF_RUNTIME__.init();
}

import { useState, useEffect } from "react";
import { Box, Card, Typography, Button, CircularProgress, Modal } from "@mui/material";
import "../index.css";
import lightModeIcon from "../assets/light-mode.png";
import darkModeIcon from "../assets/dark-mode.png";
import PokemonShellSearch from "./PokemonShellSearch";

const API_TYPES = ["fire", "water", "electric", "dragon", "ghost", "grass"];

interface PokemonEntry {
  pokemon: { id: number; name: string; url: string };
}

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonData {
  [key: string]: Pokemon[];
}

interface PokemonListProps {
  name: string;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ name, darkMode, setDarkMode }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData>({});
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const data: PokemonData = {};

      for (const type of API_TYPES) {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
        const json = await res.json();
        const pokemonEntries: PokemonEntry[] = json.pokemon.slice(0, 10);

        const promises = pokemonEntries.map(async (entry) => {
          const pokemonRes = await fetch(entry.pokemon.url);
          const pokemonJson = await pokemonRes.json();
          return {
            id: pokemonJson.id,
            name: entry.pokemon.name,
            image: pokemonJson.sprites.other.dream_world.front_default || "",
          };
        });

        data[type] = await Promise.all(promises);
      }

      setPokemonData(data);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  // Función para emitir el evento al Shell cuando se selecciona un Pokémon
  const handleSelectPokemon = (pokemon: Pokemon) => {
    /*if (window.__MF_RUNTIME__) {
      window.__MF_RUNTIME__.emit("pokemonSelected", pokemon);
    }*/
    //console.log("window.__MF_RUNTIME__", window.__MF_RUNTIME__)
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      {/* Encabezado */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Bienvenido, {name}</Typography>

        {/* Botón para abrir el modal de búsqueda */}
        <Button variant="contained" color="primary" onClick={() => setSearchOpen(true)}>
          Buscar Pokémon
        </Button>

        <Button
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            background: "none",
            border: "none",
            padding: 0,
            minWidth: "auto",
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        >
          <img src={darkMode ? lightModeIcon : darkModeIcon} alt="Modo Oscuro" width={70} height={70} />
        </Button>
      </Box>

      {/* Cargando */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        /* Lista de Pokémon por categoría */
        API_TYPES.map((type) => (
          <Box key={type} mt={3}>
            <Typography variant="h6">{type.toUpperCase()}</Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {pokemonData[type]?.map((p) => (
                <Card
                  key={p.id}
                  onClick={() => handleSelectPokemon(p)}
                  sx={{
                    padding: 2,
                    backgroundColor: darkMode ? "#555" : "#f9f9f9",
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: darkMode ? "#666" : "#ddd" },
                  }}
                >
                  <Typography
                    className="pokemon-name"
                    sx={{
                      color: darkMode ? "#fff" : "#000",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                  </Typography>
                  <Typography
                    sx={{
                      color: darkMode ? "#fff" : "#000",
                      marginBottom: "0.5rem",
                    }}
                  >
                    # {p.id}
                  </Typography>
                  {p.image ? (
                    <img className="pokemon-image" src={p.image} alt={p.name} width={100} height={100} />
                  ) : (
                    <Typography variant="body2">Imagen no disponible</Typography>
                  )}
                </Card>
              ))}
            </Box>
          </Box>
        ))
      )}

      {/* MODAL DE BÚSQUEDA */}
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: darkMode ? "#222" : "#fff", p: 3, overflow: "auto" }}>
          <PokemonShellSearch onClose={() => setSearchOpen(false)} darkMode={darkMode} />
        </Box>
      </Modal>
    </Box>
  );
};

export default PokemonList;
