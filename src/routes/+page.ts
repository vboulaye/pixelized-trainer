import { getContext, setContext } from 'svelte';

export async function load({ url }) {

	const token = url.searchParams.get('token');

	return {
		token
	};
}