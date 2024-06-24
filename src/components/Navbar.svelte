<script lang="ts">
  import image from "../lib/assets/pokeCover.svg";
  import { searchText, showModal, themeData } from "../store";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let search: string = "";

  searchText.subscribe((value: string) => {
    search = value;
  });

  function searchPokemon() {
    dispatch("search", { text: search });
  }
</script>

<div
  class="w-full bg-white h-20 flex items-center justify-between px-4 lg:px-10 py-4 relative bg-blend-multiply shadow"
>
  <div class="flex justify-center items-center gap-4">
    <a href="/">
      <img src={image} alt="Poke Cover" class="lg:w-36 w-20 lg:mt-8" />
    </a>
    <a
      href="/"
      class="text-lg lg:text-2xl font-semibold font-clash cursor-pointer hidden lg:block"
    >
      Poke <span
        class={`${$themeData === "pink" ? "text-[#e85382]" : $themeData === "blue" ? "text-[#39BADF]" : "text-[#E1A725]"}`}
        >book</span
      >
    </a>
  </div>

  <div
    class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center lg:w-1/5"
  >
    <div
      class="flex w-full items-center justify-center rounded-[60px] border shadow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        data-slot="icon"
        class="lg:w-5 w-3 text-g100 mr-4 cursor-pointer"
      >
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <input
        name="pokeSearch"
        type="text"
        placeholder="Enter pokeman name"
        class="lg:text-lg w-4/5 text-sm lg:w-3/4 py-2 focus:outline-none"
        bind:value={search}
        on:input={() => searchText.set(search)}
        on:keyup={searchPokemon}
      />
    </div>
  </div>

  <div
    on:click={() => showModal.set(true)}
    class="border-gray border rounded-full flex items-center justify-center cursor-pointer"
  >
    <div
      class={` ${$themeData === "pink" ? "bg-[#e85382]" : $themeData === "blue" ? "bg-[#39BADF]" : "bg-[#E1A725]"} w-8 h-8 m-1 rounded-full`}
    ></div>
  </div>
</div>
