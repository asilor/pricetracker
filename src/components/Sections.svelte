<script lang="ts">
    const sections = ['history', 'prices'];
    let currentSection = $state(sections[0]);

    function scrollToSection(id) {
        const element = document.getElementById(id);
        element.scrollIntoView();
    }
</script>

<div class="sticky top-20 z-50 border-b bg-white/50 backdrop-blur-md">
    <div class="container mx-auto px-4 lg:px-8 flex space-x-6">
        <button
        class="py-2 px-2 border-black text-lg {currentSection === 'prices' ? 'border-b-2 font-medium' :''}"
        onclick={() => scrollToSection('prices')}
        >
        Prices
    </button>
    <button
        class="py-2 px-2 border-black text-lg {currentSection === 'prices' ? 'border-b-2 font-medium' :''}"
        onclick={() => scrollToSection('history')}
    >
        History
    </button>
    </div>
</div>