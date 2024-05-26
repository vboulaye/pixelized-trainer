import { callDiscogs, getAccessToken } from '../lib/discogs';
import { browser } from '$app/environment';

export const ssr = false;

export async function load({ fetch }) {

	if (browser) {
		const accessToken = getAccessToken();
		let identity = null;
		if (accessToken) {
			identity = await callDiscogs({ path: '/oauth/identity',fetch });
		}

		return {
			accessToken,
			identity
		};
	}
	else {
		return {
			accessToken: null,
			identity: null
		};
	}

}
