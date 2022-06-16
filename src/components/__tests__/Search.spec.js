import { describe, it, expect, vitest } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import NavBar from "../navigation/NavBar.vue";
import { useShowsStore } from "@/stores/shows.js";

describe("Search", () => {
	it("renders properly", () => {
		const wrapper = mount(NavBar, {
			global: { plugins: [createTestingPinia({ createSpy: vitest.fn })] },
			props: {},
		});

		const store = useShowsStore();
		store.init();

		expect(store.init).toHaveBeenCalledTimes(1);
	});
});
