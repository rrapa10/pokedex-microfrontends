import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';

interface Pokemon {
  name: string;
  url: string;
}

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <List>
      {pokemons.map((pokemon) => (
        <ListItem key={pokemon.name}>
          <ListItemText primary={pokemon.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default PokemonList;
