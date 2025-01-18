<script>
    import ProductImages from '$lib/components/ProductImages.svelte';

    let { data } = $props();
    const product = data.product;
</script>

<section id="prices" class="overflow-hidden">
    <div class="container mx-auto px-4 lg:px-8 py-6">
        <div class="mb-8 flex items-center space-x-2">
            <a href="/" class="hover:underline">Home</a>
            <span>/</span>
            <a href={`/category/${product.category}`} class="hover:underline">{product.category}</a>
            <span>/</span>
            <div class="text-neutral-600">{product.title}</div>
        </div>
        <div class="grid lg:grid-cols-2 gap-8">
            <ProductImages images={product.images} thumbnails={product.thumbnails} client:idle />
            <div>
                <h1 class="text-4xl font-medium font-cabinet-grotesk">{product.title}</h1>
                <p>{product.description}</p>
                <div >{product.price}</div>
            </div>
        </div>
    </div>
</section>