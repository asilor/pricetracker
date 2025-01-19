<script>
  import ProductsCarrousel from "$lib/components/ProductsCarrousel.svelte";

  let { data } = $props();
  const products = data.products;
</script>

<section class="container px-3 py-4 mx-auto sm:px-6">
  <ProductsCarrousel products={products} />
</section>