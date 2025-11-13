import { Link, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Cat from "../../../assets/Cat.png";
import Button from "../../../src/components/Button";
import InputSearch from "../../../src/components/Search";

const handleGoBack = () => {
	router.back();
};

export default function TypeAnimal() {
	return (
		<View className="flex-1 flex-col px-8 bg-white pt-24 pb-16 justify-between">
			<View>
				<View className="flex flex-row items-center">
					<TouchableOpacity className="mr-3" onPress={handleGoBack}>
						<MaterialIcons name={"arrow-back"} size={25} color="#000" />
					</TouchableOpacity>
					<Text className="text-3xl font-bold">Qual é o animalzinho ?</Text>
				</View>
				<View className="pt-12">
					<InputSearch placeholder="Selecione qual animal" />
				</View>
				<View className="items-center pt-28">
					<Image source={Cat} />
				</View>
			</View>
			<View>
				<Button text="Próximo" href="/(tabs)/post/situation" />
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
