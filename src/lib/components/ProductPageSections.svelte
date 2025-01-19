<script>
    const { sections } = $props();
    let currentSection = $state(sections[0]);

    function scrollToSection(id) {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    }

    $effect(() => {
        const options = {
            root: null,
            rootMargin: '-8% 0px -75% 0px',
            threshold: 0.05
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentSection = entry.target.id;
                }
            });
        }, options);

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    });
</script>

<div class="sticky top-18 z-50 bg-white/80 backdrop-blur-2xl">
    <ul class="container mx-auto flex items-center px-3 lg:px-6 space-x-8">
        {#each sections as section}
            <button
                class="py-2 px-2 border-black text-lg cursor-pointer {currentSection === section ? 'border-b-2' :''}"
                onclick={() => scrollToSection(section)}
            >
                {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
        {/each}
    </ul>
</div>