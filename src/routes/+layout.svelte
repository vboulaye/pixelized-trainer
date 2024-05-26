<script lang="ts">
	import 'simpledotcss/simple.min.css';
	import { callDiscogs, getAccessToken } from '$lib/discogs';
	import { onMount } from 'svelte';

	let identity: { username: string };

	onMount(async () => {
		const accessToken = getAccessToken();
		if (accessToken) {
			identity = await callDiscogs({ path: '/oauth/identity' });
		}
	});

</script>

<header>
	{#if identity}
		<nav>
			Welcome {identity?.username}
		</nav>
	{:else}
		Loading...
	{/if}
</header>

<main>
	<slot></slot>
</main>

<style>

    .image-avatar {
        width: 3rem;
        height: 3rem;
    }

    :root {
        --accent: darkcyan;
    }
</style>