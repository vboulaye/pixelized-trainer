<template>
	<div>

		<PixelizedCheckForm :artists="wishedRelease.artists" @retry="retry"></PixelizedCheckForm>

		<PixelizedImage :image-url="wishedRelease.cover_image"></PixelizedImage>
		{{ wishedRelease }}
	</div>


</template>

<script setup lang="ts">

const { data: identity } = await useDiscogsIdentity();

function cleanupRelease(release) {
	const { id, master_id, cover_image, title, year, artists } = release.basic_information;
	return {
		id, master_id, cover_image, title, year,
		artists: artists.map(({ name, id }) => ({ name, id }))
	};
}

function retry() {

}

const wishedRelease = computedAsync(
	async () => {
		if (!identity || !identity.value || !identity.value.username) {
			return [];
		}
		const perPage = 1;
		const folderId = 0;
		const { data: discogsUserCollection } = await useDiscogsUserCollection({
			username: identity.value.username,
			folderId: folderId,
			page: 0,
			perPage: perPage
		});


		const wishedItem = randomize(discogsUserCollection.value.pagination.items);
		const wishedPage = Math.trunc(wishedItem / perPage);
		const wishedItemInPage = wishedItem % perPage;

		console.log({ wishedItem, wishedPage, wishedItemInPage });

		const { data: discogsUserCollectionRandom } = await useDiscogsUserCollection({
			username: identity.value.username,
			folderId: folderId,
			page: wishedPage,
			perPage: perPage
		});

		// console.log({ result });

		const release = discogsUserCollectionRandom.value.releases[wishedItemInPage];
		console.log({ release });
		const wishedRelease = cleanupRelease(release);
		return wishedRelease;

	},
	{} // initial state
);


</script>