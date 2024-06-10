<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
	error: Object as () => NuxtError
});

const productionMode = process.env.NODE_ENV === 'production';

</script>

<template>
	<div>
		<h1>{{ error.statusCode }}</h1>
		<p>{{error.message}}</p>
		<span v-if="!productionMode" v-html="error.stack" />
		<NuxtLink to="/">Go back home</NuxtLink>
	</div>
</template>

