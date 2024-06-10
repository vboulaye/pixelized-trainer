<template>
	<div>

		<PixelizedCheckForm :artists="wishedRelease.artists||[]" @retry="retry"></PixelizedCheckForm>

		<PixelizedImage :image-url="wishedRelease.cover_image"></PixelizedImage>
		{{ wishedRelease.artists }}
	</div>


</template>

<script setup lang="ts">

import { discogsUserCollection } from '~/composables/useDiscogsUserCollection';

const { data: identity } = await useDiscogsIdentity();

function cleanupRelease(release) {
	const { id, master_id, cover_image, title, year, artists } = release.basic_information;
	return {
		id, master_id, cover_image, title, year,
		artists: artists.map(({ name, id }) => ({ name, id }))
	};
}


provide('timer', useTimer())


function retry() {
	console.log(refreshableRef);
	// refreshableRef.refresh()
	refreshableRef.value++;
}

const wishedRelease = ref({});

// function useRefreshableRef() : { value: boolean, refresh: () => void }{
// 	let _trigger: () => void;
// 	const ref = customRef((track, trigger) => {
// 		_trigger= trigger;
// 		return {
// 			get() {
// 				track();
// 				return true;
// 			},
// 			set() {
// 				trigger();
// 			}
// 		};
// 	});
// 	ref.refresh= () => {
// 		_trigger();
// 	};
// 	return ref
// }

// const refreshableRef = useRefreshableRef();
const refreshableRef = ref(0);

watchEffect(
	async () => {
		if (!identity || !identity.value || !identity.value.username) {
			return [];
		}
		refreshableRef.value;
		const perPage = 1;
		const folderId = 0;
		const collection = await discogsUserCollection({
			username: identity.value.username,
			folderId: folderId,
			page: 0,
			perPage: perPage
		});


		const wishedItem = randomize(collection.pagination.items);
		const wishedPage = Math.trunc(wishedItem / perPage);
		const wishedItemInPage = wishedItem % perPage;

		console.log({ wishedItem, wishedPage, wishedItemInPage });

		const collectionRandom = await discogsUserCollection({
			username: identity.value.username,
			folderId: folderId,
			page: wishedPage,
			perPage: perPage
		});

		// console.log({ result });

		const release = collectionRandom.releases[wishedItemInPage];
		console.log({ release });
		wishedRelease.value = cleanupRelease(release);

	}
);


</script>