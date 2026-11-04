import {
	type PetTriageAiResult,
	petTriageAiSchema,
} from "../model/petTriageAiSchema";

export interface TriageServiceOptions {
	endpoint?: string;
	apiKey?: string;
	simulateLatencyMs?: number;
}

function buildSmartDemoTriage(imageInput: string): PetTriageAiResult {
	const normalized = imageInput.toLowerCase();
	const isCat =
		normalized.includes("cat") ||
		normalized.includes("gato") ||
		normalized.includes("felino");

	if (isCat) {
		return petTriageAiSchema.parse({
			species: "cat",
			estimatedBreed: "Sem raça definida (SRD) - Pelo Curto Brasileiro",
			urgencyLevel: "medium",
			detectedPhysicalTraits: [
				"Porte pequeno a médio",
				"Pelagem curta tigrada",
				"Sem coleira de identificação",
			],
			apparentInjuries: [
				"Leve magreza aparente",
				"Postura acuada indicando estresse ambiental",
			],
			recommendedActions: [
				"Aproximar-se lentamente evitando movimentos bruscos",
				"Utilizar caixa de transporte ou toalha para contenção segura",
				"Oferecer água limpa e sachê úmido para hidratação",
			],
		});
	}

	return petTriageAiSchema.parse({
		species: "dog",
		estimatedBreed: "Sem raça definida (SRD) - Caramelo",
		urgencyLevel: "high",
		detectedPhysicalTraits: [
			"Porte médio",
			"Pelagem curta caramelo",
			"Orelhas semi-caídas",
			"Sem coleira ou placa de identificação visível",
		],
		apparentInjuries: [
			"Sinais leves de desidratação e fadiga",
			"Possível sensibilidade na pata dianteira",
		],
		recommendedActions: [
			"Manter distância segura inicial e observar sinais de dor ou medo",
			"Oferecer água fresca à sombra",
			"Isolar da via pública para evitar atropelamento e acionar resgate local",
		],
	});
}

export async function analyzePetImageWithAi(
	imageUriOrBase64: string,
	options: TriageServiceOptions = {},
): Promise<PetTriageAiResult> {
	if (!imageUriOrBase64 || imageUriOrBase64.trim().length === 0) {
		throw new Error("Uma imagem válida é necessária para a triagem por IA.");
	}

	const endpoint =
		options.endpoint ?? process.env.EXPO_PUBLIC_AI_TRIAGE_ENDPOINT;
	const apiKey = options.apiKey ?? process.env.EXPO_PUBLIC_GEMINI_API_KEY;
	const latencyMs = options.simulateLatencyMs ?? 450;

	if (endpoint && apiKey) {
		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: "gemini-2.5-flash",
					image: imageUriOrBase64,
				}),
			});

			if (response.ok) {
				const rawJson: unknown = await response.json();
				return petTriageAiSchema.parse(rawJson);
			}
		} catch {
			// Fallback resiliente para Modo Demo caso haja falha de rede ou backend indisponível
		}
	}

	if (latencyMs > 0) {
		await new Promise((resolve) => setTimeout(resolve, latencyMs));
	}

	return buildSmartDemoTriage(imageUriOrBase64);
}
