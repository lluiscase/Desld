// Em app/(tabs)/search/resultSearch.tsx
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CardAnimal from "../../../src/components/CardAnimal";
import InputSearch from "../../../src/components/Search";

export default function ResultSearch() {
	const { query } = useLocalSearchParams();
	const quantidade = 150;

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
			<Text className="opacity-[0.5] py-2">{`${quantidade} resultados para “Valo velho”`}</Text>
			<ScrollView>
				<View className="flex flex-row flex-wrap justify-between pt-6">
					<CardAnimal id="1" name="rex" date={12} />
					<CardAnimal id="2" date={1} />
					<CardAnimal id="3" name="rex" date={7} />
					<CardAnimal id="4" name="rex" date={3} />
					<CardAnimal id="5" date={10} />
				</View>
			</ScrollView>
		</View>
	);
}
