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
					.filter((show) => {
						return show.genres.some(
							(showGenre) => showGenre.toLowerCase() === genre.toLowerCase()
						);
					})
					.sort((a, b) => b.rating.average - a.rating.average);

				if (showsByGenre.length > 6) {
					return showsByGenre;
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
			this.genres = [];
			const genreCounter = {};
			payload.forEach((show) => {
				show.genres.forEach((genre) => {
					if (genreCounter.hasOwnProperty(genre)) {
						genreCounter[genre] += 1;
					} else {
						genreCounter[genre] = 1;
					}
				});
			});

			for (const [key, value] of Object.entries(genreCounter)) {
				if (value > 6) {
					this.genres.push(key);
				}
			}
		},
	},
});
