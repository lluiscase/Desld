import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LoginForm } from "@/features/auth-by-email";
import CatsWelcome from "../../assets/catsWelcome.png";

export default function Login() {
	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};

	return (
		<View className="flex-1 flex flex-col px-8 pb-[125px] bg-white pt-24 justify-between">
			<View className="flex flex-row items-center">
				<TouchableOpacity className="mr-3" onPress={handleGoBack}>
					<MaterialIcons name={"arrow-back"} size={25} color="#42A5F5" />
				</TouchableOpacity>
				<Text className="text-blue-400 text-4xl font-bold">
					Bem vindo de volta
				</Text>
			</View>
			<View className="w-full items-center">
				<Image source={CatsWelcome} />
			</View>
			<LoginForm
				onSuccess={() => router.replace("/(tabs)/home")}
				onForgotPasswordPress={() => router.push("/(auth)/forgotPassword")}
			/>
		</View>
	);
}
