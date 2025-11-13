// app/(auth)/login.tsx

import { Link, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CatsWelcome from "../../assets/catsWelcome.png";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import { useAuth } from "../../src/context/authContext";

export default function Login() {
	const { signIn } = useAuth();

	const handleLogin = async () => {
		await signIn("some_auth_token_from_server");
	};

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
			<View>
				<Input inputType="email" showLabel />
				<Input inputType="password" showLabel />
				<Link href={"/forgotPassword"} className="mt-2 text-blue-400 text-end">Esqueci a senha</Link>
			</View>
			<Button text="Entrar" onPress={handleLogin} />
		</View>
	);
}
