<script lang="ts">
  import Navbar from "../../components/Navbar.svelte";
  import axios from "axios";
  import { debounce } from "../../lib/index";
  import { useQuery } from "@sveltestack/svelte-query";
  import { get } from "svelte/store";

  interface PokemonData {
    name: string;
    imageUrl: string;
    types: { type: { name: string } }[];
  }

  let pokemon: PokemonData[] = [];
  let filteredPokemon: PokemonData[] = [];

  const getPokemons = async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=20"
    );
    const pokemonResults = response.data.results;

    // Fetch additional details for each Pokémon to get the image URL
    const pokemonDetailsPromises = pokemonResults.map(
      async (pokeman: { name: string; url: string }) => {
        const detailsResponse = await axios.get(pokeman.url);
        return {
          name: pokeman.name,
          imageUrl:
            detailsResponse.data.sprites.other["dream_world"].front_default,
          types: detailsResponse.data?.types,
        };
      }
    );

    // Wait for all details fetches to complete
    return await Promise.all(pokemonDetailsPromises);
  };

  const queryResult = useQuery("pokemon", getPokemons);
  const { data, isError, isLoading } = $queryResult;

  console.log(isLoading);

  $: if (data) {
    pokemon = data;
    filteredPokemon = pokemon;
  }

  const filterPokemonWithName = (event: CustomEvent) => {
    const searchText = event.detail.text.toLowerCase();
    if (!searchText) {
      filteredPokemon = pokemon;
    } else {
      filteredPokemon = pokemon.filter((pokeman) =>
        pokeman.name.toLowerCase().includes(searchText)
      );
    }
  };

  const debouncedFilter = debounce(filterPokemonWithName, 300);
</script>

<div>
  <Navbar on:search={debouncedFilter} />
  <div class="bg-[#F1F1F1] bg-opacity-50">
    <div class="w-full h-full py-24 lg:py-32 px-12 lg:px-52 4xl:px-[30rem]">
      <div
        class="absolute w-full h-full inset-0 bg-noise opacity-5 -z-10"
      ></div>
      <div
        class="flex flex-col gap-y-16 md:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-x-8 2xl:gap-y-20"
      >
        {#if isLoading}
          <p>Loading...</p>
        {:else if isError}
          <p>Error here</p>
        {:else}
          {#each filteredPokemon as pokeman, i (pokeman.imageUrl)}
            <div
              class="text-black text-2xl shadow-md flex justify-center p-3 !pb-8 hover:!pb-2 text-center bg-white rounded-2xl md:h-80 md:hover:h-96 h-96 group transition-all duration-500 ease-in-out"
            >
              <div class="w-full">
                <div
                  class="bg-gray-100 rounded-2xl flex justify-center items-center h-2/5 md:h-3/5 md:group-hover:h-2/5 pb-8 relative transition-all ease-in-out duration-500"
                >
                  <img
                    src={pokeman.imageUrl}
                    alt="Pokeman"
                    class="h-52 w-full absolute -top-16"
                  />
                </div>
                <h2 class="text-2xl font-medium my-4">{pokeman.name}</h2>
                <div class="my-8 flex justify-center items-center gap-8">
                  {#if pokeman.types[0]?.type?.name}
                    <div
                      class="bg-gray-200 rounded-[40px] py-1.5 px-6 text-base"
                    >
                      {pokeman.types[0]?.type?.name}
                    </div>
                  {/if}
                  {#if pokeman.types[1]?.type?.name}
                    <div
                      class="bg-gray-200 rounded-[40px] py-1.5 px-6 text-base"
                    >
                      {pokeman.types[1]?.type?.name}
                    </div>
                  {/if}
                </div>
                <button
                  class="bg-[#e85382] w-full py-4 px-8 flex md:group-hover:flex justify-between items-center rounded-2xl md:hidden"
                >
                  <h2 class="text-white text-base">View Pokemon</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    class="w-6 text-white"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>











// server

<script lang="ts">
  import Navbar from "../../components/Navbar.svelte";
  import axios from "axios";
  import { debounce } from "../../lib/index";
  import { useQuery } from "@sveltestack/svelte-query";
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  export let data: any;

  console.log(data.pokemons);

  interface PokemonData {
    name: string;
    imageUrl: string;
    types: { type: { name: string } }[];
  }

  let pokemon: PokemonData[] = data.pokemons;
  export let limit = 8;
  export let offset=0;
  let filteredPokemon: PokemonData[] = pokemon;
  let currentPage: number = Math.floor(offset / limit) + 1;

  const filterPokemonWithName = (event: CustomEvent) => {
    const searchText = event.detail.text.toLowerCase();
    if (!searchText) {
      filteredPokemon = pokemon;
    } else {
      filteredPokemon = pokemon.filter((pokeman) =>
        pokeman.name.toLowerCase().includes(searchText)
      );
    }
  };

  const debouncedFilter = debounce(filterPokemonWithName, 300);

  const changePage = async (newPage: number) => {
    const newOffset = (newPage - 1) * limit;
    await goto(`?limit=${limit}&offset=${newOffset}`,{
      invalidateAll: true
    });
  };
</script>

<div>
  <Navbar on:search={debouncedFilter} />
  <div class="bg-[#F1F1F1] bg-opacity-50">
    <div class="w-full h-full py-24 lg:py-32 px-12 lg:px-52 4xl:px-[30rem]">
      <div
        class="absolute w-full h-full inset-0 bg-noise opacity-5 -z-10"
      ></div>
      <div
        class="flex flex-col gap-y-16 md:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-x-8 2xl:gap-y-20"
      >
        <!-- {#if isLoading}
          <p>Loading...</p>
        {:else if isError}
          <p>Error here</p>
        {:else} -->
        {#each filteredPokemon as pokeman, i (pokeman.imageUrl)}
          <div
            class="text-black text-2xl shadow-md flex justify-center p-3 !pb-8 hover:!pb-2 text-center bg-white rounded-2xl md:h-80 md:hover:h-96 h-96 group transition-all duration-500 ease-in-out"
          >
            <div class="w-full">
              <div
                class="bg-gray-100 rounded-2xl flex justify-center items-center h-2/5 md:h-3/5 md:group-hover:h-2/5 pb-8 relative transition-all ease-in-out duration-500"
              >
                <img
                  src={pokeman.imageUrl}
                  alt="Pokeman"
                  class="h-52 w-full absolute -top-16"
                />
              </div>
              <h2 class="text-2xl font-medium my-4">{pokeman.name}</h2>
              <div class="my-8 flex justify-center items-center gap-8">
                {#if pokeman.types[0]?.type?.name}
                  <div class="bg-gray-200 rounded-[40px] py-1.5 px-6 text-base">
                    {pokeman.types[0]?.type?.name}
                  </div>
                {/if}
                {#if pokeman.types[1]?.type?.name}
                  <div class="bg-gray-200 rounded-[40px] py-1.5 px-6 text-base">
                    {pokeman.types[1]?.type?.name}
                  </div>
                {/if}
              </div>
              <button
                class="bg-[#e85382] w-full py-4 px-8 flex md:group-hover:flex justify-between items-center rounded-2xl md:hidden"
              >
                <h2 class="text-white text-base">View Pokemon</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  class="w-6 text-white"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        {/each}
        <!-- {/if} -->
      </div>
      <div class="flex justify-between my-16">
        <div class="flex justify-center items-center mt-4">
          <button
            on:click={() => changePage(currentPage - 8)}
            disabled={currentPage === 1}
            class=" bg-purpleTheme hover:bg-yellowTheme text-black font-bold py-2 px-4 rounded mr-2"
            >Prev</button
          >
          <h1>2</h1>
          <button
            on:click={() => changePage(currentPage + 8)}
            class=" bg-purpleTheme hover:bg-yellowTheme text-black font-bold py-2 px-4 ml-2 rounded"
            >Next</button
          >
        </div>
        <!-- <div class="m_46b77525 mantine-InputWrapper-root mantine-Select-root">
          <div
            class="m_6c018570 mantine-Input-wrapper mantine-Select-wrapper"
            data-variant="default"
            data-pointer="true"
            data-with-right-section="true"
            style="--input-right-section-pointer-events: all;"
          >
            <input
              class="m_8fb7ebe7 mantine-Input-input mantine-Select-input"
              data-variant="default"
              readonly
              aria-haspopup="listbox"
              autocomplete="off"
              aria-invalid="false"
              id="mantine-hh2slpbgv"
              value="8"
              aria-controls="mantine-c2p6unwf4"
            />
            <div
              data-position="right"
              class="m_82577fc2 mantine-Input-section mantine-Select-section"
            >
              <button
                class="mantine-focus-auto mantine-active m_86a44da5 mantine-CloseButton-root m_87cf2631 mantine-UnstyledButton-root"
                data-variant="transparent"
                data-size="sm"
                type="button"
                tabindex="-1"
                aria-hidden="true"
                aria-label="Clear selection"
                style="--cb-size: var(--cb-size-sm);"
                ><svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="width: 15px; height: 15px; color: rgb(107, 114, 128);"
                  ><path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path></svg
                ></button
              >
            </div>
          </div>
        </div>
        <input type="hidden" name="pageSelector" value="8" /> -->
      </div>
    </div>
  </div>
</div>
