<script lang="ts">

	import { page } from '$app/stores';
	import { DiscogsClient, DiscogsTokens } from '$lib/discogs';
	import { onMount } from 'svelte';

	import { PUBLIC_DISCOGS_URL } from '$env/static/public';

	let data = $page.data;

	DiscogsTokens.access;
	let identity;
	let accessToken

	onMount(async () => {
		  accessToken = JSON.parse(localStorage.getItem('accessToken') ||"");

		if (accessToken) {
			console.log('accessToken', JSON.stringify(accessToken));
			const dis = new DiscogsClient(JSON.parse(JSON.stringify(accessToken)));
			const url = PUBLIC_DISCOGS_URL + '/oauth/identity';
			identity = await fetch(url, {
				headers: {
					Authorization: dis.oauth().toHeader('GET', url)
				}
			}).then(res => res.json());

			console.log({ identity });
		}
	});
</script>

<a href="/login" data-sveltekit-preload-data="off"
> login </a>
{JSON.stringify({ data })}


identity {JSON.stringify({ identity })}
accessToken {JSON.stringify({ accessToken })}