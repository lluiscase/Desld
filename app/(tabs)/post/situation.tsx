import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "../../../src/components/Button";
import CorouselPost from "../../../src/components/CorouselPost";

const handleGoBack = () => {
	router.back();
};

export default function Situation() {
	return (
		<View className="flex-1 flex-col bg-white pt-24 pb-16 justify-between">
			<View className="px-8">
				<View className="flex flex-row justify-between">
					<TouchableOpacity className="mr-3 pt-2" onPress={handleGoBack}>
						<MaterialIcons name={"arrow-back"} size={25} color="#000" />
					</TouchableOpacity>
					<Text className="text-3xl font-bold text-center pr-16">
						{"Selecione qual\ntipo de anuncio?"}
					</Text>
				</View>
			</View>
			<CorouselPost />
			<View className="px-8">
				<Button text="Próximo" href="/(tabs)/post/description" />
				<Link
					className="text-center pt-4 text-red text-base"
					href="/(tabs)/post"
				>
					Cancelar
				</Link>
			</View>
		</View>
	);
}
