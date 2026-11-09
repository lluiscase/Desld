import { beforeEach, describe, expect, it, vi } from "vitest";

const mockMemoryStore = new Map<string, string>();

vi.mock("@/shared/lib", () => ({
	appStorage: {
		getItem: vi.fn(async (key: string) => mockMemoryStore.get(key) ?? null),
		setItem: vi.fn(async (key: string, value: string) => {
			mockMemoryStore.set(key, value);
		}),
		removeItem: vi.fn(async (key: string) => {
			mockMemoryStore.delete(key);
		}),
	},
}));

import { useSessionStore } from "./useSessionStore";

describe("User Entity - useSessionStore", () => {
	beforeEach(async () => {
		mockMemoryStore.clear();
		await useSessionStore.getState().clearSession();
	});

	it("deve iniciar com sessão desautenticada após clearSession", () => {
		const state = useSessionStore.getState();
		expect(state.user).toBeNull();
		expect(state.token).toBeNull();
		expect(state.isAuthenticated).toBe(false);
	});

	it("deve autenticar o usuário e persistir a sessão ao chamar setSession", async () => {
		const sampleSession = {
			user: {
				id: "usr_99",
				name: "Protetor AuHelp",
				email: "protetor@auhelp.com",
			},
			token: "jwt_secure_token_99",
		};

		await useSessionStore.getState().setSession(sampleSession);

		const state = useSessionStore.getState();
		expect(state.isAuthenticated).toBe(true);
		expect(state.token).toBe("jwt_secure_token_99");
		expect(state.user?.email).toBe("protetor@auhelp.com");
		expect(mockMemoryStore.has("@auhelp/session")).toBe(true);
	});

	it("deve reidratar a sessão a partir do storage ao chamar initializeSession", async () => {
		const storedSession = {
			user: {
				id: "usr_77",
				name: "Maria Resgate",
				email: "maria@auhelp.com",
			},
			token: "jwt_persisted_77",
		};
		mockMemoryStore.set("@auhelp/session", JSON.stringify(storedSession));

		await useSessionStore.getState().initializeSession();

		const state = useSessionStore.getState();
		expect(state.isAuthenticated).toBe(true);
		expect(state.user?.name).toBe("Maria Resgate");
		expect(state.token).toBe("jwt_persisted_77");
		expect(state.isLoading).toBe(false);
	});

	it("deve limpar o estado e remover do storage ao chamar clearSession", async () => {
		await useSessionStore.getState().setSession({
			user: {
				id: "usr_10",
				name: "Teste Logout",
				email: "logout@auhelp.com",
			},
			token: "token_10",
		});

		await useSessionStore.getState().clearSession();

		const state = useSessionStore.getState();
		expect(state.isAuthenticated).toBe(false);
		expect(state.user).toBeNull();
		expect(state.token).toBeNull();
		expect(mockMemoryStore.has("@auhelp/session")).toBe(false);
	});
});
