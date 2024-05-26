<script lang="ts">

	import { page } from '$app/stores';

	let data = $page.data;
</script>

{JSON.stringify({data})}


<a href="{data.requestToken.authorizeUrl}" data-sveltekit-preload-data="off">auth  {data.requestToken.authorizeUrl} </a>