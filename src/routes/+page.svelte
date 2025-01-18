<script>
  import ProductsCarrousel from "$lib/components/ProductsCarrousel.svelte";

  let { data } = $props();
  const products = data.products;
</script>

<ProductsCarrousel {products} />