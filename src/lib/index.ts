// place files you want to import through the `$lib` alias in this folder.

export const PixelizedTrainerConfig = {
	oauth: {
		nonce: 'pixelized-trainer-' + Date.now(),
		userAgent: 'Pixelized-Trainer-App'
	}
};


export function randomize(max:number) {
	return Math.floor(Math.random() * max);
}