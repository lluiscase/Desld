import { Image, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DogPost from "../../../assets/DogPost.png";
import { Button } from "../../../src/components/Button";

export default function Post() {
	return (
		<View className="flex-1 flex-col px-8 bg-white pt-24 pb-10 justify-between">
			<MaterialIcons
				className="text-end"
				name="history"
				size={34}
				color={"#4A4A4A"}
			/>
			<Text className="font-bold text-2xl text-center">
				Publicar um animalzinho ?
			</Text>
			<View className="items-center py-12">
				<Image source={DogPost} style={{ width: 281, height: 265 }} />
				<Text className="text-center text-base mt-10">
					{
						"Compartilhe a localização de um animal\nem situação de vulnerabilidade\ne ajude a encontrar um lar seguro."
					}
				</Text>
			</View>
			<Button text="Divulgar" href="/(tabs)/post/photo"/>
		</View>
	);
}
