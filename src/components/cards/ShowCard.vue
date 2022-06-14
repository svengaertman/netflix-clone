<template>
	<div
		class="card card--show"
		@click.stop.prevent="this.$router.push(`/${slugifyText(item.name)}`)"
		v-if="item"
	>
		<div class="image-wrapper">
			<img :src="item.image.medium" alt="" />
		</div>
		<p class="text">
			{{ item.name }} <br />
			<span class="rating">⭐ {{ item.rating.average }}</span>
		</p>
	</div>
</template>
<script>
export default {
	props: ["item"],

	methods: {
		slugifyText(input) {
			return input.toLowerCase().replace(" ", "-");
		},
	},
};
</script>
<style scoped lang="scss">
.card {
	width: 100%;
	aspect-ratio: 1 / 1;
	margin-bottom: var(--container-gap);
	position: relative;
	background-color: transparent;
	overflow: hidden;

	.text {
		position: absolute;
		bottom: calc(var(--container-gap) / 2);
		left: calc(var(--container-gap) / 2);
		z-index: 2;
		color: white;
		margin-bottom: 0;

		.rating {
			font-size: 0.9em;
		}
	}

	.image-wrapper {
		width: 100%;
		aspect-ratio: 1 / 1;
		position: relative;

		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.2s ease-in-out;
		}

		&::after {
			content: "";
			width: 100%;
			height: 25%;
			position: absolute;
			bottom: 0;
			left: 0;
			background: linear-gradient(
				0deg,
				rgba(24, 24, 24, 1) 50%,
				rgba(24, 24, 24, 0) 100%
			);
			opacity: 0.7;
			z-index: 1;
		}
	}

	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.1);
		}
	}
}
</style>
