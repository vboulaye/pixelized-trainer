<template>
	<div class="body">
		<header>
			<nav>
				<a v-if="identity.username" href="/">Welcome {{identity.username}}</a>
<!--				<a v-if="identity.data" href="/" >Welcome {{ identity.data }}-->
<!--				</a>-->
<!--				<span v-else-if="identity.pending">Loading...</span>-->
				<a  href="/auth/login" >login to discogs</a>
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

