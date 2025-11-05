import { Image, Text, View } from "react-native";
import Lampad from "../../../assets/Lampad.png";

export function Dicas() {
	return (
		<View className="flex flex-col items-center">
			<Image
				source={Lampad}
				style={{ width: 106, height: 216, borderRadius: 10 }}
			/>
			<Text className="text-xs pt-2">Cuidados e higiene</Text>
		</View>
	);
}
