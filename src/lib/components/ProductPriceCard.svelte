<script>
    const id = "6767f66f21cc010007e2777c";
    let { price } = $props();
</script>

<a href={`/relocate/${id}`} rel="nofollow noopener noreferrer" target="_blank">
    <li class="bg-white rounded-xl px-4 py-2 flex items-center justify-between border border-neutral-200">
        <img class="w-40" src={price.retailer_logo_url} alt={price.retailer_name} />
        <h1>{price.retailer_name}</h1>
        <span class="text-2xl">1299€</span>
        <svg viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
            <path d="M15 2v7.5h-1V3.832l-9.334 9.334-.707-.707L13.418 3H7.5V2H15zm-4 14H1V6h6.574V5H0v12h12V9.286h-1V16z"/>
        </svg>
    </li>
</a>