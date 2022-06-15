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
					<img :src="item.image.original" alt="" />
				</div>
			</div>
			<div class="col-lg-6">
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
		</div>
	</section>
</template>

<script>
import axios from "axios";
import { useShowsStore } from "@/stores/shows.js";
import gsap from "gsap";

export default {
	components: {},

	setup() {
		const store = useShowsStore();
		return { store };
	},

	data() {
		return {
			item: null,
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

					setTimeout(() => {
						gsap.fromTo(
							this.$refs.item,
							{ opacity: 0 },
							{ opacity: 1, duration: 1 }
						);
					}, 250);
				});
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
	@media screen and (max-width: 768px) {
		padding: 0;
	}
}

.image-wrapper {
	width: 100%;
	aspect-ratio: 9 / 14;
	overflow: hidden;

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
</style>
