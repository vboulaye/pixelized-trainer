<script lang="ts">
	import 'simpledotcss/simple.min.css';
	import { page } from '$app/stores';

	let data = $page.data;

	// onMount(async () => {
	// 	const accessToken = getAccessToken();
	// 	if (accessToken) {
	// 		identity = await callDiscogs({ path: '/oauth/identity' });
	// 	}
	// });

</script>

<header>
	<nav>
		{#if data.identity}
			<a href="/" data-sveltekit-preload-data="off">Welcome {data.identity?.username}</a>/
		{:else if data.accessToken}
			Loading...
		{:else}
			<a href="/login" data-sveltekit-preload-data="off">login to discogs</a>/
		{/if}
	</nav>
</header>

<main>
	<slot></slot>
</main>

<style>
    :root {
        --accent: darkcyan;
    }
</style>