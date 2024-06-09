<template>
	<div class="body">
		<header>
			<nav>
				<a v-if="identity" href="/">Welcome {{identity.username}}</a>
<!--				<a v-if="identity.data" href="/" >Welcome {{ identity.data }}-->
<!--				</a>-->
<!--				<span v-else-if="identity.pending">Loading...</span>-->
<!--				<a v-else href="/login" >login to discogs</a>-->
			</nav>
		</header>

<!--	 	{{identity.data.id}}-->

		<main>
			<slot></slot>
		</main>
	</div>
</template>

<script setup lang="ts">


const {data:identity} = await useDiscogsIdentity();

// watch(identity.data, (newData) => {console.log({ newData }); return newData})

</script>

