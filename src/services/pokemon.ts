import axios from "axios";

const url = import.meta.env.VITE_URL
export const getPokemons = async (limit: number, offset: number) => {
  const response = await axios.get(
    `${url}/?limit=${limit}&offset=${offset}`
  );
  const pokemonResults = response.data.results;

  const pokemonDetailsPromises = pokemonResults.map(
    async (pokeman: { name: string; url: string }) => {
      const detailsResponse = await axios.get(pokeman.url);
      return {
        name: pokeman.name,
        imageUrl:
          detailsResponse.data.sprites.other["dream_world"].front_default,
        types: detailsResponse.data?.types,
        ability:detailsResponse.data?.abilities,
        stats: detailsResponse.data?.stats
      };
    }
  );

  return await Promise.all(pokemonDetailsPromises).then((response) => response);
};
