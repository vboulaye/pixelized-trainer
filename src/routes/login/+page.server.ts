import { env } from '$env/dynamic/private';
import { DiscogsClient, type RequestTokenResponse } from '$lib/discogs';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url }) {
	const savedRequestToken: RequestTokenResponse = JSON.parse(cookies.get('requestToken') ?? '');
	if (savedRequestToken) {
		console.log('reusing saved request token');
		redirect(302, savedRequestToken.authorizeUrl);
	}

	const requestToken: RequestTokenResponse = await new Promise(function(resolve, reject) {
		const oAuth = new DiscogsClient().oauth();
		const callbackUrl = url.toString().replace('/login', '/callback');
		oAuth.getRequestToken(
			env.PRIVATE_DISCOGS_APP_CONSUMER_KEY,
			env.PRIVATE_DISCOGS_APP_SIGNATURE,
			callbackUrl,
			function(err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});
	// kept until callback is called (back)
	cookies.set('requestToken', JSON.stringify(requestToken), { path: '/' });
	redirect(302, requestToken.authorizeUrl);
}
