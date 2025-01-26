<script>
  import ProductsCarrousel from "$lib/components/ProductsCarrousel.svelte";
  import Hero from "$lib/components/Hero.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Price Tracker FYI - Track and Compare Millions of Prices Accross All Major Retailers</title>
</svelte:head>

<Hero />

<section class="overflow-x-hidden bg-neutral-50">
  <div class="container px-3 py-8 mx-auto sm:px-6">
    <ProductsCarrousel products={data.products} />
  </div>
</section>