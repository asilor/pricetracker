<script>
  let { data } = $props();
  const products = data.products;
</script>

{#each products as product}
  <a href={`/price/ss-${product._id}`} class="block bg-white shadow-lg rounded-lg p-6 mt-8 no-underline">
    <div>
      <h2 class="font-medium text-2xl font-cabinet-grotesk">{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.category}</p>
    </div>
  </a>
{/each}