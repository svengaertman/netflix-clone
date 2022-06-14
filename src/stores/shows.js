import { defineStore } from "pinia";
import axios from "axios";

export const useShowsStore = defineStore({
	id: "shows",
	state: () => ({
		allShows: [],
		popularShows: [],
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
			return (genre) => {
				const showsByGenre = state.allShows
					.filter((show) => show.genres.includes(genre))
					.sort((a, b) => b.rating.average - a.rating.average);

				if (showsByGenre.length > 6) {
					return showsByGenre.slice(0, 15);
				}
				return null;
			};
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
			payload.sort((a, b) => b.rating.average - a.rating.average);
			this.popularShows = payload.slice(0, 10);
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
