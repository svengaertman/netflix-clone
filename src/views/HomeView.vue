<template>
	<div>
		<SliderSection :data="store.getPopularShows" name="Popular"></SliderSection>
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
