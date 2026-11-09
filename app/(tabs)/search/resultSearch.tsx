import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { PetCard, usePetListQuery } from "@/entities/pet";
import { SearchInput as InputSearch } from "@/features/search-pets";

export default function ResultSearch() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { query } = useLocalSearchParams<{ query?: string }>();
	const { data: pets = [] } = usePetListQuery();
	const quantidade = pets.length > 0 ? pets.length : 150;

	const handleGoBack = () => {
		router.back();
	};

	const handlePetPress = (id: string) => {
		router.push({
			pathname: "/(tabs)/search/animalSelect" as any,
			params: { id },
		});
	};

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<View className="flex-1 bg-white">
			{/* Header Fixo no Topo com Safe Area */}
			<View
				style={{ paddingTop: topPadding }}
				className="px-4 pb-3 bg-white border-b border-gray-100 shadow-sm z-10"
			>
				<View className="flex-row items-center gap-2">
					<TouchableOpacity
						className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-gray-100"
						onPress={handleGoBack}
						accessibilityRole="button"
						accessibilityLabel="Voltar"
					>
						<MaterialIcons name="arrow-back" size={26} color="#1F2937" />
					</TouchableOpacity>
					<InputSearch
						filter
						placeholder={query ? String(query) : "Buscar animal ou localização..."}
						className="flex-1"
					/>
				</View>
				<Text className="font-ubuntu-regular text-xs text-gray-500 pt-2 px-1">
					{`${quantidade} resultados para "${query || "Geral"}"`}
				</Text>
			</View>

			{/* Conteúdo Rolável sob o Header Fixo */}
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingTop: 16,
					paddingBottom: bottomPadding,
				}}
				showsVerticalScrollIndicator={false}
			>
				<View className="flex-row flex-wrap justify-between gap-y-4">
					{pets.map((pet) => (
						<PetCard key={pet.id} pet={pet} onPress={handlePetPress} />
					))}
				</View>
			</ScrollView>

			<StatusBar style="dark" />
		</View>
	);
}
