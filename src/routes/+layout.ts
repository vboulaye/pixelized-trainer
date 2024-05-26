import { callDiscogs, getAccessToken } from '../lib/discogs';
import { browser } from '$app/environment';

export const ssr = false;

export async function load({ url }) {

	if (browser) {
		const accessToken = getAccessToken();
		let identity = null;
		if (accessToken) {
			identity = await callDiscogs({ path: '/oauth/identity' });
		}

		return {
			accessToken,
			identity
		};
	}

}
