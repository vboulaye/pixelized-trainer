<script lang="ts">

	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let data = $page.data;

	if (browser) {
		localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
		goto('/');
	}

</script>

<span>
	{JSON.stringify({ data })}
	<a href="/" data-sveltekit-preload-data="off">home</a>
</span>