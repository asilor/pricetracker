<script>
    import { locale } from '$lib/state/locale.svelte';
    let { product } = $props();
</script>

<div class="space-y-2">
    <span class="bg-red-500 text-white rounded-full px-2 text-sm z-10">-{product.discount}%</span>
    <div>
        <a href="/{locale.language}/compare-prices/{product.slug}-{product._id}">
            <img src={product.images[0]} alt={product.title} class="hover:scale-[102%] transition h-60 mx-auto" />
        </a>
    </div>
    <h2 class="text-xl font-medium font-cabinet-grotesk hover:underline">
        <a href="/{locale.language}/compare-prices/{product.slug}-{product._id}">{product.title}</a>
    </h2>
    <div>{product.price}</div>
</div>