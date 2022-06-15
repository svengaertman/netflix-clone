<template>
	<header class="navbar">
		<div class="container">
			<RouterLink to="/"
				><img
					alt="Tvmaze logo"
					class="logo"
					src="https://static.tvmaze.com/images/tvm-header-logo.png"
					width="253"
					height="80"
			/></RouterLink>

			<div class="wrapper">
				<nav>
					<div class="dropdown">
						<button class="genres">Genres</button>
						<div class="dropdown-content">
							<RouterLink
								:to="{ name: 'genre', params: { id: genre } }"
								v-for="(genre, index) in store.getGenres"
								:key="index"
							>
								{{ genre }}
							</RouterLink>
						</div>
					</div>
					<input
						type="text"
						placeholder="Search for show..."
						@keyup.enter="search"
						v-model="searchInput"
						aria-label="Search input"
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
					`https://api.tvmaze.com/search/shows?q=${payload
						.toLowerCase()
						.replace("-", " ")}`
				)
				.then((response) => {
					if (response.data.length > 0) {
						const item = response.data[0].show;
						this.$router.push(`/${this.slugifyText(item.name)}`);
					} else {
						alert("No shows found");
					}
				})
				.catch((error) => {
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log("Error", error.message);
					}
					console.log(error.config);
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
		flex-wrap: nowrap;
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

	.dropdown {
		position: relative;
		display: inline-block;
		height: 100%;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: var(--color-background-soft);
		border-radius: 5px;
		width: fit-content;
		min-width: 100px;
		text-align: left;
		padding: 1rem 1rem;
		z-index: 1;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);

		a {
			display: block;
			padding: 0.1rem 0.5rem;
			white-space: nowrap;

			&.router-link-exact-active {
				color: var(--color-text);
			}

			&:first-of-type {
				border: 0;
			}
		}
	}

	.dropdown:hover .dropdown-content {
		display: block;
	}

	.genres {
		display: block;
		padding: 0.5em 2.5em;
		border-radius: 5px;
		margin-right: 10px;
		background-color: var(--color-text-link-soft);
		color: var(--color-heading);
		transition: background-color 0.1s ease-in-out;

		&:hover {
			background-color: var(--color-text-link);
		}
	}

	input {
		background-color: var(--color-background-soft);
		border: 1px solid var(--color-background-soft);
		padding: 0.5em 1em;
		color: var(--color-heading);
		border-radius: 5px;
		transition: border-color 0.1s ease-in-out;

		&:active,
		&:focus {
			outline: none;
			border: 1px solid rgba(255, 255, 255, 0.3);
		}
	}

	@media screen and (max-width: 991px) {
		.genres {
			padding: 0.5em 1em;
		}

		input {
			max-width: 60%;
		}
	}
}
</style>
