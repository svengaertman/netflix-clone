<template>
	<section class="section--genre container">
		<div class="back-link">
			<router-link :to="{ name: 'home' }">&larr; Back to overview</router-link>
		</div>
		<h1 class="title">{{ $route.params.id }}</h1>
		<div class="row grid">
			<div
				class="col-xl-2 col-3 item"
				v-for="(item, index) in store.getShowsByGenre($route.params.id)"
				:key="index"
			>
				<ShowCard :item="item"></ShowCard>
			</div>
		</div>
	</section>
</template>
<script>
import { useShowsStore } from "@/stores/shows.js";
import ShowCard from "@/components/cards/ShowCard.vue";

export default {
	components: { ShowCard },
	setup() {
		const store = useShowsStore();
		return { store };
	},
};
</script>
<style scoped lang="scss">
.section--genre {
	.back-link {
		margin-bottom: var(--container-gap);

		svg {
			fill: rgb(0, 189, 126);
		}
	}
	.title {
		text-transform: capitalize;
		color: var(--color-heading);
		margin-bottom: var(--container-gap);
	}

	.grid {
		--bs-gutter-x: 0.5rem;

		.item {
			margin-bottom: var(--bs-gutter-x);
		}

		@media screen and (min-width: 992px) {
			--bs-gutter-x: var(--container-gap);

			.item {
				margin-bottom: 0;
			}
		}
	}
}
</style>
