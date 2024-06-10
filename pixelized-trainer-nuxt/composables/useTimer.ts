export const useTimer = () => {
	const last_time = ref(0);
	const elapsed = ref(0);
	let frameTimer: number = 0;

	function resetTimer() {
		console.log('resetTimer')
		last_time.value = window.performance.now();
		elapsed.value = 0;
	}

	function stopTimer() {
		console.log('stopTimer')
		last_time.value = 0;
		elapsed.value = 0;
		if (frameTimer) {
			cancelAnimationFrame(frameTimer);
		}
	}

	function startTimer() {
		console.log('startTimer')
		last_time.value = window.performance.now();
		elapsed.value = 0;

		function update() {
			if (last_time.value > 0) {
				frameTimer = requestAnimationFrame(update);
				const time = window.performance.now();
				elapsed.value += time - last_time.value;
				last_time.value = time;
			} else {
				cancelAnimationFrame(frameTimer);
			}
		}

		update();
	}

	return {
		startTimer,
		stopTimer,
		resetTimer,
		last_time,
		elapsed
	};
};