<script>
    import ProductImages from '$lib/components/ProductImages.svelte';
    import RetailerPriceCard from '$lib/components/RetailerPriceCard.svelte';
    import ProductPageSections from '$lib/components/ProductPageSections.svelte';
    import PriceHistory from '$lib/components/PriceHistory.svelte';

    let { data } = $props();
    const product = data.result;
</script>

<svelte:head>
  <title>{product.title} Best Prices - Price Tracker</title>
</svelte:head>

<section id="product">
    <div class="container px-3 py-8 mx-auto sm:px-6">
        <div class="mb-8 flex items-center space-x-2">
            <a href="/" class="hover:underline">Home</a>
            <span>/</span>
            <a href={`/category/${product.categories[0]}`} class="hover:underline">{product.categories[0]}</a>
            <span>/</span>
            <div class="text-neutral-600">{product.title}</div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
            <ProductImages images={product.images} thumbnails={product.thumbnails} product={product} />
            <div>
                <h1 class="text-4xl font-medium font-cabinet-grotesk">{product.title}</h1>
                <p>{product.description}</p>
                <div >{product.price}</div>
            </div>
        </div>
    </div>
</section>

<ProductPageSections sections={['product', 'compare-prices', 'price-history']} />

<section id="compare-prices" class="bg-neutral-50">
    <div class="container px-3 py-8 mx-auto sm:px-6">
        <ul class="max-w-4xl space-y-4">
            {#each product.retailers as retailer}
                <RetailerPriceCard retailer={retailer} />
            {/each}
        </ul>
    </div>
</section>

<section id="price-history">
    <div class="container px-3 py-8 mx-auto sm:px-6 space-y-8">
        <div class="space-y-2">
            <h2 class="text-4xl font-medium font-cabinet-grotesk">Price History</h2>
            <p>The Price History graphs shows the price evolution of each retailer.</p>
        </div>
        <div class="max-w-4xl">
            <PriceHistory />
        </div>
    </div>
</section>