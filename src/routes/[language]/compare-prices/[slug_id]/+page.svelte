<script>
    import ProductImages from '$lib/components/ProductImages.svelte';
    import ProductVariants from '$lib/components/ProductVariants.svelte';
    import RetailerPriceCard from '$lib/components/RetailerPriceCard.svelte';
    import ProductPageSections from '$lib/components/ProductPageSections.svelte';
    import { locale } from '$lib/state/locale.svelte';

    let { data } = $props();
    let product = $derived(data.product);

    let schema = $derived({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "description": product.description,
    });
</script>

<svelte:head>
<title>{product.title} Best Prices - Price Tracker</title>
{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>

<section id="product">
    <div class="container px-3 py-8 mx-auto sm:px-6">
        <div class="mb-8 flex items-center space-x-2">
            <a href="/{locale.language}" class="hover:underline">Home</a>
            <span>/</span>
            <a href="/{locale.language}/c/{product.category.slug}" class="hover:underline">{product.category.title}</a>
            <span>/</span>
            <div class="text-neutral-600">{product.title}</div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
            <ProductImages images={product.images} thumbnails={product.thumbnails} product={product} />
            <div class="space-y-4">
                <h1 class="text-4xl font-medium font-cabinet-grotesk">{product.title}</h1>
                <p>Brand: {product.brand}</p>
                <ProductVariants options={product.options} variants={product.variants} id={product._id} />
            </div>
        </div>
    </div>
</section>

<ProductPageSections sections={['product', 'compare-prices', 'product-details']} />

<section id="compare-prices" class="bg-neutral-50">
    <div class="container px-3 py-8 mx-auto sm:px-6">
        <ul class="max-w-4xl space-y-4">
            {#each product.retailers as retailer}
                <RetailerPriceCard retailer={retailer} />
            {/each}
        </ul>
    </div>
</section>

<section id="product-details">
    <div class="container px-3 py-8 mx-auto sm:px-6 space-y-8">
        <div class="space-y-2 h-96">
            <h2 class="text-4xl font-medium font-cabinet-grotesk">Product Details</h2>
            <p>{product.description}</p>
        </div>
    </div>
</section>