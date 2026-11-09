export interface TagItem {
	id: string;
	label: string;
}

export const MUTUALLY_EXCLUSIVE_TAG_GROUPS: readonly (readonly string[])[] = [
	// Sexo: Macho ou Fêmea
	["macho", "femea"],
	// Idade: apenas uma faixa etária
	["0-2-anos", "2-5-anos", "5-10-anos", "10-mais-anos"],
	// Porte: apenas um tamanho
	["pequeno-porte", "medio-porte", "grande-porte"],
	// Temperamento conflitante
	["docil", "agressivo"],
] as const;

export const DEFAULT_RESCUE_TAGS: TagItem[] = [
	// Sexo
	{ id: "macho", label: "Macho" },
	{ id: "femea", label: "Fêmea" },

	// Idade
	{ id: "0-2-anos", label: "0-2 anos" },
	{ id: "2-5-anos", label: "2-5 anos" },
	{ id: "5-10-anos", label: "5-10 anos" },
	{ id: "10-mais-anos", label: "+10 anos" },

	// Porte
	{ id: "pequeno-porte", label: "Pequeno porte" },
	{ id: "medio-porte", label: "Médio porte" },
	{ id: "grande-porte", label: "Grande porte" },

	// Saúde e Condição
	{ id: "castrado", label: "Castrado" },
	{ id: "vacinado", label: "Vacinado" },
	{ id: "vermifugado", label: "Vermifugado" },
	{ id: "machucado", label: "Machucado" },
	{ id: "cuidados-especiais", label: "Cuidados especiais" },

	// Comportamento
	{ id: "docil", label: "Dócil" },
	{ id: "calmo", label: "Calmo" },
	{ id: "brincalhao", label: "Brincalhão" },
	{ id: "agressivo", label: "Agressivo" },
	{ id: "sociavel-caes", label: "Sociável com cães" },
	{ id: "sociavel-gatos", label: "Sociável com gatos" },
	{ id: "sociavel-criancas", label: "Sociável com crianças" },

	// Identificação e Situação
	{ id: "coleira", label: "Coleira com identificação" },
	{ id: "lar-temporario", label: "Lar temporário" },
	{ id: "urgente", label: "Urgente" },
];

/**
 * Calcula a nova lista de tags selecionadas aplicando as regras de exclusão mútua.
 */
export function calculateNextSelectedTags(
	currentIds: string[],
	tagId: string,
	mutuallyExclusiveGroups: readonly (readonly string[])[] = MUTUALLY_EXCLUSIVE_TAG_GROUPS,
): string[] {
	if (currentIds.includes(tagId)) {
		return currentIds.filter((id) => id !== tagId);
	}

	const conflictingGroup = mutuallyExclusiveGroups.find((group) =>
		group.includes(tagId),
	);

	if (conflictingGroup) {
		return [
			...currentIds.filter((id) => !conflictingGroup.includes(id)),
			tagId,
		];
	}

	return [...currentIds, tagId];
}
