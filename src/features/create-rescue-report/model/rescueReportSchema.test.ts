import { describe, expect, it } from "vitest";
import { rescueReportSchema } from "./rescueReportSchema";

describe("Create Rescue Report Feature - rescueReportSchema", () => {
	it("deve validar um relatório de resgate completo com fotos", () => {
		const validReport = {
			title: "Cachorro Caramelo",
			species: "dog",
			status: "street",
			images: ["file:///photo1.jpg"],
			description: "Cachorro dócil encontrado próximo à estação de metrô.",
			location: "Av. Paulista, 1000",
			tags: ["dog", "friendly"],
		};

		const result = rescueReportSchema.safeParse(validReport);
		expect(result.success).toBe(true);
	});

	it("deve rejeitar relatório de resgate sem fotos ou com descrição curta", () => {
		const invalidReport = {
			title: "Re",
			species: "dog",
			status: "street",
			images: [],
			description: "Curto",
			location: "SP",
			tags: [],
		};

		const result = rescueReportSchema.safeParse(invalidReport);
		expect(result.success).toBe(false);
	});
});
