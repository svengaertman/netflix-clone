/* eslint-disable prettier/prettier */
<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<header>
		<img
			alt="Vue logo"
			class="logo"
			src="@/assets/logo.svg"
			width="125"
			height="125"
		/>

		<div class="wrapper">
			<nav>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
			</nav>
		</div>
	</header>

	<RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
	max-width: 1600px;
	margin: 0 auto;
	padding: 2rem;

	font-weight: normal;
}

header {
	width: 100vw;
	min-height: 70px;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
}

.logo {
	height: 30px;
	width: 30px;
}

a,
.green {
	text-decoration: none;
	color: hsla(160, 100%, 37%, 1);
	transition: 0.4s;
}

@media (hover: hover) {
	a:hover {
		background-color: hsla(160, 100%, 37%, 0.2);
	}
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

@media (min-width: 1024px) {
	body {
		display: flex;
		place-items: center;
	}

	#app {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0 2rem;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	nav {
		text-align: left;
		margin-left: -1rem;
		font-size: 1rem;

		padding: 1rem 0;
		margin-top: 1rem;
	}
}
</style>
