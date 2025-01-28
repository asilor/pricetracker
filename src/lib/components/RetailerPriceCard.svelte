<script>
    let { retailer } = $props();
</script>

<li class="bg-white rounded-xl border border-neutral-200 cursor-pointer">
    <a href={retailer.link} class="px-5 py-4 flex items-center justify-between w-full" rel="nofollow noopener noreferrer" target="_blank">
        <img class="w-28" src={retailer.logo_url} alt={retailer.retailer_name} />
        <span class="text-2xl">{retailer.price}€</span>
    </a>
</li>