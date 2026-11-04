import { describe, expect, it } from "vitest";
import { analyzePetImageWithAi } from "../api/triagePetService";
import {
	mapAiResultToFormValues,
	petTriageAiSchema,
} from "./petTriageAiSchema";

describe("Pet Triage AI - Schema & Service", () => {
	it("deve validar um payload estruturado completo da IA", () => {
		const validAiOutput = {
			species: "dog",
			estimatedBreed: "Sem raça definida (SRD) - Caramelo",
			urgencyLevel: "high",
			detectedPhysicalTraits: [
				"Pelagem curta caramelo",
				"Porte médio",
				"Sem coleira visível",
			],
			apparentInjuries: ["Pata dianteira esquerda levantada"],
			recommendedActions: [
				"Aproximar-se com calma",
				"Oferecer água fresca",
				"Encaminhar para avaliação veterinária",
			],
		};

		const parsed = petTriageAiSchema.safeParse(validAiOutput);
		expect(parsed.success).toBe(true);
	});

	it("deve rejeitar payload da IA com urgencyLevel ou species inválidos", () => {
		const invalidAiOutput = {
			species: "bird",
			estimatedBreed: "Calopsita",
			urgencyLevel: "extreme",
			detectedPhysicalTraits: [],
			apparentInjuries: [],
			recommendedActions: [],
		};

		const parsed = petTriageAiSchema.safeParse(invalidAiOutput);
		expect(parsed.success).toBe(false);
	});

	it("deve converter o resultado da IA em valores aplicáveis ao formulário de resgate", () => {
		const aiResult = petTriageAiSchema.parse({
			species: "cat",
			estimatedBreed: "Siamês Mestiço",
			urgencyLevel: "critical",
			detectedPhysicalTraits: [
				"Olhos azuis",
				"Pelagem clara com extremidades escuras",
			],
			apparentInjuries: ["Desidratação aparente", "Arranhão no dorso"],
			recommendedActions: [
				"Isolar em caixa de transporte segura",
				"Atendimento imediato",
			],
		});

		const mapped = mapAiResultToFormValues(aiResult);
		expect(mapped.species).toBe("cat");
		expect(mapped.status).toBe("street");
		expect(mapped.tags).toContain("cat");
		expect(mapped.tags).toContain("urgent");
		expect(mapped.tags).toContain("injured");
		expect(mapped.description).toContain("Siamês Mestiço");
	});

	it("deve executar analyzePetImageWithAi em modo Demo resiliente sem falhar sem API key", async () => {
		const result = await analyzePetImageWithAi(
			"file:///mock/dog_rescue_photo.jpg",
		);
		const validation = petTriageAiSchema.safeParse(result);

		expect(validation.success).toBe(true);
		expect(result.species).toBe("dog");
		expect(result.recommendedActions.length).toBeGreaterThan(0);
	});
});
