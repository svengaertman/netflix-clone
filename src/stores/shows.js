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
			axios
				.get("https://api.tvmaze.com/shows")
				.then((response) => {
					this.allShows = response.data;
					this.createPopularShows(this.allShows);
					this.getGenresOfShows(this.allShows);
				})
				.catch((error) => {
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log("Error", error.message);
					}
					console.log(error.config);
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
