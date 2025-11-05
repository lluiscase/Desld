import { Image, View } from "react-native";
import User from "../../../assets/User.png";

export function Perfil() {
	return (
		<View className="flex flex-col items-center">
			<Image
				source={User}
				style={{ width: 47, height: 47, borderRadius: "50%" }}
			/>
		</View>
	);
}
