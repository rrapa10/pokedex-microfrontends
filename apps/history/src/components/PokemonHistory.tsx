import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

const PokemonHistory = () => {
  const [history, setHistory] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("pokemonHistory") || "[]"
    );
    setHistory(storedHistory);
  }, []);

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mt: 3 }}>
        Últimos Pokémon Vistos
      </Typography>
     <>
        {history.length === 0 ? (
          <Typography variant="body1">No hay historial aún.</Typography>
        ) : (
          history.map((pokemon) => (
            <Grid item key={pokemon.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to={`/pokemon/${pokemon.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ width: 150, textAlign: "center", p: 1 }}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={pokemon.sprite}
                      alt={pokemon.name}
                    />
                    <CardContent>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {pokemon.name.toUpperCase()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </Grid>
          ))
        )}
      </>
    </motion.div></>
  );
};

export default PokemonHistory;
