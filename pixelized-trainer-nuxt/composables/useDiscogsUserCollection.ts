export const useDiscogsUserCollection = async (input: {
	username: string,
	folderId: number,
	page: number,
	perPage: number
}) =>
	await useAsyncData(`discogs-user-${input.username}-collection${input.folderId}-page-${input.page}-${input.perPage}`, async () => {
		return await callDiscogs<DiscogsIdentity>({ path: `/users/${input.username}/collection/folders/${input.folderId}/releases?page=${input.page}&per_page=${input.perPage}` });
	});

export const discogsUserCollection = async (input: {
	username: string,
	folderId: number,
	page: number,
	perPage: number
}) => {
	return await callDiscogs<DiscogsIdentity>({ path: `/users/${input.username}/collection/folders/${input.folderId}/releases?page=${input.page}&per_page=${input.perPage}` });
}
