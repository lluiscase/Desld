import { z } from "zod";
import { petTagEnum, rescueStatusEnum } from "@/entities/pet";

export const rescueReportSchema = z.object({
	title: z
		.string()
		.min(3, "O título ou nome do pet deve ter pelo menos 3 caracteres"),
	species: z.enum(["dog", "cat", "other"]),
	status: rescueStatusEnum,
	images: z
		.array(z.string().min(1))
		.min(1, "Adicione pelo menos uma foto para identificar o pet"),
	description: z
		.string()
		.min(10, "Forneça uma descrição detalhada de no mínimo 10 caracteres"),
	location: z.string().min(3, "Informe a localização ou ponto de referência"),
	tags: z.array(petTagEnum),
	contactPhone: z.string().optional(),
});

export type RescueReportInput = z.infer<typeof rescueReportSchema>;
