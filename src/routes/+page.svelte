<script>
  import ProductsCarrousel from "$lib/components/ProductsCarrousel.svelte";
  import Hero from "$lib/components/Hero.svelte";

  let { data } = $props();
  const products = data.products;
</script>

<Hero />

<section class="overflow-x-hidden bg-neutral-50">
  <div class="container px-3 py-8 mx-auto sm:px-6">
    <ProductsCarrousel products={products} />
  </div>
</section>