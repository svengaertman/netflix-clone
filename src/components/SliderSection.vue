<template>
	<section class="slider-wrapper">
		<div class="container">
			<h1>{{ name }}</h1>
			<div class="slider row" ref="slider">
				<div
					class="slide"
					:class="highlighted === true ? 'col-3' : 'col-2'"
					v-for="(item, index) in data"
					:key="index"
				>
					<ShowCard :item="item"></ShowCard>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import ShowCard from "@/components/cards/ShowCard.vue";

export default {
	components: { ShowCard },

	props: ["data", "name", "highlighted"],

	data() {
		return {
			slider: null,
		};
	},

	methods: {},

	mounted() {},

	updated() {},
};
</script>

<style scoped lang="scss">
.slider-wrapper {
	width: 100%;
	overflow: hidden;
	margin-bottom: var(--container-gap);
}

.slider {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;

	/* width */
	&::-webkit-scrollbar {
		height: 8px;
	}

	&::-webkit-scrollbar-thumb:horizontal {
		border-radius: 10px;
	}

	/* Track */
	&::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
		margin: 0 15px;
	}

	/* Handle */
	&::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	&::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
}

.slide {
	aspect-ratio: 1 / 1;
}
</style>
