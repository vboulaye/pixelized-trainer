import { env } from '$env/dynamic/private';
import { DiscogsClient } from '$lib/discogs';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch, url }) {
	const oAuth = new DiscogsClient().oauth();
	const callbackUrl = url.toString().replace("/login", '/callback');
	const requestToken = await new Promise(function(resolve, reject) {
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

	console.log({ requestToken });
	cookies.set('requestToken', JSON.stringify(requestToken), { path: '/' });
	redirect(302, requestToken.authorizeUrl);
	// redirect(302, env.PRIVATE_DISCOGS_URL + `/oauth/authorize?oauth_token=${oauth_token}&oauth_callback=${env.ORIGIN}/callback`);
	// return {requestToken: (requestToken)};
}
