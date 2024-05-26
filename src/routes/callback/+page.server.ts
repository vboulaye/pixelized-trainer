import { DiscogsClient, type RequestTokenResponse } from '$lib/discogs';

export async function load({ url, cookies, fetch }) {

	const requestToken: RequestTokenResponse = JSON.parse(cookies.get('requestToken') ?? '');
	const accessToken = await new Promise(function(resolve, reject) {
		const oAuth = new DiscogsClient(requestToken).oauth();
		const oauthVerifier = url.searchParams.get('oauth_verifier');
		oAuth.getAccessToken(
			oauthVerifier // Verification code sent back by Discogs
			, function(err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});
	return { accessToken };

}

