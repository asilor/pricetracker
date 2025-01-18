<script>
    let { product } = $props();
</script>

<div class="space-y-2">
    <span class="bg-red-500 text-white rounded-full px-2 text-sm z-10">-{product.discount}%</span>
    <div>
        <a href={`/prices/${product.slug}-${product._id}`}>
            <img src={product.image} alt={product.title} class="hover:scale-[102%] transition" />
        </a>        
    </div>
    <h2 class="text-xl font-medium font-cabinet-grotesk hover:underline">
        <a href={`/prices/${product.slug}-${product._id}`}>{product.title}</a>
    </h2>
    <div>{product.price}</div>
</div>