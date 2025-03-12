import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState<any | null>(null);

  useEffect(() => {
    const handlePokemonSelected = (event: any) => {
      setPokemon(event.detail);
    };

    window.addEventListener("pokemonSelected", handlePokemonSelected);

    return () => {
      window.removeEventListener("pokemonSelected", handlePokemonSelected);
    };
  }, []);

  if (!pokemon) return <p>Selecciona un Pokémon</p>;



  return <PokemonCard name={pokemon.name} image={pokemon.sprites.front_default} />;
};

export default PokemonDetail;
