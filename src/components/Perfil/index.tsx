import { Image, View } from "react-native";
import User from "../../../assets/User.png";

export default function Perfil() {
	return (
		<View className="flex flex-col items-center">
			<Image
				source={User}
				style={{ width: 47, height: 47, borderRadius: 40 }}
			/>
		</View>
	);
}
