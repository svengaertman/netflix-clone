<template>
	<header>
		<div class="container">
			<RouterLink to="/"
				><img
					alt="Vue logo"
					class="logo"
					src="https://static.tvmaze.com/images/tvm-header-logo.png"
					width="253"
					height="80"
			/></RouterLink>

			<div class="wrapper">
				<nav>
					<RouterLink to="/">Home</RouterLink>
					<input
						type="text"
						placeholder="Search for show..."
						@keyup.enter="search"
						v-model="searchInput"
					/>
				</nav>
			</div>
		</div>
	</header>
</template>

<script>
import axios from "axios";
import { useShowsStore } from "@/stores/shows.js";

export default {
	setup() {
		const store = useShowsStore();
		return { store };
	},

	data() {
		return {
			searchInput: null,
		};
	},

	methods: {
		search() {
			this.fetchSingleShow(this.searchInput);
		},

		slugifyText(input) {
			return input.toLowerCase().replace(" ", "-");
		},

		fetchSingleShow(payload) {
			axios
				.get(
					`https://api.tvmaze.com/search/shows?q=${payload.replace("-", " ")}`
				)
				.then((response) => {
					const item = response.data[0].show;
					this.$router.push(`/${this.slugifyText(item.name)}`);
				});
		},
	},
};
</script>

<style scoped lang="scss">
header {
	width: 100vw;
	min-height: var(--height-navbar);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	background: linear-gradient(
		0deg,
		rgba(24, 24, 24, 0) 0%,
		rgba(24, 24, 24, 0.2) 10%,
		rgba(24, 24, 24, 1) 80%
	);
	z-index: 99;

	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}

.logo {
	max-height: calc(var(--height-navbar) / 2);
	width: auto;
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
