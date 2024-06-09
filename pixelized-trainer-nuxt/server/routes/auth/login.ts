export default defineEventHandler(async (event) => {

	const query = getQuery(event);

	if (!query.reset) {
		const savedRequestToken = getCookie(event, 'requestToken') ?? '';
		if (savedRequestToken) {
			console.log('reusing saved request token ' + savedRequestToken);
			const requestToken = JSON.parse(savedRequestToken);
			return await sendRedirect(event, requestToken.authorizeUrl, 302);
		}
	}

	const url = getRequestURL(event).toString();
	const requestToken: RequestTokenResponse = await new Promise(function(resolve, reject) {
		const oAuth = new DiscogsClient().oauth();
		const callbackUrl = url.replace('/login', '/callback');
		oAuth.getRequestToken(
			process.env.PRIVATE_DISCOGS_APP_CONSUMER_KEY,
			process.env.PRIVATE_DISCOGS_APP_SIGNATURE,
			callbackUrl,
			(err: Error, data: RequestTokenResponse) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});

	//save the request token in a server cookie
	setCookie(event, 'requestToken', JSON.stringify(requestToken), {
		httpOnly: true,
		secure: true
	});

	console.log('redirecting to ' + requestToken.authorizeUrl);

	return await sendRedirect(event, requestToken.authorizeUrl, 302);
});