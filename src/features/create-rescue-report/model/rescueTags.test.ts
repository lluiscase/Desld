import { describe, expect, it } from "vitest";
import {
	calculateNextSelectedTags,
	DEFAULT_RESCUE_TAGS,
	MUTUALLY_EXCLUSIVE_TAG_GROUPS,
} from "./rescueTags";

describe("Rescue Tags - calculateNextSelectedTags & Model", () => {
	it("deve definir corretamente os grupos de exclusão mútua", () => {
		expect(MUTUALLY_EXCLUSIVE_TAG_GROUPS).toContainEqual(["macho", "femea"]);
		expect(MUTUALLY_EXCLUSIVE_TAG_GROUPS).toContainEqual([
			"0-2-anos",
			"2-5-anos",
			"5-10-anos",
			"10-mais-anos",
		]);
	});

	it("deve permitir selecionar uma tag quando a lista estiver vazia", () => {
		const next = calculateNextSelectedTags([], "castrado");
		expect(next).toEqual(["castrado"]);
	});

	it("deve desmarcar a tag ao clicar em uma tag já selecionada", () => {
		const next = calculateNextSelectedTags(
			["castrado", "vacinado"],
			"castrado",
		);
		expect(next).toEqual(["vacinado"]);
	});

	it("deve substituir 'macho' por 'femea' e vice-versa (exclusão mútua de sexo)", () => {
		// Seleciona macho
		let tags = calculateNextSelectedTags([], "macho");
		expect(tags).toEqual(["macho"]);

		// Seleciona femea -> macho sai e femea entra
		tags = calculateNextSelectedTags(tags, "femea");
		expect(tags).toEqual(["femea"]);

		// Seleciona macho novamente -> femea sai e macho entra
		tags = calculateNextSelectedTags(tags, "macho");
		expect(tags).toEqual(["macho"]);
	});

	it("deve substituir faixas etárias ao trocar a idade mantendo outras tags intactas", () => {
		let tags = ["macho", "castrado", "0-2-anos"];

		// Seleciona '2-5-anos' -> remove '0-2-anos' e adiciona '2-5-anos'
		tags = calculateNextSelectedTags(tags, "2-5-anos");
		expect(tags).toEqual(["macho", "castrado", "2-5-anos"]);

		// Seleciona '+10 anos' -> substitui '2-5-anos' por '10-mais-anos'
		tags = calculateNextSelectedTags(tags, "10-mais-anos");
		expect(tags).toEqual(["macho", "castrado", "10-mais-anos"]);
	});

	it("deve substituir porte mantendo exclusividade (pequeno, médio, grande)", () => {
		let tags = ["pequeno-porte", "vacinado"];
		tags = calculateNextSelectedTags(tags, "grande-porte");
		expect(tags).toEqual(["vacinado", "grande-porte"]);
	});

	it("deve substituir temperamento antagônico (dócil x agressivo)", () => {
		let tags = ["docil", "castrado"];
		tags = calculateNextSelectedTags(tags, "agressivo");
		expect(tags).toEqual(["castrado", "agressivo"]);
	});

	it("deve permitir múltiplas tags independentes ao mesmo tempo", () => {
		let tags: string[] = [];
		tags = calculateNextSelectedTags(tags, "castrado");
		tags = calculateNextSelectedTags(tags, "vacinado");
		tags = calculateNextSelectedTags(tags, "vermifugado");
		tags = calculateNextSelectedTags(tags, "cuidados-especiais");

		expect(tags).toContain("castrado");
		expect(tags).toContain("vacinado");
		expect(tags).toContain("vermifugado");
		expect(tags).toContain("cuidados-especiais");
		expect(tags).toHaveLength(4);
	});

	it("deve conter tags essenciais e estruturadas em DEFAULT_RESCUE_TAGS", () => {
		const tagIds = DEFAULT_RESCUE_TAGS.map((t) => t.id);

		// Sexo
		expect(tagIds).toContain("macho");
		expect(tagIds).toContain("femea");

		// Idade
		expect(tagIds).toContain("0-2-anos");
		expect(tagIds).toContain("2-5-anos");
		expect(tagIds).toContain("5-10-anos");
		expect(tagIds).toContain("10-mais-anos");

		// Porte
		expect(tagIds).toContain("pequeno-porte");
		expect(tagIds).toContain("medio-porte");
		expect(tagIds).toContain("grande-porte");

		// Saúde e outros
		expect(tagIds).toContain("castrado");
		expect(tagIds).toContain("vacinado");
		expect(tagIds).toContain("vermifugado");
		expect(tagIds).toContain("coleira");
	});
});
