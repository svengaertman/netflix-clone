import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SliderSection from "../SliderSection.vue";

describe("SliderSection", () => {
	it("renders properly", () => {
		const wrapper = mount(SliderSection, { props: { name: "Test" } });
		expect(wrapper.text()).toContain("Test");
	});
});
