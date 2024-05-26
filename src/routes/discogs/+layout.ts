import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ parent }) {
	const data = await parent();
	if (!data.accessToken) {
		error(400, 'login is required to access this page');
	}

}
