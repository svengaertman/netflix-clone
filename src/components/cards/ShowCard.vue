<template>
	<article
		class="card card--show"
		@click.stop.prevent="this.$router.push(`/${slugifyText(item.name)}`)"
		v-if="item"
	>
		<div class="image-wrapper">
			<img :src="item.image.medium" :alt="'Poster of ' + item.name" />
		</div>
		<p class="text">
			{{ item.name }} <br />
			<span class="rating">⭐ {{ item.rating.average }}</span>
		</p>
	</article>
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
	aspect-ratio: 42 / 59;
	position: relative;
	background-color: transparent;
	overflow: hidden;
	border-radius: 5px;

	.text {
		position: absolute;
		bottom: calc(var(--container-gap) / 2);
		left: var(--container-gap);
		z-index: 2;
		color: var(--color-heading);
		margin-bottom: 0;

		.rating {
			font-size: 0.9em;
		}

		@media screen and (max-width: 768px) {
			display: none;
		}
	}

	.image-wrapper {
		width: 100%;
		height: 100%;
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
			height: 50%;
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

		@media screen and (max-width: 768px) {
			&::after {
				opacity: 0;
			}
		}
	}

	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.1);
		}
	}

	@media screen and (min-width: 768px) {
		margin-bottom: var(--container-gap);
	}
}
</style>
