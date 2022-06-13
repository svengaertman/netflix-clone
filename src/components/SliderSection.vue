<template>
	<section class="slider-wrapper">
		<h1>{{ name }}</h1>
		<div class="slider" ref="slider">
			<div class="slide" v-for="(item, index) in data" :key="index">
				<ShowCard :item="item"></ShowCard>
			</div>
		</div>
	</section>
</template>
<script>
import ShowCard from "@/components/cards/ShowCard.vue";
import { tns } from "tiny-slider";

export default {
	components: { ShowCard },

	props: ["data", "name"],

	data() {
		return {
			slider: null,
		};
	},

	methods: {
		initSlider() {
			let options;

			if (window.innerWidth < 1024) {
				options = {
					items: 2.2,
					gutter: 10,
					controls: false,
				};
			}

			if (window.innerWidth >= 1024) {
				options = {
					items: 6.2,
					gutter: 20,
					controls: true,
					slideBy: "page",
				};
			}

			this.slider = tns({
				container: this.$refs.slider,
				nav: false,
				loop: false,
				...options,
			});
		},
	},

	mounted() {
		this.initSlider();
	},

	updated() {
		// this.initSlider();
	},
};
</script>

<style scoped>
.slider-wrapper {
	width: 100%;
	overflow: hidden;
	padding-left: var(--container-gap);
	margin-bottom: var(--container-gap);
}

.slider {
	display: flex;
}

.slide {
	width: 40vw;
	aspect-ratio: 1 / 1;
}
</style>
