<script>
    let { options, variants, id } = $props();

    const [currentVariant] = variants.filter(variant => variant.variant_id === id);
</script>

<ul class="space-y-4">
    {#each options as option}
        <li>
            <h3 class="font-medium mb-2">{option.name}: {currentVariant.options[option.key]}</h3>
            <div class="flex space-x-2">
                {#each option.values as value}
                    <button 
                        class="px-3 py-1 border rounded-sm text-sm cursor-pointer {currentVariant.options[option.key] === value ? '' : 'border-neutral-300'}"
                    >
                        {value}
                    </button>
                {/each}
            </div>
        </li>
    {/each}
</ul>