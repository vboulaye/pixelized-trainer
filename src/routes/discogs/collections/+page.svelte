<script lang="ts">

	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { randomize } from '$lib';

	let guessedArtist = '';
	let frame;

	function cleanupName(name) {

		return name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(/[^a-z0-9]+/g, ' ');
	}

	function check(e) {

		const matchedArtist = $page.data.wishedRelease.artists.find(({ name }) => cleanupName(name) === cleanupName(guessedArtist));

		if (matchedArtist) {
			alert('Correct!');
			guessedArtist = '';
			fillBlack();
			invalidate('app:random');
		} else {
			alert('Try again!' + JSON.stringify($page.data.wishedRelease.artists));
		}
	}

	function retry() {
		fillBlack();
		invalidate('app:random');
	}


	let canvas: HTMLCanvasElement;
	onMount(() => {

		return () => {
			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	});

	function paint(context, t) {
		const { width, height } = context.canvas;
		const imageData = context.getImageData(0, 0, width, height);
		//context.drawImage(image, 0, 0);
		for (let i = 0; i < 10; i++) {
			const blockSize = 10;
			const posToClear = randomize(imageData.data.length / (4 * blockSize));
			const x = blockSize * posToClear % width;
			const y = (blockSize * posToClear / width) >>> 0;
			for (let j = x; j < x + blockSize; j++) {
				for (let k = y; k < y + blockSize; k++) {
					imageData.data[(k * width + j) * 4 + 3] = 0;
				}
			}
			// imageData.data[posToClear * 4 + 3] = 0;
		}

		// for (let p = 0; p < imageData.data.length; p += 4) {
		// 	const i = p / 4;
		// 	// const x = i % width;
		// 	// const y = (i / width) >>> 0;
		// 	//
		// 	// const red = 64 + (128 * x) / width + 64 * Math.sin(t / 1000);
		// 	// const green = 64 + (128 * y) / height + 64 * Math.cos(t / 1000);
		// 	// const blue = 128;
		// 	// imageData.data[p + 0] = 0;
		// 	// imageData.data[p + 1] = 0
		// 	// imageData.data[p + 2] = 0;
		// 	imageData.data[p + 3] = randomize(2)==0 ?0:255;
		// 	// console.log(imageData.data[p + 3])
		// }
		// console.log(imageData.data[3])
		context.putImageData(imageData, 0, 0);
	}

	function fillBlack() {
		if (frame) {
			cancelAnimationFrame(frame);
		}
		stopTimer();
		const context = canvas.getContext('2d');
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
		return context;
	}

	function resetTimer() {
		last_time = window.performance.now();
		elapsed = 0;
	}
	function stopTimer() {
		last_time = 0;
		elapsed = 0;
	}

	function refreshImage() {

		const context = fillBlack();
		resetTimer();

		frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);
			paint(context, t);
		});

	}


	let last_time = 0;
	let elapsed = 0;
	let frameTimer;

	(function update() {
		frameTimer = requestAnimationFrame(update);
		if (last_time > 0) {
			const time = window.performance.now();
			elapsed += time - last_time;
			last_time = time;
		}
	})();

	onDestroy(() => {
		cancelAnimationFrame(frameTimer);
		// cancelAnimationFrame(frame);
	});

</script>

<form on:submit={e=>check(e)}>
	<input type="text" name="artist" bind:value={guessedArtist} placeholder="guess the artist name" autofocus>
	<button type="submit">check</button>
	<button type="reset" on:click={async ()=>retry()}>retry</button>
	<h2>{(elapsed / 1000).toFixed(2)}s</h2>
</form>

<div style="position: static">
	<div style="position: relative;" class="cover-box">

		<img on:load={()=>refreshImage()} src={$page.data.wishedRelease.cover_image} class="cover">
		<canvas bind:this={canvas}
						width={600}
						height={600}
						class="cover"

		></canvas>
	</div>
</div>

<pre>
	{JSON.stringify($page.data, null, 2)}
</pre>

<style>

    .cover-box {
        width: 600px;
        height: 600px;
    }

    .cover {
        width: 600px;
        height: 600px;
        border: #2b2b2b 2px solid;
        position: absolute;
        top: 0;
        left: 0;
    }

</style>