<template>
	<section
		class="slider-wrapper"
		:class="{ highlighted: highlighted }"
		ref="sliderWrapper"
	>
		<div class="container">
			<h1 v-if="highlighted">{{ name }}</h1>
			<h2 v-else>{{ name }}</h2>
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
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
	components: { ShowCard },

	props: ["data", "name", "highlighted"],

	data() {
		return {
			slider: null,
		};
	},

	methods: {
		reveal(element) {
			gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
		},
	},

	mounted() {
		gsap.set(this.$refs.sliderWrapper, { opacity: 0 });
		ScrollTrigger.create({
			trigger: this.$refs.sliderWrapper,
			start: "top bottom-=50px",
			onEnter: (self) => this.reveal(self.trigger),
		});
	},

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
			height: 0px;
		}

		&::-webkit-scrollbar-thumb:horizontal {
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

		@media screen and (min-width: 768px) {
			--bs-gutter-x: 1rem;
			overflow-x: auto;

			&::-webkit-scrollbar {
				height: 8px;
			}
		}
	}

	&.highlighted {
		padding-bottom: var(--container-gap);

		h1 {
			color: var(--color-heading);
		}

		@media screen and (min-width: 768px) {
			padding-top: calc(var(--container-gap) * 2);
			padding-bottom: calc(var(--container-gap) * 3);
		}
	}
}
</style>
