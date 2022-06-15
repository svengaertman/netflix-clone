<script setup>
import NavBar from "./components/navigation/NavBar.vue";
import BackToTopButton from "./components/BackToTopButton.vue";
</script>

<template>
	<NavBar />
	<main>
		<RouterView />
		<BackToTopButton />
	</main>
</template>

<style>
@import "@/assets/styles/base.scss";
</style>
