<script lang="ts">
  import Navbar from "../../components/Navbar.svelte";
  import { debounce } from "../../lib/index";
  import { useQuery } from "@sveltestack/svelte-query";
  import { getPokemons } from "../../services/pokemon";
  import ThemeModal from "../../components/ThemeModal.svelte";
  import Detail from "../../components/Detail.svelte";
  import { showDetailModal, detailPokemanData, themeData } from "../../store";

  interface PokemonData {
    name: string;
    imageUrl: string;
    types: { type: { name: string } }[];
    ability: string;
  }

  let pokemon: PokemonData[] = [];
  let filteredPokemon: PokemonData[] = [];
  let theme: string;

  let limit = 8;
  let offset = 0;
  let page = 1;

  $: queryResult = useQuery({
    queryKey: ["pokemon", limit, offset],
    queryFn: () => getPokemons(limit, offset),
    onSuccess: (data) => {
      pokemon = data;
      filteredPokemon = data;
    },
  });

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

  const nextPage = () => {
    offset += 8;
    page += 1;
  };

  const prevPage = () => {
    if (offset - 8 < 0) return;
    offset -= 8;
    page -= 1;
  };

  const handlePokemanDetail = (data: any) => {
    detailPokemanData.update((value) => (value = data));
    showDetailModal.set(true);
  };

  themeData.subscribe((value: string) => {
    theme = value;
  });

  // $: console.log($queryResult)
</script>

<div>
  <Navbar on:search={debouncedFilter} />
  <ThemeModal />
  <div class="bg-[#F1F1F1] bg-opacity-50">
    <div class="w-full h-full py-24 lg:py-32 px-12 lg:px-52 4xl:px-[30rem]">
      <div
        class="absolute w-full h-full inset-0 bg-noise opacity-5 -z-10"
      ></div>
      <div
        class="flex flex-col gap-y-16 md:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-x-8 2xl:gap-y-20"
      >
        {#if $queryResult.isLoading}
          <p>Loading...</p>
        {:else if $queryResult.isError}
          <p>Error here</p>
        {:else}
          {#each filteredPokemon as pokeman (pokeman.imageUrl)}
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
                  {#if pokeman?.types}
                    {#each pokeman.types as type}
                      <div
                        class="bg-gray-200 rounded-[40px] py-1.5 px-6 text-base"
                      >
                        {type.type.name}
                      </div>
                    {/each}
                  {/if}
                </div>
                <button
                  on:click={() => handlePokemanDetail(pokeman)}
                  class={`${theme === "pink" ? "bg-[#e85382]" : theme === "blue" ? "bg-[#39BADF]" : "bg-[#E1A725]"} w-full py-4 px-8 flex md:group-hover:flex justify-between items-center rounded-2xl md:hidden`}
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
      <div class="flex justify-between my-16">
        <div class="flex justify-center items-center mt-4">
          <button
            on:click={prevPage}
            disabled={offset === 0}
            class=" bg-purpleTheme hover:bg-yellowTheme text-black font-bold py-2 px-4 rounded mr-2"
            >Prev</button
          >
          <h1>{page}</h1>
          <button
            on:click={nextPage}
            class=" bg-purpleTheme hover:bg-yellowTheme text-black font-bold py-2 px-4 ml-2 rounded"
            >Next</button
          >
        </div>
        <label>
          <select bind:value={limit} name="" id="" class="w-24">
            {#each [8, 16, 24, 32] as number}
              <option value={number}>{number}</option>
            {/each}
          </select>
        </label>
      </div>
    </div>
  </div>
</div>
<Detail />
