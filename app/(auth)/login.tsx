import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CatsWelcome from "../../assets/catsWelcome.png";
import { Button } from "../../src/components/Button";
import { Input } from "../../src/components/Input";

export default function Login() {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
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
				<Text className="mt-2 text-blue-400 text-end">Esqueci a senha</Text>
			</View>
			<Button text="Entrar" href="/home" />
		</View>
	);
}
