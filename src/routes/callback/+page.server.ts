import { DiscogsClient } from '$lib/discogs';


export async function load({ url, cookies, fetch }) {

	const requestToken = JSON.parse(cookies.get('requestToken'));
	cookies.delete('requestToken', { path: '/',});

	console.log({ requestToken });
	const oAuth = new DiscogsClient(requestToken).oauth();
	const accessToken = await new Promise(function(resolve, reject) {
		oAuth.getAccessToken(
			url.searchParams.get('oauth_verifier') // Verification code sent back by Discogs
			, function(err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});
	// console.log({ accessToken });
	// cookies.set('accessToken', JSON.stringify(accessToken), { path: '/', httpOnly: true });
	return { accessToken };

}

