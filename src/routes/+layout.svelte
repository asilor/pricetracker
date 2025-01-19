<script>
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import "../app.css";
	let { children } = $props();
</script>

<Header />
<main class="overflow-x-hidden">
    {@render children()}
</main>
<Footer />
