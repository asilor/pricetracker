<script>
    let { retailer } = $props();
</script>

<li class="bg-white rounded-xl border border-neutral-200 cursor-pointer">
    <a href={retailer.link} class="px-4 py-4 flex items-center justify-between w-full" rel="nofollow noopener noreferrer" target="_blank">
        <img class="w-32" src={retailer.logo_url} alt={retailer.retailer_name} />
        <h1>{retailer.name}</h1>
        <span class="text-2xl">{retailer.price}€</span>
        <svg viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
            <path d="M15 2v7.5h-1V3.832l-9.334 9.334-.707-.707L13.418 3H7.5V2H15zm-4 14H1V6h6.574V5H0v12h12V9.286h-1V16z"/>
        </svg>
    </a>
</li>