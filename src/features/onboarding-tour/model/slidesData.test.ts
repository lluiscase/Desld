import { describe, expect, it } from "vitest";
import { ONBOARDING_SLIDES } from "./slidesData";

describe("Onboarding Slides Data", () => {
	it("deve conter exatamente 5 slides de introdução", () => {
		expect(ONBOARDING_SLIDES).toHaveLength(5);
	});

	it("cada slide deve possuir um id único, título e imagem associada", () => {
		const ids = new Set<string>();

		for (const slide of ONBOARDING_SLIDES) {
			expect(slide.id).toBeDefined();
			expect(ids.has(slide.id)).toBe(false);
			ids.add(slide.id);

			expect(typeof slide.title).toBe("string");
			expect(slide.title.trim().length).toBeGreaterThan(0);
			expect(slide.image).toBeDefined();
			expect(typeof slide.imageAlt).toBe("string");
		}
	});

	it("o step2 deve conter o destaque do verbo Reporte", () => {
		const step2 = ONBOARDING_SLIDES.find((slide) => slide.id === "step2");
		expect(step2).toBeDefined();
		expect(step2?.titleHighlight?.text).toBe("Reporte");
		expect(step2?.titleHighlight?.colorClassName).toContain("text-red-500");
	});
});
