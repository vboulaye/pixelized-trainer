<script lang="ts">

	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let data = $page.data;

	if (browser) {
		// we keep the token in localStorage for now
		localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
		goto('/');
	}

</script>

<span>
	<a href="/" data-sveltekit-preload-data="off">continue</a>
</span>