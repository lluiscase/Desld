import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RegisterForm } from "@/features/auth-by-email";
import CatsWelcome from "../../assets/catsWelcome.png";

export default function Register() {
	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};

	return (
		<View className="flex-1 flex flex-col bg-blue-400">
			<View className="flex flex-col justify-end p-8 h-[174px]">
				<View className="flex flex-row items-center">
					<TouchableOpacity className="mr-3" onPress={handleGoBack}>
						<MaterialIcons name={"arrow-back"} size={25} color="#fff" />
					</TouchableOpacity>
					<Text className="text-white text-4xl font-bold">Criar conta</Text>
				</View>
			</View>
			<View className="flex-1 flex flex-col justify-between items-center bg-white p-8 rounded-t-3xl">
				<Image source={CatsWelcome} />
				<RegisterForm onSuccess={() => router.replace("/(tabs)/home")} />
			</View>
		</View>
	);
}
