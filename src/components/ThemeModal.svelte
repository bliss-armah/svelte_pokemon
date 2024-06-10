<script lang="ts">
  import { showModal, themeData } from "../store";

  let dialog: any; // HTMLDialogElement

  $: if (dialog && $showModal) dialog.showModal();

  const handleSetTheme = (color: string) => {
    themeData.set(color);
    dialog.close();
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => showModal.set(false)}
  on:click|self={() => dialog.close()}
>
  <div
    on:click|stopPropagation
    class="overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 w-96 -translate-y-1/2 z-50 shadow-lg flex items-center justify-center bg-white/80 rounded-3xl"
  >
    <div class="w-full">
      <h3
        class="flex items-center justify-center text-center font-clash font-semibold text-2xl py-4"
      >
        Choose Theme
      </h3>
      <div class="flex items-center justify-center gap-4 bg-black/20 py-12 bg">
        <div
          class="border-gray-500 border rounded-full flex items-center justify-center cursor-pointer"
          on:click={()=>handleSetTheme("pink")}
        >
          <div class="bg-[#e85382] w-16 h-16 m-1 rounded-full"></div>
        </div>
        <div
          class="border-gray-500 hover:border rounded-full flex items-center justify-center cursor-pointer"
          on:click={()=>handleSetTheme("blue")}
        >
          <div class="bg-[#39BADF] w-16 h-16 m-1 rounded-full"></div>
        </div>
        <div
          class="border-gray-500 hover:border rounded-full flex items-center justify-center cursor-pointer"
          on:click={()=>handleSetTheme("yellow")}
        >
          <div class="bg-[#E1A725] w-16 h-16 m-1 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</dialog>
