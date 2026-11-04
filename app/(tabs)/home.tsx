import { useRouter } from "expo-router";
import { Image, SafeAreaView, Text, View } from "react-native";
import { usePetListQuery } from "@/entities/pet";
import { PetFeed } from "@/widgets/PetFeed";
import Banner from "../../assets/Banner.png";

export default function HomeRoute() {
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
			<View className="px-5 pt-3 pb-2 flex-row justify-between items-center">
				<Text className="text-blue-400 text-3xl font-bold">AuHelp</Text>
				<View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
					<Text className="text-blue-500 font-bold text-sm">AU</Text>
				</View>
			</View>

			<View className="px-4 pb-2">
				<Image
					source={Banner}
					style={{
						width: "100%",
						height: 120,
						borderRadius: 12,
						resizeMode: "cover",
					}}
				/>
			</View>

			<PetFeed
				pets={pets}
				isLoading={isLoading}
				onPetSelect={handlePetSelect}
				onFilterPress={() => router.push("/(tabs)/search")}
				headerTitle="Animais para Resgate ou Adoção"
			/>
		</SafeAreaView>
	);
}
