import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Post } from "../../../src/components/Post";

export default function History() {
	const handleGoBack = () => {
		router.back();
	};

	return (
		<View className="flex-1 flex-col px-8 bg-white pt-24 pb-10">
			<View className="flex flex-row items-center">
				<TouchableOpacity className="mr-3" onPress={handleGoBack}>
					<MaterialIcons name={"arrow-back"} size={25} color="#000" />
				</TouchableOpacity>
				<Text className="text-4xl font-bold">Últimos Anúncios</Text>
			</View>
			<View className="mt-6 space-y-6">
				<Post situation="Perdido" name="Rex" type="Cachorro" time={4} />
				<Post situation="Abandonado" name="Rex" type="Gato" time={1} />
				<Post situation="Adocao" name="" type="Coelho" time={3} />
			</View>
		</View>
	);
}
