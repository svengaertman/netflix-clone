<template>
	<section class="single-view container" v-if="item" ref="item">
		<div class="back-link">
			<router-link to="/">&larr; Back to overview</router-link>
		</div>
		<div class="hero row">
			<div class="col-lg-6 image-col">
				<div
					class="image-wrapper"
					v-if="item.image !== null && Object.keys(item.image).length > 0"
				>
					<img :src="item.image.original" :alt="'Poster of ' + item.name" />
				</div>
			</div>
			<div class="col-lg-6 info-col">
				<div class="information">
					<h1>{{ item.name }}</h1>
					<p>
						⭐
						<span v-if="item.rating.average">{{ item.rating.average }}</span>
						<span v-else>Rating unknown</span>
					</p>
					<p class="genres">
						<span v-for="(genre, index) in item.genres" :key="index">{{
							genre
						}}</span>
					</p>
					<span v-html="item.summary"></span>
				</div>
				<h3 class="heading">Episodes</h3>
				<div class="episodes">
					<div class="episodes-list">
						<EpisodeCard
							v-for="(episode, index) in episodes"
							:key="index"
							:episode="episode"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="back-to-top">
			<button @click="backToTop" ref="backToTopButton" class="button">
				&uarr;
			</button>
		</div>
	</section>
</template>

<script>
import axios from "axios";
import { useShowsStore } from "@/stores/shows.js";
import gsap from "gsap";
import EpisodeCard from "../components/cards/EpisodeCard.vue";

export default {
	components: { EpisodeCard },

	setup() {
		const store = useShowsStore();
		return { store };
	},

	data() {
		return {
			item: null,
			episodes: null,
		};
	},

	methods: {
		fetchSingleShow(payload) {
			gsap.set(this.$refs.item, { opacity: 0 });
			axios
				.get(
					`https://api.tvmaze.com/search/shows?q=${payload.replace("-", " ")}`
				)
				.then((response) => {
					this.item = response.data[0].show;
					this.fetchEpisodesOfShow(this.item.id);

					setTimeout(() => {
						gsap.fromTo(
							this.$refs.item,
							{ opacity: 0 },
							{ opacity: 1, duration: 1 }
						);
					}, 250);
				});
		},

		fetchEpisodesOfShow(id) {
			axios
				.get(`https://api.tvmaze.com/shows/${id}/episodes`)
				.then((response) => {
					this.episodes = response.data;
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

		backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
	},

	mounted() {
		this.fetchSingleShow(this.$route.params.id);
	},

	watch: {
		$route(to) {
			if (to.name === "home") {
				return;
			}
			this.fetchSingleShow(this.$route.params.id);
		},
	},
};
</script>

<style scoped lang="scss">
.single-view {
	opacity: 0;
}
.hero {
	height: calc(100vh - var(--height-navbar) - 100px);

	h1 {
		color: var(--color-heading);
	}
}

.image-col {
	.image-wrapper {
		width: 100%;
		height: calc(100vh - 170px);
	}

	@media screen and (max-width: 768px) {
		padding: 0;
	}
}

.image-wrapper {
	overflow: hidden;
	position: relative;

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: top left;
	}
}

.genres {
	span {
		+ span {
			margin-left: 5px;
		}

		&:not(:last-child) {
			&::after {
				content: ",";
			}
		}
	}
}

.back-link {
	margin-bottom: var(--container-gap);

	svg {
		fill: rgb(0, 189, 126);
	}
}

.info-col {
	display: flex;
	flex-direction: column;

	.heading {
		margin: var(--container-gap) 0;
		color: var(--color-heading);
	}

	.episodes {
		flex-grow: 1;
		overflow-y: auto;

		/* width */
		&::-webkit-scrollbar {
			width: 12px;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
		}

		/* Track */
		&::-webkit-scrollbar-track {
			background-color: rgba(72, 72, 72, 0.5);
			border-radius: 10px;
			margin: 0 calc(var(--bs-gutter-x) * 0.5);
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background-color: rgba(122, 122, 122, 0.5);
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background-color: rgb(122, 122, 122);
		}
		.episodes-list {
			@media screen and (min-width: 992px) {
				position: absolute;
			}
		}
	}
}

.back-to-top {
	position: fixed;
	bottom: calc(var(--container-gap) * 1);
	right: calc(var(--container-gap) * 1);
	width: 3em;
	height: 3em;

	.button {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		background-color: var(--color-text-link);
		transition: background-color 0.1s ease-in-out, opacity 0.2s ease-in-out;

		&:hover {
			background-color: var(--color-text-link-darker);
		}
	}

	@media screen and (min-width: 992px) {
		display: none;
	}
}
</style>
