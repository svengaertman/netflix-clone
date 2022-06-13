import { defineStore } from "pinia";
import axios from "axios";

export const useShowsStore = defineStore({
	id: "shows",
	state: () => ({
		allShows: [],
		popularShows: [],
		numberOfPopularShows: 10,
		genres: [],
	}),
	getters: {
		getPopularShows() {
			return this.popularShows;
		},

		getGenres() {
			return this.genres;
		},

		getShowsByGenre: (state) => {
			return (genre) =>
				state.allShows.filter((show) => show.genres.includes(genre));
		},
	},
	actions: {
		init() {
			axios.get("https://api.tvmaze.com/shows").then((response) => {
				this.allShows = response.data;
				this.createPopularShows(this.allShows);
				this.getGenresOfShows(this.allShows);
			});
		},

		createPopularShows(payload) {
			const randomIntFromInterval = (min, max) => {
				return Math.floor(Math.random() * (max - min + 1) + min);
			};

			for (var i = 0; i < this.numberOfPopularShows; i++) {
				this.popularShows.push(
					payload[randomIntFromInterval(0, payload.length)]
				);
			}
		},

		getGenresOfShows(payload) {
			payload.forEach((show) => {
				show.genres.forEach((genre) => {
					if (!this.genres.includes(genre)) {
						this.genres.push(genre);
					}
				});
			});
		},
	},
});
