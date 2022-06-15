<template>
	<section class="section--overview">
		<SliderSection
			:data="store.getPopularShows"
			name="Popular"
			:highlighted="true"
		></SliderSection>
		<template v-for="(genre, index) in store.getGenres" :key="index">
			<SliderSection
				:data="store.getShowsByGenre(genre).slice(0, 15)"
				:name="genre"
				v-if="store.getShowsByGenre(genre) !== null"
			></SliderSection>
		</template>
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
};
</script>
