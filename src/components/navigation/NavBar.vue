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
				<RouterLink to="/">Search</RouterLink>
			</nav>
		</div>
	</header>
</template>

<style scoped>
header {
	width: 100vw;
	min-height: var(--height-navbar);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 var(--container-gap);
	background: linear-gradient(
		0deg,
		rgba(24, 24, 24, 0) 0%,
		rgba(24, 24, 24, 0.2) 10%,
		rgba(24, 24, 24, 1) 80%
	);
	z-index: 99;
}

.logo {
	height: 30px;
	width: 30px;
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
</style>
