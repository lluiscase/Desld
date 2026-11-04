import { create } from "zustand";
import { appStorage } from "@/shared/lib";
import type { UserProfile, UserSession } from "./schemas";

const STORAGE_SESSION_KEY = "@auhelp/session";

interface SessionState {
	user: UserProfile | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	setSession: (session: UserSession) => Promise<void>;
	clearSession: () => Promise<void>;
	initializeSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: true,

	setSession: async (session: UserSession) => {
		try {
			await appStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
			set({
				user: session.user,
				token: session.token,
				isAuthenticated: true,
				isLoading: false,
			});
		} catch (error) {
			console.error("Erro ao salvar sessão segura:", error);
			set({
				user: session.user,
				token: session.token,
				isAuthenticated: true,
				isLoading: false,
			});
		}
	},

	clearSession: async () => {
		try {
			await appStorage.removeItem(STORAGE_SESSION_KEY);
		} catch (error) {
			console.error("Erro ao remover sessão do storage:", error);
		} finally {
			set({
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false,
			});
		}
	},

	initializeSession: async () => {
		try {
			set({ isLoading: true });
			const rawData = await appStorage.getItem(STORAGE_SESSION_KEY);
			if (rawData) {
				const session = JSON.parse(rawData) as UserSession;
				if (session?.token && session?.user) {
					set({
						user: session.user,
						token: session.token,
						isAuthenticated: true,
						isLoading: false,
					});
					return;
				}
			}
			set({
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false,
			});
		} catch (error) {
			console.error("Falha ao inicializar sessão persistida:", error);
			set({
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false,
			});
		}
	},
}));
