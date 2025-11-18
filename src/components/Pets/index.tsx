import { router } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import imgDog from "../../../assets/Dog.png";

interface PerfilProps {
	name: string;
}

export default function Pets({ name }: PerfilProps) {
  const home = "home"
	const handlePress = () => {
		router.push({ pathname: "/search/animalSelect", params: {home} });
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="flex flex-col items-center"
		>
			<Image
				source={imgDog}
				style={{ width: 80, height: 80, borderRadius: 40 }}
			/>
			<Text className="mt-2">{name}</Text>
		</TouchableOpacity>
	);
}
