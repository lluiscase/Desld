import { Image, Text, View } from "react-native";
import imgDog from "../../../assets/Dog.png";

interface PerfilProps {
	name: string;
}

export function Pets({ name }: PerfilProps) {

	return (
		<View className="items-center">
			<Image
				source={imgDog}
				style={{ width: 80, height: 80, borderRadius: '50%'}}
			/>
			<Text className="mt-2">{name}</Text>
		</View>
	);
}

