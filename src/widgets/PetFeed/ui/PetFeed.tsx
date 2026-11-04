import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { type Pet, PetCard } from "@/entities/pet";
import { SearchBar, TagFilterList } from "@/features/search-pets";

export interface PetFeedProps {
	pets: Pet[];
	isLoading?: boolean;
	onPetSelect?: (petId: string) => void;
	onFilterPress?: () => void;
	headerTitle?: string;
	className?: string;
}

export function PetFeed({
	pets = [],
	isLoading = false,
	onPetSelect,
	onFilterPress,
	headerTitle = "Animais Precisando de Ajuda",
	className = "",
}: PetFeedProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	// Filtragem declarativa
	const filteredPets = useMemo(() => {
		return pets.filter((pet) => {
			const matchesQuery =
				searchQuery.trim() === "" ||
				Boolean(pet.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
				Boolean(
					pet.description?.toLowerCase().includes(searchQuery.toLowerCase()),
				) ||
				Boolean(
					pet.location?.toLowerCase().includes(searchQuery.toLowerCase()),
				);

			const matchesTags =
				selectedTags.length === 0 ||
				selectedTags.includes(pet.status) ||
				selectedTags.some((tag) => (pet.tags as string[]).includes(tag));

			return matchesQuery && matchesTags;
		});
	}, [pets, searchQuery, selectedTags]);

	const renderItem = ({ item }: { item: Pet }) => (
		<View className="flex-1 items-center px-1">
			<PetCard pet={item} onPress={onPetSelect} />
		</View>
	);

	return (
		<View className={`flex-1 w-full ${className}`}>
			{/* Barra de Pesquisa */}
			<View className="px-4 pt-2 pb-1">
				<SearchBar onSearch={setSearchQuery} onFilterPress={onFilterPress} />
			</View>

			{/* Filtro por Tags */}
			<View className="px-4">
				<TagFilterList
					selectedTags={selectedTags}
					onTagToggle={(_, updated) => setSelectedTags(updated)}
				/>
			</View>

			{/* Título de Seção */}
			{headerTitle ? (
				<View className="px-4 py-2">
					<Text className="text-xl font-bold text-gray-800">{headerTitle}</Text>
				</View>
			) : null}

			{/* Estado de Carregamento */}
			{isLoading ? (
				<View className="flex-1 items-center justify-center p-8">
					<ActivityIndicator size="large" color="#42A5F5" />
					<Text className="text-gray-500 text-sm mt-3">
						Buscando animaizinhos...
					</Text>
				</View>
			) : (
				<FlatList
					data={filteredPets}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					numColumns={2}
					contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={
						<View className="items-center justify-center py-16 px-4">
							<Text className="text-lg font-semibold text-gray-700 text-center">
								Nenhum animal encontrado
							</Text>
							<Text className="text-sm text-gray-500 text-center mt-1">
								Tente ajustar sua busca ou remover os filtros aplicados.
							</Text>
						</View>
					}
				/>
			)}
		</View>
	);
}
