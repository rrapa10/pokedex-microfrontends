import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  Button,
  Card,
} from "@mui/material";

interface PokemonShellSearchProps {
  onClose: () => void;
  darkMode: boolean;
}

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const PokemonShellSearch: React.FC<PokemonShellSearchProps> = ({
  onClose,
  darkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null); // Referencia al contenedor del modal

  useEffect(() => {
    if (offset === 0) {
      loadMorePokemon();
    }
  }, [offset]);
  

  useEffect(() => {
    const handleScroll = () => {
      if (!modalRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = modalRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
        loadMorePokemon(); // Cargar más Pokémon cuando el usuario llega al final
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  const loadMorePokemon = async () => {
    setLoading(true);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=60&offset=${offset}`
    );
    const data = await res.json();

    const detailedPokemon = await Promise.all(
      data.results.map(async (p: { name: string; url: string }) => {
        const pokemonRes = await fetch(p.url);
        const pokemonData = await pokemonRes.json();
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          image:
            pokemonData.sprites.other.dream_world.front_default ||
            pokemonData.sprites.front_default ||
            "",
        };
      })
    );

    // 🔹 Eliminamos duplicados usando un Set
    setPokemonList((prev) => {
      const mergedList = [...prev, ...detailedPokemon];
      const uniquePokemon = Array.from(
        new Map(mergedList.map((p) => [p.id, p])).values()
      );
      return uniquePokemon;
    });

    setOffset((prev) => prev + 30);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      // Reiniciar la lista y el offset
      setPokemonList([]);
      setOffset(0); // useEffect detectará este cambio y cargará la lista inicial
      return;
    }
  
    setLoading(true);
    
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const data = await res.json();
  
      setPokemonList([
        {
          id: data.id,
          name: data.name,
          image: data.sprites.other.dream_world.front_default || data.sprites.front_default || "",
        },
      ]);
    } catch {
      setPokemonList([]); // Si no se encuentra, vaciar la lista
    }
  
    setLoading(false);
  };
  

  return (
    <Box
      ref={modalRef}
      sx={{
        padding: 3,
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#000",
        height: "100vh",
        overflowY: "auto", // Habilita el scroll en el modal
      }}
    >
      {/* Barra de búsqueda */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Buscar
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Cerrar
        </Button>
      </Box>

      {/* Lista de Pokémon */}
      {loading && pokemonList.length === 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}

      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {pokemonList.length === 0 && !loading ? (
          <Typography>No se encontraron Pokémon</Typography>
        ) : (
          pokemonList.map((p) => (
            <Card
              key={p.id}
              sx={{
                padding: 2,
                backgroundColor: darkMode ? "#555" : "#f9f9f9",
                textAlign: "center",
                width: 150,
              }}
            >
              <Typography
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
                <img src={p.image} alt={p.name} width={100} height={100} />
              ) : (
                <Typography variant="body2">Imagen no disponible</Typography>
              )}
            </Card>
          ))
        )}
      </Box>

      {/* Indicador de carga al hacer scroll */}
      {loading && pokemonList.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default PokemonShellSearch;
