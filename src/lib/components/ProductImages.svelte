<script>
    import emblaCarouselSvelte from "embla-carousel-svelte";
  
    let { images, thumbnails } = $props();
    
    let currentImage = $state(0);
    let totalImages = $derived(images.length);
  
    let emblaApi;
    const options = {
      duration: 0,
      breakpoints: {
        "(min-width: 768px)": {
          watchDrag: false,
        },
      },
    };
  
    let imagePosition = $state({ x: 0, y: 0 });
  
    function zoomIn(event) {
      const { left, top, width, height } = event.target.getBoundingClientRect();
      imagePosition.x = ((event.pageX - left) / width) * 100;
      imagePosition.y = ((event.pageY - top) / height) * 100;
    }
  
    function initImages(event) {
      emblaApi = event.detail;
      emblaApi.on("select", updateImage).on("reInit", updateImage);
    }
  
    function updateImage() {
      currentImage = emblaApi.selectedScrollSnap();
    }
  
    export function setImage(index) {
      emblaApi.scrollTo(index);
    }
</script>
  
<div class="flex bg-white">
    <div class="flex-col space-y-2 flex-none w-16 mr-4 hidden md:block">
      {#each thumbnails as thumbnail, index}
        <img
          src={thumbnail}
          alt="Thumbnail"
          class="cursor-pointer p-1 {index === currentImage ? 'ring-1 ring-black' : ''}"
          onmouseenter={() => setImage(index)}
        />
      {/each}
    </div>
    <div
      class="relative md:overflow-hidden rounded"
      use:emblaCarouselSvelte={{ options }}
      onemblaInit={initImages}
    >
      <div class="flex space-x-16 items-center">
        {#each images as image}
          <div class="flex-none w-full object-contain cursor-zoom-in">
            <img
              src={image}
              alt="Main"
              class="product-image-position md:hover:scale-[200%] mx-auto max-h-96"
              onmousemove={zoomIn}
              style:--product-image-x="{imagePosition.x}%"
              style:--product-image-y="{imagePosition.y}%"
            />
          </div>
        {/each}
      </div>
      <div class="text-xs md:hidden bg-white/80 rounded-full px-1 absolute bottom-2 left-2">
        {currentImage + 1} / {totalImages}
      </div>
    </div>
</div>