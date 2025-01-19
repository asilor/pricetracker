<script>
    let query = $state("");
    let response = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];
  
    let results = $derived(response.filter(result => result.toLowerCase().includes(query.toLowerCase())));
    let hideResults = $derived(query.length == 0);
  
    function handleSubmit(event) {
      if (query.length == 0) {
        event.preventDefault();
      } else {  
        setTimeout(() => {
          query = "";
        }, 0);
      }
    }
  </script>
  
  <form action="/search" method="GET" class="relative w-lg" onsubmit={handleSubmit}>
    <div class="relative overflow-hidden rounded-t-[19px] border border-neutral-200" class:rounded-[19px]={hideResults} >
      <input
        type="text"
        placeholder="Search..."
        bind:value={query}
        class="w-full bg-neutral-50/50 backdrop-blur-md px-4 py-1.5 pr-16 focus:outline-none appearance-none border-none"
      />
      <button type="submit" name="q" value={query} class="absolute right-0.5 top-0.5 bottom-0.5 bg-black hover:bg-neutral-800 text-white rounded-full px-3 py-1 focus:outline-none cursor-pointer" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6">
          <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <ul class="absolute bg-neutral-50 left-0 right-0 overflow-hidden border-t-0 border border-neutral-200 rounded-b-[19px] shadow-lg" class:hidden={hideResults}>
      {#each results as result}
        <li>
          <button type="submit" name="q" value={result} class="text-left w-full px-4 py-1.5 cursor-pointer hover:bg-neutral-100">
            {result}
          </button>
        </li>
      {:else}
        <li>
          <button type="submit" name="q" value={query} class="text-left w-full px-4 py-1.5 cursor-pointer hover:bg-neutral-100">
            {query}
          </button>
        </li>
      {/each}
    </ul>
  </form>