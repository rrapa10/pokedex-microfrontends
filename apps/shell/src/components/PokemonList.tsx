import { useState, useEffect } from "react";
import { Box, Card, Typography, Button, CircularProgress } from "@mui/material";
import "../index.css";

const API_TYPES = ["fire", "water", "electric", "dragon", "ghost"];

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

const PokemonList: React.FC<PokemonListProps> = ({
  name,
  darkMode,
  setDarkMode,
}) => {
  const [pokemonData, setPokemonData] = useState<PokemonData>({});
  const [loading, setLoading] = useState(true);

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

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      {/* Encabezado */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Bienvenido, {name}</Typography>
        <Button variant="contained" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
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
              {pokemonData[type]?.map((p, i) => (
                <Card
                  key={i}
                  sx={{
                    padding: 2,
                    backgroundColor: darkMode ? "#555" : "#f9f9f9",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    className="pokemon-name"
                    sx={{
                      color: darkMode ? "#fff" : "#000",
                      marginBottom: "1rem"
                    }}
                  >
                    {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                  </Typography>
                  <Typography>
                    {p.id}
                  </Typography>
                  {p.image ? (
                    <img   className="pokemon-image"  src={p.image} alt={p.name} width={100} height={100} />
                  ) : (
                    <Typography variant="body2">
                      Imagen no disponible
                    </Typography>
                  )}
                </Card>
              ))}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default PokemonList;
