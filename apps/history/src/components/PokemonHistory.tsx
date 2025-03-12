import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

const PokemonHistory = () => {
  const [history, setHistory] = useState<Pokemon[]>([]);
  const theme = useTheme(); // Usa el tema global

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("pokemonHistory") || "[]"
    );
    setHistory(storedHistory);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ textAlign: "center", padding: "10px" }}>
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          Últimos Pokémon Vistos
        </Typography>
        {history.length === 0 ? (
          <Typography variant="body1" color="textPrimary">
            No hay historial aún.
          </Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {history.map((pokemon, index) => (
              <Grid item key={pokemon.id || index}>
                <Link
                  to={`/pokemon/${pokemon.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      width: 120,
                      background: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      textAlign: "center",
                      p: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="80"
                      image={pokemon.sprite}
                      alt={pokemon.name}
                    />
                    <CardContent>
                      <Typography variant="body2" fontWeight="bold">
                        {pokemon.name.toUpperCase()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default PokemonHistory;
