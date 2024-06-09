<template>
	<div style="position: static">
		<div style="position: relative;" class="cover-box">
			<img v-on:load="refreshImage" :src="imageUrl" class="cover">
			<canvas :ref="(el) => canvas = el"
							width=600
							height=600
							class="cover"
			></canvas>
		</div>
	</div>
</template>


<script setup lang="ts">

defineProps({
	imageUrl: String
});

const emit = defineEmits(['refreshImage'])

const timer = useTimer();

let canvas: HTMLCanvasElement;
let frame: any = undefined;

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

	context.putImageData(imageData, 0, 0);
}

function fillBlack() {
	if (frame) {
		cancelAnimationFrame(frame);
	}
  timer.stopTimer();
	const context = canvas.getContext('2d');
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
	return context;
}

function refreshImage() {

	const context = fillBlack();
	emit('refreshImage')
	timer.startTimer();
	frame = requestAnimationFrame(function loop(t) {
		frame = requestAnimationFrame(loop);
		paint(context, t);
	});

}


onMounted(() => {

	return () => {
		if (frame) {
			cancelAnimationFrame(frame);
		}
	};
});

onUnmounted(() => {

	cancelAnimationFrame(frame);
});


</script>


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