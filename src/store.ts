import { writable, type Writable } from "svelte/store";

interface PokemonData {
    name: string;
    imageUrl: string;
    types: { type: { name: string } }[];
  }

export const searchText = writable("");
export const pokemonData: Writable<PokemonData[]> = writable([])
export const showModal = writable(false);
export const showDetailModal = writable(false);
export const detailPokemanData : Writable<PokemonData> = writable()
export const themeData = writable('pink')