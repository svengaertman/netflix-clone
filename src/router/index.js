import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/:id",
			name: "single",
			component: () => import("../views/SingleView.vue"),
		},
		{
			path: "/genre/:id",
			name: "genre",
			component: () => import("../views/GenreView.vue"),
		},
	],
});

export default router;
