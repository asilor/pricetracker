<script>
    import ProductImages from '$lib/components/ProductImages.svelte';
    import ProductPriceCard from '$lib/components/ProductPriceCard.svelte';

    let { data } = $props();
    const product = data.product;
</script>

<section>
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

<nav class="sticky top-0 z-50 bg-white">
    <ul class="container mx-auto flex items-center px-4 lg:px-8 space-x-8">
        <li class="px-2 py-4 border-b-2">
            <a href="#description">Prices</a>
        </li>
        <li class="px-2 py-4">
            <a href="#reviews">Price History</a>
        </li>
        <li class="px-2 py-4">
            <a href="#faq">Details</a>
        </li>
    </ul>
</nav>

<section class="bg-neutral-50">
    <div class="container px-3 py-8 mx-auto sm:px-6">
        <ul class="max-w-4xl space-y-4">
            {#each Array.from({ length: 10 }) as price}
                <ProductPriceCard />
            {/each}
        </ul>
    </div>
</section>