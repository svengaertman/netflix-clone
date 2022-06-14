<script setup>
import NavBar from "./components/navigation/NavBar.vue";
</script>

<template>
	<NavBar></NavBar>
	<main>
		<RouterView />
	</main>
</template>

<style>
@import "@/assets/styles/base.scss";
</style>
