<script lang="ts">
  import HomePicture from "../components/HomePicture.svelte";
  import { searchText, themeData } from "../store";
  import { goto } from "$app/navigation";

  let search: string;
  let theme: string;

  const handleSearch = () => {
    searchText.set(search);
    goto("/listview");
  };

  themeData.subscribe((value: string) => {
    theme = value;
  });
</script>

<div class="w-screen h-screen flex justify-center items-center relative">
  <div class="flex flex-col items-center">
    <HomePicture />
    <h1
      class="font-semibold text-center mt-6 mb-2 text-3xl lg:text-5xl text-black"
    >
      Poke<span
        class={`${theme === "pink" ? "text-[#e85382]" : theme === "blue" ? "text-[#39BADF]" : "text-[#E1A725]"}`}
        >book</span
      >
    </h1>
    <h3 class="text-center max-w-xs lg:max-w-sm text-sm lg:text-lg font-normal">
      Largest Pokémon index with information about every Pokemon you can think
      of.
    </h3>
    <div
      class={`mt-[4rem] mb-[1rem] flex w-full items-center justify-between rounded-[60px] border-8 ${theme === "pink" ? "border-[#e85382]" : theme === "blue" ? "border-[#39BADF]" : "border-[#E1A725]"} pl-[1.5rem] shadow`}
    >
      <input
        type="text"
        class="lg:text-2xl w-4/5 lg:w-3/4 focus:outline-none bg-transparent"
        placeholder="Enter pokeman name"
        bind:value={search}
      />
      <div
        class={`cursor-pointer hover:shadow-2xl w-10 h-10 lg:w-12 lg:h-12 m-1 lg:m-2 ${
          theme === "pink"
            ? "bg-[#e85382]"
            : theme === "blue"
              ? "bg-[#39BADF]"
              : "bg-[#E1A725]"
        } rounded-full lg:shadow-md flex justify-center items-center`}
        on:click={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
          class="w-5 text-white"
          ><path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clip-rule="evenodd"
          ></path></svg
        >
      </div>
    </div>
    <a
      href="/listview"
      class="font-general lg:text-lg text-black font-medium underline"
      >View all</a
    >
  </div>
</div>
