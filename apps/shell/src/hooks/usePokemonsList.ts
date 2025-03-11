import useSWR from "swr";
import api from "../services/api";
import { POKEMON_ENDPOINTS } from "../services/endpoints/pokemon";
import { PokemonListResponse } from "../types/Pokemon";

// Fetcher genérico para Axios
const fetcher = async (url: string) => {
  const response = await api.get<PokemonListResponse>(url);
  return response.data;
};

export const usePokemonsList = (limit = 20, offset = 0) => {
  const { data, error, isLoading } = useSWR(
    POKEMON_ENDPOINTS.getPokemonList(limit, offset),
    fetcher
  );

  return {
    pokemons: data?.results || [],
    isLoading,
    isError: Boolean(error),
  };
};
