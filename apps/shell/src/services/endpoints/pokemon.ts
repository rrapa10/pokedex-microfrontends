export const POKEMON_ENDPOINTS = {
  getPokemon: (id: string | number) => `/pokemon/${id}`,
  getPokemonList: (limit: number, offset: number) =>
    `/pokemon?limit=${limit}&offset=${offset}`,
};
