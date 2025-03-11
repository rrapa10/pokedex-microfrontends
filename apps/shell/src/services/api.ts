import axios from "axios";

// Cliente Axios preconfigurado
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 5000,
});

export default api; // ⬅ Aquí exportamos por defecto

// Función para obtener la lista de Pokémon (limitada a 20 por defecto)
export const fetchPokemons = async () => {
  const response = await api.get("/pokemon?limit=20");
  const results = await Promise.all(
    response.data.results.map(async (pokemon: { name: string; url: string }) => {
      const details = await axios.get(pokemon.url);
      return details.data;
    })
  );
  return results;
};
