import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { usePetListQuery } from "@/entities/pet";
import { ArrowLeft } from "@/shared/icons";
import { PetFeed } from "@/widgets/PetFeed";

export default function ResultSearchRoute() {
	const router = useRouter();
	const { query } = useLocalSearchParams<{ query?: string }>();
	const { data: pets = [], isLoading } = usePetListQuery();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="px-5 pt-3 pb-2 flex-row items-center">
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Voltar"
					onPress={() => router.back()}
					className="p-1 mr-2"
				>
					<ArrowLeft size={24} color="#42A5F5" />
				</TouchableOpacity>
				<Text className="text-xl font-bold text-gray-900">
					Busca: {query || "Geral"}
				</Text>
			</View>

			<PetFeed
				pets={pets}
				isLoading={isLoading}
				onPetSelect={(id) =>
					router.push({
						pathname: "/(tabs)/search/animalSelect",
						params: { id },
					})
				}
			/>
		</SafeAreaView>
	);
}
