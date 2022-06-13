<template>
	<div>
		<SliderSection :data="store.getPopularShows" name="Popular"></SliderSection>
		<template v-for="(genre, index) in store.getGenres" :key="index">
			<SliderSection
				:data="store.getShowsByGenre(genre).slice(0, 20)"
				:name="genre"
			></SliderSection>
		</template>
	</div>
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
