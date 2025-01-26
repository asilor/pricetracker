<script>
    import ProductCard from "$lib/components/ProductCard.svelte";
    import emblaCarouselSvelte from "embla-carousel-svelte";

    let { products } = $props();

    let emblaApi;

    function initCarrousel(event) {
      emblaApi = event.detail;
    }

    function scrollPrev() {
        emblaApi.scrollPrev();
    }

    function scrollNext() {
        emblaApi.scrollNext();
    }
</script>

<div class="relative" use:emblaCarouselSvelte onemblaInit="{initCarrousel}">
    <div class="flex space-x-8">
        {#each products as product}
            <div class="flex-none w-60">
                <ProductCard product={product} />
            </div>
        {/each}
    </div>
    <button onclick={scrollPrev} class="absolute top-1/2 -left-5 bg-white rounded-full border border-neutral-200 p-3 hover:shadow cursor-pointer" aria-label="Previous">
        <svg class="h-4 w-4" viewBox="0 0 532 532">
            <path fill="currentColor" d="M305.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L151.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 00-229.332-229.454 35.065 35.065 0 01-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C122.192 194.973 282.731 34.31 305.66 11.354Z"></path>
        </svg>
    </button>
    <button onclick={scrollNext} class="absolute top-1/2 -right-5 bg-white rounded-full border border-neutral-200 p-3 hover:shadow cursor-pointer" aria-label="Next">
        <svg class="h-4 w-4 rotate-180" viewBox="0 0 532 532">
            <path fill="currentColor" d="M305.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L151.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 00-229.332-229.454 35.065 35.065 0 01-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C122.192 194.973 282.731 34.31 305.66 11.354Z"></path>
        </svg>
    </button>
</div>