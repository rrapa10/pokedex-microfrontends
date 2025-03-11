import useSWR from "swr";
import api from "../services/api";
import { POKEMON_ENDPOINTS } from "../services/endpoints/pokemon";
import { Pokemon } from "../types/Pokemon";

// Fetcher genérico para Axios
const fetcher = async (url: string) => {
  const response = await api.get<Pokemon>(url);
  return response.data;
};

export const usePokemon = (id: string | number) => {
  const { data, error, isLoading } = useSWR(POKEMON_ENDPOINTS.getPokemon(id), fetcher);

  return {
    pokemon: data as Pokemon | undefined,
    isLoading,
    isError: Boolean(error),
  };
};
