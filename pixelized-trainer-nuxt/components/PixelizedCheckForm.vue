<template>
	<form @submit="check">
		<input v-model="guessedArtist" type="text" name="artist" placeholder="guess the artist name" >
		<button type="submit">check</button>
		<button type="reset" @click="retry">retry</button>
		<h2>{{ (timer.elapsed.value / 1000).toFixed(2) }}s</h2>
	</form>
</template>

<script setup lang="ts">

const props = defineProps<{
	artists: { name: string }[]
}>();

const emit = defineEmits(['retry'])

let guessedArtist = defineModel<string>();

function cleanupName(name:string|undefined) {
	if (!name) {
		return '';
	}
	return name.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replaceAll(/[^a-z0-9]+/g, ' ');
}

function check(e) {

	const matchedArtist = props.artists.find(({ name }) => cleanupName(name) === cleanupName(guessedArtist.value));

	if (matchedArtist) {
		alert('Correct!');
		guessedArtist.value = '';
		retry();
	} else {
		alert('Try again!' + JSON.stringify(props.artists));
	}
}

function retry() {
	// fillBlack();
	// invalidate('app:random');
	timer.stopTimer();
	emit('retry');
}


const timer = inject('timer')

onMounted(() => {
	timer.startTimer();
});

onUnmounted(() => {
	timer.stopTimer();
});

</script>