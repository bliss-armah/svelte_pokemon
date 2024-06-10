// // page.server.ts
// import type { PageServerLoad } from "./$types";
// import axios from "axios";

// interface PokemonData {
//   name: string;
//   imageUrl: string;
//   types: { type: { name: string } }[];
// }

// export const load: PageServerLoad = async ({ url }) => {
//   const limit = Number(url.searchParams.get("limit")) || 8;
//   const offset = Number(url.searchParams.get("offset")) || 0;

//   const getPokemons = async () => {
//     const response = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
//     );
//     const pokemonResults = response.data.results;

//     // Fetch additional details for each Pokémon to get the image URL
//     const pokemonDetailsPromises = pokemonResults.map(
//       async (pokeman: { name: string; url: string }) => {
//         const detailsResponse = await axios.get(pokeman.url);
//         return {
//           name: pokeman.name,
//           imageUrl:
//             detailsResponse.data.sprites.other["dream_world"].front_default,
//           types: detailsResponse.data?.types,
//         };
//       }
//     );

//     // Wait for all details fetches to complete
//     return await Promise.all(pokemonDetailsPromises);
//   };

//   const pokemons = await getPokemons();
//   return { pokemons };
// };
