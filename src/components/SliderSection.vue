<template>
	<section class="slider-wrapper" :class="{ highlighted: highlighted }">
		<div class="container">
			<h1>{{ name }}</h1>
			<div class="slider row" ref="slider">
				<div
					class="slide"
					:class="
						highlighted === true ? 'col-xl-3 col-lg-4 col-6' : 'col-xl-2 col-3'
					"
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
	margin-bottom: calc(var(--container-gap) * 2);

	h1 {
		margin-bottom: 1rem;
	}

	.slider {
		--bs-gutter-x: 0.5rem;
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;

		.slide {
			aspect-ratio: 1 / 1;
		}

		/* width */
		&::-webkit-scrollbar {
			height: 8px;
		}

		&::-webkit-scrollbar-thumb:horizontal {
			border-radius: 10px;
		}

		/* Track */
		&::-webkit-scrollbar-track {
			background-color: #7a7a7a;
			border-radius: 10px;
			margin: 0 var(--bs-gutter-x);
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: rgb(72, 72, 72);
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: rgb(56, 56, 56);
		}

		@media screen and (min-width: 768px) {
			--bs-gutter-x: 1rem;
		}
	}

	&.highlighted {
		padding-top: calc(var(--container-gap) * 2);
		padding-bottom: calc(var(--container-gap) * 3);

		h1 {
			color: var(--color-heading);
		}
	}
}
</style>
