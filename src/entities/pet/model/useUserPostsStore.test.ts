import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_USER_POSTS, useUserPostsStore } from "./useUserPostsStore";

describe("useUserPostsStore", () => {
	beforeEach(() => {
		useUserPostsStore.getState().resetToDefault();
	});

	it("deve inicializar com as publicações mockadas padrão", () => {
		const posts = useUserPostsStore.getState().posts;
		expect(posts).toHaveLength(DEFAULT_USER_POSTS.length);
		expect(posts[0].name).toBe("Rex");
	});

	it("deve adicionar uma nova publicação no topo da lista", () => {
		useUserPostsStore.getState().addPost({
			name: "Pipoca",
			type: "Cachorro",
			situation: "Perdido",
		});

		const posts = useUserPostsStore.getState().posts;
		expect(posts).toHaveLength(DEFAULT_USER_POSTS.length + 1);
		expect(posts[0].name).toBe("Pipoca");
		expect(posts[0].time).toBe(0);
	});

	it("deve remover uma publicação existente por id", () => {
		useUserPostsStore.getState().removePost("usr_post_1");

		const posts = useUserPostsStore.getState().posts;
		expect(posts).toHaveLength(DEFAULT_USER_POSTS.length - 1);
		expect(posts.some((p) => p.id === "usr_post_1")).toBe(false);
	});

	it("deve limpar todas as publicações ao chamar clearPosts (estado vazio)", () => {
		useUserPostsStore.getState().clearPosts();

		const posts = useUserPostsStore.getState().posts;
		expect(posts).toHaveLength(0);
	});

	it("deve restaurar o estado padrão ao chamar resetToDefault", () => {
		useUserPostsStore.getState().clearPosts();
		expect(useUserPostsStore.getState().posts).toHaveLength(0);

		useUserPostsStore.getState().resetToDefault();
		expect(useUserPostsStore.getState().posts).toHaveLength(
			DEFAULT_USER_POSTS.length,
		);
	});
});
