<template>
	<div class="back-to-top">
		<button @click="backToTop" ref="backToTopButton" class="button">
			&uarr;
		</button>
	</div>
</template>
<script>
export default {
	methods: {
		backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		},

		handleClass() {
			if (window.scrollY > 100) {
				if (!this.$refs.backToTopButton.classList.contains("visible")) {
					this.$refs.backToTopButton.classList.add("visible");
				}
			} else {
				if (this.$refs.backToTopButton.classList.contains("visible")) {
					this.$refs.backToTopButton.classList.remove("visible");
				}
			}
		},
	},

	mounted() {
		document.addEventListener("scroll", this.handleClass);
	},
};
</script>
<style scoped lang="scss">
.back-to-top {
	position: fixed;
	bottom: calc(var(--container-gap) * 1);
	right: calc(var(--container-gap) * 1);
	width: 3em;
	height: 3em;
	z-index: 998;

	.button {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		background-color: var(--color-text-link);
		border: none;
		outline: none;
		margin: 0;
		transition: background-color 0.1s ease-in-out, opacity 0.2s ease-in-out;

		&:hover {
			background-color: var(--color-text-link-darker);
		}

		&:not(.visible) {
			opacity: 0;
			pointer-events: none;
		}
	}
	@media screen and (min-width: 992px) {
		bottom: calc(var(--container-gap) * 2);
		right: calc(var(--container-gap) * 2);
		width: 4em;
		height: 4em;
	}
}
</style>
