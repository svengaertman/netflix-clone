<template>
	<section class="section--overview">
		<SliderSection
			:data="store.getPopularShows"
			name="Popular"
			:highlighted="true"
		></SliderSection>
		<template v-for="(genre, index) in store.getGenres" :key="index">
			<SliderSection
				:data="store.getShowsByGenre(genre)"
				:name="genre"
				v-if="store.getShowsByGenre(genre) !== null"
			></SliderSection>
		</template>
		<div class="back-to-top">
			<button @click="backToTop" ref="backToTopButton" class="button">
				&uarr;
			</button>
		</div>
	</section>
</template>
<script>
import SliderSection from "@/components/SliderSection.vue";
import { useShowsStore } from "@/stores/shows.js";

export default {
	components: { SliderSection },

	setup() {
		const store = useShowsStore();
		store.init();
		return { store };
	},

	methods: {
		backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
	},

	mounted() {
		document.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				if (!this.$refs.backToTopButton.classList.contains("visible")) {
					this.$refs.backToTopButton.classList.add("visible");
				}
			} else {
				if (this.$refs.backToTopButton.classList.contains("visible")) {
					this.$refs.backToTopButton.classList.remove("visible");
				}
			}
		});
	},
};
</script>

<style scoped lang="scss">
.back-to-top {
	position: fixed;
	bottom: calc(var(--container-gap) * 2);
	right: calc(var(--container-gap) * 2);
	width: 4em;
	height: 4em;

	.button {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		background-color: var(--color-text-link);
		transition: background-color 0.1s ease-in-out, opacity 0.2s ease-in-out;

		&:hover {
			background-color: var(--color-text-link-darker);
		}

		&:not(.visible) {
			opacity: 0;
			pointer-events: none;
		}
	}
}
</style>
