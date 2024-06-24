<script lang="ts">
  import { showDetailModal, detailPokemanData, themeData } from "../store";

  let dialog: any; // HTMLDialogElement
  let option = "about";
  let theme: string = "";

  // themeData.subscribe((value: string) => {
  //   theme = value;
  // });

  $: if (dialog && $showDetailModal) dialog.showModal();

  let detail: any;

  detailPokemanData.subscribe((value) => {
    detail = value;
  });

  const closeModal = () => {
    dialog.close();
  };

  const changeOption = (text: string) => {
    option = text;
  };

  $: console.log(detail);
</script>

<dialog
  bind:this={dialog}
  on:close={() => showDetailModal.set(false)}
  on:click|self={() => dialog.close()}
>
  <div
    on:click|stopPropagation
    class="overflow-hidden fixed h-screen z-50 top-0 right-0 -translate-x-1/2 w-[100%] md:w-[45%] lg:w-[45%] xl:w-[40%] py-2 lg:py-4 px-2 lg:px-4 flex-col items-start justify-center bg-white overflow-y-scroll"
    style="opacity: 1; transform: translateX(0vw) translateZ(0px);"
  >
    <div
      class="w-full h-full flex flex-col items-center justify-start bg-gradient-to-r from-white/20 via-gline/20 to-white/20"
    >
      <div
        class="py-3 px-3 bg-gradient-to-b from-[#7FCAD1] to-[#3DA0A9] h-1/5 2xl:h-2/5 w-full md:h-1/3 rounded-2xl"
      >
        <div
          on:click={closeModal}
          class="cursor-pointer hover:shadow-xl w-16 p-3 rounded-xl h-16 flex items-center justify-center bg-white shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            class="font-bold"
            ><path
              fill-rule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            ></path></svg
          >
        </div>
        <div class="flex justify-center items-center w-full h-full">
          <img
            src={detail?.imageUrl}
            alt="Pokemon"
            class="h-full w-28 md:w-56 2xl:w-full lg:mt-8"
          />
        </div>
      </div>
      <div class="mt-8 md:mt-16 mb-4">
        <h2 class="font-clash text-5xl font-medium my-4">{detail?.name}</h2>
        <div class="my-8 flex justify-center items-center gap-8">
          {#if detail?.types}
            {#each detail.types as type}
              <div class="bg-gray-200 rounded-[40px] py-1.5 px-6 text-base">
                {type.type.name}
              </div>
            {/each}
          {/if}
        </div>
      </div>
      {#if option === "about"}
        <div class="block w-full" id="tab1">
          <div class="w-full">
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
            <h1 class="w-full text-center py-4 bg-white font-semibold text-2xl">
              About
            </h1>
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
            <div>
              <div
                class="my-4 font-clash text-xl w-full flex flex-col items-center"
              >
                <div>
                  <div class=" grid grid-cols-2 space-x-8 my-2">
                    <h2 class="">Height</h2>
                    <h2 class="text-left font-semibold">7</h2>
                  </div>
                  <div
                    class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
                  ></div>
                  <div class="grid grid-cols-2 space-x-8 my-2">
                    <h2>Weight</h2>
                    <h2 class="text-left font-semibold">69</h2>
                  </div>
                  <div
                    class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
                  ></div>
                  <div class="grid grid-cols-2 space-x-8 my-2">
                    <h2>Abilities</h2>
                    <div class="font-semibold flex items-start flex-col">
                      {#if detail?.ability}
                        {#each detail.ability as ability}
                          <li>{ability.ability.name}</li>
                        {/each}
                      {/if}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
          </div>
        </div>
      {:else if option === "stats"}
        <div class="block w-full" id="tab2">
          <div class="w-full">
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
            <h1
              class="w-full text-center font-clash py-4 bg-white font-semibold text-2xl"
            >
              Stats
            </h1>
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
            <div>
              <div
                class="my-4 font-clash text-xl w-full flex flex-col items-center"
              >
                <div class="w-full">
                  {#if detail.stats}
                    {#each detail.stats as stats}
                      <div>
                        <div class=" grid grid-cols-2 space-x-8 my-2">
                          <h2 class="text-right">{stats?.stat?.name}</h2>
                          <h2
                            class="text-left font-semibold flex items-center gap-6"
                          >
                            <div
                              class="flex w-2/3 h-2 bg-black/10 rounded-full overflow-hidden"
                            >
                              <div
                                class={`flex w-full flex-col justify-center overflow-hidden ${theme === "pink" ? "bg-[#e85382]" : theme === "blue" ? "bg-[#39BADF]" : "bg-[#E1A725]"}`}
                                role="progressbar"
                                style={`width: ${stats.base_stat}%;`}
                              ></div>
                            </div>
                            <span class="text-normal font-semibold"
                              >{stats.base_stat}</span
                            >
                          </h2>
                        </div>
                        <div
                          class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
                        ></div>
                      </div>
                    {/each}
                  {/if}
                </div>
              </div>
            </div>
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
          </div>
        </div>
      {:else}
        <div class="block w-full" id="tab3">
          <div class="w-full">
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
            <h1
              class="w-full text-center font-clash py-4 bg-white font-semibold text-2xl"
            >
              Similar
            </h1>
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
            <div>
              <div
                class="my-4 font-clash text-xl w-full flex flex-col items-center"
              >
                <div>
                  <div class=" grid grid-cols-2 space-x-8 my-2">
                    <h2 class="">Height</h2>
                    <h2 class="text-left font-semibold">7</h2>
                  </div>
                  <div
                    class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
                  ></div>
                  <div class="grid grid-cols-2 space-x-8 my-2">
                    <h2>Weight</h2>
                    <h2 class="text-left font-semibold">69</h2>
                  </div>
                  <div
                    class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
                  ></div>
                  <div class="grid grid-cols-2 space-x-8 my-2">
                    <h2>Abilities</h2>
                    <div class="font-semibold flex items-start flex-col">
                      <li>overgrow</li>
                      <li>chlorophyll</li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gradient-to-r from-white via-gray-500/50 to-white w-full h-0.5"
            ></div>
          </div>
        </div>
      {/if}
    </div>
    <div
      class="absolute z-50 font-general text-lg bottom-4 w-full py-4 bg-white font-medium"
    >
      <div
        class="bg-gray-300 rounded-[60px] shadow-inner p-2 grid grid-cols-3 text-center items-center w-[80%] lg:w-3/5 mx-auto justify-around"
      >
        <div
          on:click={() => changeOption("about")}
          class={`${option === "about" ? "true" : "false "}`}
        >
          About
        </div>
        <div
          on:click={() => changeOption("stats")}
          class={`${option === "stats" ? "true" : "false "}`}
        >
          Stats
        </div>
        <div
          on:click={() => changeOption("similar")}
          class={`${option === "similar" ? "true" : "false "}`}
        >
          Similar
        </div>
      </div>
    </div>
  </div>
</dialog>

<style>
  ::-webkit-scrollbar {
    display: none;
  }

  .true {
    width: 100%;
    background: white !important;
    border-radius: 60px;
    padding-top: 12px;
    padding-bottom: 12px;
    cursor: pointer;
    text-align: center;
  }

  .false {
    cursor: pointer;
  }
</style>
