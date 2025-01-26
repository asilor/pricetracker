<script>
    import { locale } from '$lib/state/locale.svelte';
    let { options, variants, id } = $props();

    const [currentVariant] = $derived(variants.filter(variant => variant.variant_id === id));

    function findVariantForOption(optionKey, newValue) {
        return variants.find(variant => {
            if (variant.variant_id === id) return false;
            
            // Check all options match except the one we're changing
            for (const [key, value] of Object.entries(currentVariant.options)) {
                if (key === optionKey) {
                    if (variant.options[key] !== newValue) return false;
                } else {
                    if (variant.options[key] !== value) return false;
                }
            }
            return true;
        });
    }
</script>

<ul class="space-y-4">
    {#each options as option}
        <li>
            <h3 class="font-medium mb-2">{option.name}: {currentVariant.options[option.key]}</h3>
            <div class="flex space-x-2">
                {#each option.values as value}
                    {@const variantForOption = findVariantForOption(option.key, value)}
                    {#if variantForOption}
                        <a 
                            href="/{locale.language}/compare-prices/{variantForOption.variant_id}"
                            class="px-3 py-1 rounded-sm border border-neutral-300"
                        >
                            {value}
                        </a>
                    {:else}
                        <button 
                            disabled
                            class="px-3 py-1 rounded-sm border {currentVariant.options[option.key] === value ? 'cursor-pointer' : 'cursor-not-allowed border-neutral-300 text-neutral-400'}"
                        >
                            {value}
                        </button>
                    {/if}
                {/each}
            </div>
        </li>
    {/each}
</ul>