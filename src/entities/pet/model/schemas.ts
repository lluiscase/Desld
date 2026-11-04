import { z } from "zod";

export const rescueStatusEnum = z.enum([
	"lost",
	"street",
	"rescued",
	"adopted",
]);

export const petTagEnum = z.enum([
	"dog",
	"cat",
	"injured",
	"urgent",
	"friendly",
	"neutered",
	"vaccinated",
	"special_needs",
]);

export const petSchema = z.object({
	id: z.string().min(1, "ID do pet é obrigatório"),
	name: z.string().nullable().optional(),
	status: rescueStatusEnum.default("street"),
	tags: z.array(petTagEnum).default([]),
	daysCount: z.number().int().nonnegative().default(0),
	imageUrl: z.string().min(1, "Imagem do pet é obrigatória"),
	imageUrls: z.array(z.string()).default([]),
	description: z.string().optional(),
	location: z.string().optional(),
	createdAt: z.string().optional(),
});

export type RescueStatus = z.infer<typeof rescueStatusEnum>;
export type PetTag = z.infer<typeof petTagEnum>;
export type Pet = z.infer<typeof petSchema>;
