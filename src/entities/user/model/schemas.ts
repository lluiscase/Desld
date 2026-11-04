import { z } from "zod";

export const userProfileSchema = z.object({
	id: z.string().min(1, "ID é obrigatório"),
	name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
	email: z.string().email("Formato de e-mail inválido"),
	avatarUrl: z.string().url("URL de avatar inválida").optional(),
	phone: z.string().optional(),
	createdAt: z.string().optional(),
});

export const userSessionSchema = z.object({
	user: userProfileSchema,
	token: z.string().min(1, "Token de autenticação obrigatório"),
	expiresAt: z.string().optional(),
});

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "E-mail é obrigatório")
		.email("Insira um endereço de e-mail válido"),
	password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export const registerSchema = z
	.object({
		name: z.string().min(2, "Nome completo deve ter no mínimo 2 caracteres"),
		email: z
			.string()
			.min(1, "E-mail é obrigatório")
			.email("Insira um endereço de e-mail válido"),
		password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
		confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas digitadas não coincidem",
		path: ["confirmPassword"],
	});

export type UserProfile = z.infer<typeof userProfileSchema>;
export type UserSession = z.infer<typeof userSessionSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
