<template>
	<div class="episode-card">
		<div class="image-wrapper">
			<img :src="image" :alt="'Poster of episode ' + episode.name" />
		</div>
		<div class="info">
			<div class="title">
				<span>S{{ episode.season }} E{{ episode.number }}</span>
				<h5>{{ episode.name }}</h5>
			</div>
			<span class="text" v-html="episode.summary"></span>
		</div>
	</div>
</template>
<script>
export default {
	props: ["episode"],

	computed: {
		image() {
			return window.innerWidth > 991
				? this.episode.image.medium
				: this.episode.image.original;
		},
	},
};
</script>
<style scoped lang="scss">
.episode-card {
	margin-bottom: var(--container-gap);

	.image-wrapper {
		width: 30%;
		padding-top: 20%;
		overflow: hidden;
		position: relative;

		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.info {
		width: 70%;
		.title {
			h5 {
				font-size: 1.3rem;
			}
		}
		.text {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	@media screen and (min-width: 992px) {
		display: flex;

		.info {
			padding: 0 var(--container-gap);
		}
	}

	@media screen and (max-width: 991px) {
		margin-bottom: calc(var(--container-gap) * 2);

		.info {
			width: 100%;
		}

		.image-wrapper {
			margin-bottom: 5px;
			width: 100%;
			padding-top: 60%;
		}
	}
}
</style>
