import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { usePokemon } from "../hooks/usePokemon";
import LoadingIndicator from "../components/LoadingIndicator";
import PokemonCard from "../components/PokemonCard";

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { pokemon, loading } = usePokemon(id);

  if (loading) return <LoadingIndicator />;
  if (!pokemon) return <Typography>Error al cargar el Pokémon</Typography>;

  return <PokemonCard name={pokemon.name} image={pokemon.sprites.front_default} />;
};

export default PokemonDetail;
