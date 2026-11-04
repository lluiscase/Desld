import { describe, expect, it } from "vitest";
import {
	loginSchema,
	registerSchema,
	userProfileSchema,
	userSessionSchema,
} from "./schemas";

describe("User Entity - Zod Schemas", () => {
	describe("loginSchema", () => {
		it("deve validar credenciais válidas de login", () => {
			const validPayload = {
				email: "protetor@auhelp.com.br",
				password: "password123",
			};

			const result = loginSchema.safeParse(validPayload);
			expect(result.success).toBe(true);
		});

		it("deve rejeitar e-mail em formato inválido", () => {
			const invalidPayload = {
				email: "email-invalido",
				password: "password123",
			};

			const result = loginSchema.safeParse(invalidPayload);
			expect(result.success).toBe(false);
		});

		it("deve rejeitar senha com menos de 6 caracteres", () => {
			const shortPasswordPayload = {
				email: "protetor@auhelp.com.br",
				password: "123",
			};

			const result = loginSchema.safeParse(shortPasswordPayload);
			expect(result.success).toBe(false);
		});
	});

	describe("registerSchema", () => {
		it("deve validar cadastro quando senhas coincidem", () => {
			const result = registerSchema.safeParse({
				name: "Daniel Mattos",
				email: "daniel@auhelp.com",
				password: "strongPassword123",
				confirmPassword: "strongPassword123",
			});

			expect(result.success).toBe(true);
		});

		it("deve rejeitar cadastro quando confirmPassword diverge de password", () => {
			const result = registerSchema.safeParse({
				name: "Daniel Mattos",
				email: "daniel@auhelp.com",
				password: "strongPassword123",
				confirmPassword: "differentPassword",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0]?.path).toContain("confirmPassword");
			}
		});
	});

	describe("userProfileSchema & userSessionSchema", () => {
		it("deve validar uma sessão completa de usuário autenticado", () => {
			const profile = {
				id: "usr_01",
				name: "Anna Faustino",
				email: "anna@auhelp.com",
			};

			expect(userProfileSchema.safeParse(profile).success).toBe(true);

			const session = {
				user: profile,
				token: "jwt_valid_token_xyz",
			};

			expect(userSessionSchema.safeParse(session).success).toBe(true);
		});
	});
});
