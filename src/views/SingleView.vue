<template>
	<section class="single-view" v-if="item">
		<div class="container">
			<div class="hero row">
				<div class="col-6">
					<div class="image-wrapper">
						<img :src="item.image.original" alt="" />
					</div>
				</div>
				<div class="col-6">
					<h1>{{ item.name }}</h1>
					<p>⭐ {{ item.rating.average }}</p>
					<p>
						<span v-for="(genre, index) in item.genres" :key="index">{{
							genre
						}}</span>
					</p>
					<span v-html="item.summary"></span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from "axios";

export default {
	components: {},

	data() {
		return {
			item: null,
		};
	},

	methods: {
		fetchSingleShow(payload) {
			axios
				.get(
					`https://api.tvmaze.com/search/shows?q=${payload.replace("-", " ")}`
				)
				.then((response) => {
					this.item = response.data[0].show;
				});
		},
	},

	mounted() {
		this.fetchSingleShow(this.$route.params.id);
	},
};
</script>

<style scoped lang="scss">
.hero {
	height: calc(100vh - var(--height-navbar) - 100px);
}
.image-wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
