import { describe, expect, it } from "vitest";
import { petSchema, petTagEnum, rescueStatusEnum } from "./schemas";

describe("Pet Entity - Zod Schemas", () => {
	it("deve validar um objeto Pet canônico completo", () => {
		const validPet = {
			id: "pet_101",
			name: "Thor",
			status: "lost",
			tags: ["dog", "friendly", "vaccinated"],
			daysCount: 3,
			imageUrl: "https://example.com/thor.jpg",
			imageUrls: ["https://example.com/thor.jpg"],
			description: "Cão dócil visto próximo ao parque.",
			location: "Moema, São Paulo - SP",
		};

		const result = petSchema.safeParse(validPet);
		expect(result.success).toBe(true);
	});

	it("deve rejeitar status de resgate ou tags fora do enum", () => {
		expect(rescueStatusEnum.safeParse("unknown_status").success).toBe(false);
		expect(petTagEnum.safeParse("flying_pet").success).toBe(false);
	});
});
