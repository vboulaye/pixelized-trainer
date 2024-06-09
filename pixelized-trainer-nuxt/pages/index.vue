<template>
	<div>

		hello {{ accessToken }}

		<div v-if="!accessToken">
			<a href="/auth/login">Login</a>
		</div>

		<div v-else>
			identity: {{ identity.data }}
		</div>

	</div>


</template>

<script setup lang="ts">

const accessToken = getAccessToken();

const identity = await useAsyncData("identity", async () => {
	if (accessToken) {
		return await callDiscogs({ path: '/oauth/identity', fetch });
	}
	return null;
});

</script>