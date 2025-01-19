<script>
    import ProductImages from '$lib/components/ProductImages.svelte';
    import ProductPriceCard from '$lib/components/ProductPriceCard.svelte';
    import ProductPageSections from '$lib/components/ProductPageSections.svelte';

    let { data } = $props();
    const product = data.product;
</script>

<section id="product">
    <div class="container px-3 py-8 mx-auto sm:px-6">
        <div class="mb-8 flex items-center space-x-2">
            <a href="/" class="hover:underline">Home</a>
            <span>/</span>
            <a href={`/category/${product.category}`} class="hover:underline">{product.category}</a>
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

<ProductPageSections sections={['product', 'prices', 'history']} />

<section id="prices" class="bg-neutral-50">
    <div class="container px-3 py-8 mx-auto sm:px-6">
        <ul class="max-w-4xl space-y-4">
            {#each Array.from({ length: 20 }) as price}
                <ProductPriceCard />
            {/each}
        </ul>
    </div>
</section>

<section id="history" class="bg-neutral-50">
    <div class="container px-3 py-8 mx-auto sm:px-6">
        <ul class="max-w-4xl space-y-4">
            {#each Array.from({ length: 20 }) as price}
                <ProductPriceCard />
            {/each}
        </ul>
    </div>
</section>