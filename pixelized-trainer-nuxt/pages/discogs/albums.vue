<template>
	<div>
		<form>
			<input v-model="query" type="text" name="query" placeholder="query">
			<input v-model="artist" type="text" name="artist" placeholder="artist">
			<input v-model="title" type="text" name="title" placeholder="title">
			<div class="grid">
				<div v-for="album in albums" :key="album.id" style="">
					<div v-if="!album.big" @click="album.big=!album.big" class="cover-box"><img :src="album.thumb" :alt="album.title"></div>
					<div v-if="album.big" @click="album.big=!album.big" class="cover-box2"><img :src="album.cover_image" :alt="album.title"></div>
					<p>{{ album.title }}</p>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">


const query = defineModel<string>('query');
const artist = defineModel<string>('artist');
const title = defineModel<string>('title');

const albums = ref([]);

watchEffect(
	async () => {
		if (!query.value && !artist.value && !title.value) {
			return;
		}

		debounced();

	}
);
const debounced = debounce(async () => {
	const perPage = 27;

	let queryString = '';
	if (title.value) {
		queryString += '&title=' + title.value;
	}
	if (artist.value) {
		queryString += '&artist=' + artist.value;
	}
	if (query.value) {
		queryString += '&query=' + query.value;
	}
	const collection = await callDiscogs<[]>({ path: `/database/search?type=master&per_page=${perPage}${queryString}` });
	console.log((collection.results));
	albums.value = collection.results
		.map(({ id, title, cover_image , thumb}) => ({ id, title, cover_image,thumb }));
}, 500);


function debounce(fn: () => void, wait: number) {
	let timer;
	return function(...args) {
		if (timer) {
			clearTimeout(timer); // clear any pre-existing timer
		}
		const context = this; // get the current context
		timer = setTimeout(() => {
			fn.apply(context, args); // call the function if time expires
		}, wait);
	};
}

</script>


<style>

body {
	grid-template-columns:inherit;
}

.grid {
	display: grid;
	grid-template-areas: "a a a a a a a a a";
	grid-gap: 10px;
	grid-auto-columns: 200px;
}

.cover-box {
	display: block;
	width: 180px;
	height: 180px;
	position: relative;
	z-index:666;
}
.cover-box2 {
	display: block;
	width: 600px;
	height: 600px;
	position: relative;
	z-index:999;
}

</style>