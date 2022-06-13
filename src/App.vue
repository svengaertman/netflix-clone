/* eslint-disable prettier/prettier */
<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/navigation/NavBar.vue";
</script>

<template>
	<NavBar></NavBar>
	<main>
		<RouterView />
	</main>
</template>

<style>
@import "@/assets/base.css";

#app {
	max-width: 1600px;
	margin: 0 auto;
	font-weight: normal;
}

a,
.green {
	text-decoration: none;
	color: hsla(160, 100%, 37%, 1);
	transition: 0.4s;
}

main {
	margin-top: var(--height-navbar);
	padding-top: var(--container-gap);
}

@media (hover: hover) {
	a:hover {
		background-color: hsla(160, 100%, 37%, 0.2);
	}
}

.tns-visually-hidden {
	display: none;
}
</style>
