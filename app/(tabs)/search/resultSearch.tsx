import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { PetCard, usePetListQuery } from "@/entities/pet";
import { SearchInput as InputSearch } from "@/features/search-pets";

export default function ResultSearch() {
	const router = useRouter();
	const { query } = useLocalSearchParams<{ query?: string }>();
	const { data: pets = [] } = usePetListQuery();
	const quantidade = pets.length > 0 ? pets.length : 150;

	const handleGoBack = () => {
		router.back();
	};

	const handlePetPress = (id: string) => {
		router.push({
			pathname: "/search/animalSelect" as any,
			params: { id },
		});
	};

	return (
		<View className="flex-1 flex-col px-8 bg-white pt-12">
			<View className="pb-8">
				<TouchableOpacity className="mr-3" onPress={handleGoBack}>
					<MaterialIcons name={"arrow-back"} size={25} color="#000" />
				</TouchableOpacity>
			</View>
			<InputSearch filter placeholder={`${query || ""}`} />
			<Text className="opacity-[0.5] py-2">
				{`${quantidade} resultados para "${query || "Valo velho"}"`}
			</Text>
			<ScrollView>
				<View className="flex flex-row flex-wrap justify-between pt-6">
					{pets.map((pet) => (
						<PetCard key={pet.id} pet={pet} onPress={handlePetPress} />
					))}
				</View>
			</ScrollView>
		</View>
	);
}
