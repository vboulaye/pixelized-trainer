
export const useDiscogsIdentity = async () => await useAsyncData<DiscogsIdentity>('discogs-identity',
	async () => {

	const accessToken = getAccessToken();
	if (accessToken) {
		return await callDiscogs<DiscogsIdentity>({ path: '/oauth/identity' });
	}
	return { username: 'unknown', id: '-1' };
},
	{

	});