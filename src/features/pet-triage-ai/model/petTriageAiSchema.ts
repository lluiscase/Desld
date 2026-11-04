import { z } from "zod";
import type { PetTag, RescueStatus } from "@/entities/pet";

export const aiSpeciesEnum = z.enum(["dog", "cat", "other"]);

export const aiUrgencyLevelEnum = z.enum(["low", "medium", "high", "critical"]);

export const petTriageAiSchema = z.object({
	species: aiSpeciesEnum,
	estimatedBreed: z
		.string()
		.min(1, "Raça estimada é obrigatória")
		.describe("Raça provável identificada ou Sem raça definida (SRD)"),
	urgencyLevel: aiUrgencyLevelEnum,
	detectedPhysicalTraits: z
		.array(z.string())
		.describe(
			"Características físicas visíveis (ex: cor da pelagem, porte, marcas)",
		),
	apparentInjuries: z
		.array(z.string())
		.describe("Ferimentos ou sinais clínicos aparentes"),
	recommendedActions: z
		.array(z.string())
		.min(1, "Pelo menos uma ação recomendada deve ser fornecida")
		.describe("Primeiros socorros e cuidados imediatos recomendados"),
});

export type AiSpecies = z.infer<typeof aiSpeciesEnum>;
export type AiUrgencyLevel = z.infer<typeof aiUrgencyLevelEnum>;
export type PetTriageAiResult = z.infer<typeof petTriageAiSchema>;

export interface MappedRescueFormSuggestion {
	title: string;
	species: AiSpecies;
	status: RescueStatus;
	tags: PetTag[];
	description: string;
}

export function mapAiResultToFormValues(
	result: PetTriageAiResult,
): MappedRescueFormSuggestion {
	const tags: PetTag[] = [];

	if (result.species === "dog") {
		tags.push("dog");
	} else if (result.species === "cat") {
		tags.push("cat");
	}

	if (result.urgencyLevel === "high" || result.urgencyLevel === "critical") {
		tags.push("urgent");
	}

	if (result.apparentInjuries.length > 0) {
		tags.push("injured");
	} else {
		tags.push("friendly");
	}

	const speciesLabel =
		result.species === "dog"
			? "Cão"
			: result.species === "cat"
				? "Gato"
				: "Animal";

	const traitsSummary =
		result.detectedPhysicalTraits.length > 0
			? `Características: ${result.detectedPhysicalTraits.join(", ")}.`
			: "";

	const injuriesSummary =
		result.apparentInjuries.length > 0
			? `Sinais clínicos: ${result.apparentInjuries.join(", ")}.`
			: "Sem ferimentos graves aparentes na triagem visual.";

	const actionsSummary =
		result.recommendedActions.length > 0
			? `Cuidados recomendados: ${result.recommendedActions.join("; ")}.`
			: "";

	const description = [
		`[Triagem IA] ${speciesLabel} (${result.estimatedBreed}) - Urgência: ${result.urgencyLevel.toUpperCase()}.`,
		traitsSummary,
		injuriesSummary,
		actionsSummary,
	]
		.filter(Boolean)
		.join(" ");

	return {
		title: `${speciesLabel} - ${result.estimatedBreed}`,
		species: result.species,
		status: "street",
		tags,
		description,
	};
}
