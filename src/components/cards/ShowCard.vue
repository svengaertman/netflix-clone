<template>
	<div
		class="card card--show"
		@click.stop.prevent="this.$router.push(`/${slugifyText(item.name)}`)"
	>
		<div class="image-wrapper">
			<img :src="item.image.medium" alt="" />
		</div>
		<p class="text">
			{{ item.name }}
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

	mounted() {
		// console.log(this.item);
	},
};
</script>
<style scoped>
.card {
	width: 100%;
	aspect-ratio: 1 / 1;
	margin-bottom: var(--container-gap);
	position: relative;
}

.text {
	position: absolute;
	bottom: var(--container-gap);
	left: var(--container-gap);
	z-index: 2;
	color: white;
}

.image-wrapper {
	width: 100%;
	aspect-ratio: 1 / 1;
	position: relative;
}

.image-wrapper::after {
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
	opacity: 0.5;
	z-index: 1;
}

img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
