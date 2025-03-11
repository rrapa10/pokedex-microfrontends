export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types?: { type: { name: string } }[]; // Para manejar los tipos opcionales
}

// Nueva interfaz para la lista de Pokémon
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}
