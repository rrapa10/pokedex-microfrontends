import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

interface PokemonCardProps {
  name: string;
  id: number;
  image: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, id, image, types }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#2D2D2D",
        color: "white",
        borderRadius: "12px",
        padding: 2,
        textAlign: "center",
        "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="subtitle2">#{id.toString().padStart(3, "0")}</Typography>
      <img src={image} alt={name} width="100" height="100" />
      <CardContent>
        {types.map((type) => (
          <Chip
            key={type}
            label={type.toUpperCase()}
            sx={{
              backgroundColor: getTypeColor(type),
              color: "white",
              margin: "2px",
            }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

// Función para asignar color según tipo de Pokémon
const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    grass: "#78C850",
    poison: "#A040A0",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
  };
  return colors[type.toLowerCase()] || "#68A090";
};

export default PokemonCard;
