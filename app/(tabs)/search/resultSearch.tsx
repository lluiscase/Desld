// Em app/(tabs)/search/resultSearch.tsx
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InputSearch from "../../../src/components/Search";

export default function ResultSearch() {
	const { query } = useLocalSearchParams();
	const [quantidade, setQuantidade] = useState(150);

	const handleGoBack = () => {
		router.back();
	};
	return (
		<View className="flex-1 flex-col px-8 bg-white pt-12">
			<View className="pb-8">
				<TouchableOpacity className="mr-3" onPress={handleGoBack}>
					<MaterialIcons name={"arrow-back"} size={25} color="#000" />
				</TouchableOpacity>
			</View>
			<InputSearch filter placeholder={`${query}`} />
			<Text className="opacity-[0.5] pt-2">{`${quantidade} resultados para “Valo velho”`}</Text>
		</View>
	);
}
