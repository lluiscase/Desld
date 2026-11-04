import { useQuery } from "@tanstack/react-query";
import type { Pet } from "./schemas";

const MOCK_PETS: Pet[] = [
	{
		id: "pet_1",
		name: "Rex",
		status: "lost",
		tags: ["dog", "neutered", "vaccinated"],
		daysCount: 12,
		imageUrl:
			"https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop",
		imageUrls: [
			"https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=600&auto=format&fit=crop",
		],
		description:
			"Cão dócil, porte médio, cor caramelo com coleira vermelha. Visto pela última vez perto da praça.",
		location: "Jardim Paulista, São Paulo - SP",
	},
	{
		id: "pet_2",
		name: null,
		status: "street",
		tags: ["dog", "injured", "urgent"],
		daysCount: 2,
		imageUrl:
			"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop",
		imageUrls: [
			"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop",
		],
		description:
			"Cãozinho de rua com pata traseira machucada, necessita de resgate urgente.",
		location: "Av. Santo Amaro, São Paulo - SP",
	},
	{
		id: "pet_3",
		name: "Mago",
		status: "rescued",
		tags: ["cat", "friendly", "neutered"],
		daysCount: 5,
		imageUrl:
			"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
		imageUrls: [
			"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
		],
		description:
			"Gato resgatado, muito carinhoso e pronto para adoção responsável.",
		location: "Vila Mariana, São Paulo - SP",
	},
	{
		id: "pet_4",
		name: "Bravinha",
		status: "lost",
		tags: ["dog", "friendly"],
		daysCount: 4,
		imageUrl:
			"https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop",
		imageUrls: [
			"https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop",
		],
		description:
			"Cadela perdida com mancha branca no peito. Atende pelo nome de Bravinha.",
		location: "Pinheiros, São Paulo - SP",
	},
];

export function usePetListQuery() {
	return useQuery({
		queryKey: ["pets", "list"],
		queryFn: async (): Promise<Pet[]> => {
			// Simula latência de rede
			await new Promise((resolve) => setTimeout(resolve, 300));
			return MOCK_PETS;
		},
	});
}

export function usePetDetailsQuery(id?: string) {
	return useQuery({
		queryKey: ["pets", "details", id],
		queryFn: async (): Promise<Pet | null> => {
			await new Promise((resolve) => setTimeout(resolve, 200));
			if (!id) return MOCK_PETS[0];
			return MOCK_PETS.find((p) => p.id === id) ?? MOCK_PETS[0];
		},
		enabled: Boolean(id),
	});
}
