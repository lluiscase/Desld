import { useRouter } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { usePetListQuery } from "@/entities/pet";
import { PetFeed } from "@/widgets/PetFeed";

export default function SearchRoute() {
	const router = useRouter();
	const { data: pets = [], isLoading } = usePetListQuery();

	const handlePetSelect = (petId: string) => {
		router.push({
			pathname: "/(tabs)/search/animalSelect",
			params: { id: petId },
		});
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="px-5 pt-3 pb-1">
				<Text className="text-2xl font-bold text-gray-900">
					Explorar e Buscar
				</Text>
				<Text className="text-sm text-gray-500">
					Encontre animais perdidos ou ONGs perto de você
				</Text>
			</View>

			<PetFeed
				pets={pets}
				isLoading={isLoading}
				onPetSelect={handlePetSelect}
				headerTitle="Resultados de Busca"
			/>
		</SafeAreaView>
	);
}
