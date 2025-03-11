import { useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
}

export const usePokemon = (id: string | undefined) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
        saveToHistory(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  const saveToHistory = (pokemon: Pokemon) => {
    const history = JSON.parse(localStorage.getItem("pokemonHistory") || "[]");
    const updatedHistory = [
      { id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default },
      ...history.filter((p: any) => p.id !== pokemon.id),
    ].slice(0, 5);
    localStorage.setItem("pokemonHistory", JSON.stringify(updatedHistory));
  };

  return { pokemon, loading };
};
