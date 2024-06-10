<script>
    import "../app.css";
    import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	const queryClient = new QueryClient();
  </script>
  

  <div class="">

    <QueryClientProvider client={queryClient}>
      <main>
        <slot />
      </main>
    </QueryClientProvider>
  </div>