import type { Pet, PetTag, RescueStatus } from "./schemas";

export interface PetFilterOptions {
	status?: RescueStatus;
	tags?: PetTag[];
	searchTerm?: string;
}

export interface PetCardProps {
	pet: Pet;
	onPress?: (petId: string) => void;
	className?: string;
}
