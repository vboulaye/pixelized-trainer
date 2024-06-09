<template>
	<form @submit="check">
		<input type="text" name="artist" :value="guessedArtist" placeholder="guess the artist name" autofocus>
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

let guessedArtist = '';

function cleanupName(name:string) {
	return name.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replaceAll(/[^a-z0-9]+/g, ' ');
}

function check(e) {

	const matchedArtist = props.artists.find(({ name }) => cleanupName(name) === cleanupName(guessedArtist));

	if (matchedArtist) {
		alert('Correct!');
		guessedArtist = '';
		timer.stopTimer()
		retry();
	} else {
		alert('Try again!' + JSON.stringify(props.artists));
	}
}

function retry() {
	// fillBlack();
	// invalidate('app:random');
	emit('retry');
}


const timer = useTimer();

onMounted(() => {
	timer.startTimer();
});

onUnmounted(() => {
	timer.stopTimer();
});

</script>