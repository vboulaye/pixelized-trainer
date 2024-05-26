<script lang="ts">

	import { page } from '$app/stores';
	import { onMount } from 'svelte';


	let data = $page.data;

	let accessToken;

	onMount(async () => {
		accessToken = JSON.parse(localStorage.getItem('accessToken') || '');

	});
</script>

<a href="/login" data-sveltekit-preload-data="off"
> login </a>
{JSON.stringify({ data })}
