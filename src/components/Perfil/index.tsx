import { useRouter } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import User from "../../../assets/User.png";

interface PerfilProps {
	x: number;
}


export default function Perfil({x}:PerfilProps) {
	const router = useRouter();
	const handlePress = () => {
		router.push("/user");
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="flex flex-col items-center"
		>
			<Image
				source={User}
				style={{ width: x, height: x, borderRadius: 40 }}
			/>
		</TouchableOpacity>
	);
}
