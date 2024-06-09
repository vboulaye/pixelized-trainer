export default defineEventHandler(async (event) => {

	const requestTokenCookie = getCookie(event, 'requestToken') ?? '';
	const requestToken: RequestTokenResponse = JSON.parse(requestTokenCookie);

	const query = getQuery(event);
	const oauthVerifier = query.oauth_verifier;
	console.log({ oauthVerifier, requestToken });
	const accessToken = await new Promise(function(resolve, reject) {
		const oAuth = new DiscogsClient(requestToken).oauth();
		oAuth.getAccessToken(
			oauthVerifier // Verification code sent back by Discogs
			, function(err: Error, data: RequestTokenResponse) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});

	deleteCookie(event, 'requestToken');

	const secureCookie = process.env.NODE_ENV === 'production';
	console.log(secureCookie);
	setCookie(event, 'accessToken', JSON.stringify(accessToken), {
		httpOnly: false,
		secure: secureCookie
	});

	const url = getRequestURL(event);
	// construct the redirect url relative going 2 folders up

	return await sendRedirect(event, url.pathname + '/../../', 302);
});