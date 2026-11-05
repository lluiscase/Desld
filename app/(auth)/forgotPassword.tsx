import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Password from "../../assets/password.png";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";

export default function ForgotPassword() {
	const router = useRouter();
	const [email, setEmail] = useState("");

	const handleGoBack = () => {
		router.back();
	};

	return (
		<View className="flex-1 flex flex-col bg-blue-400 ">
			<View className="flex flex-col justify-end p-8 pb-4 h-[174px]">
				<View className="flex flex-row items-center">
					<TouchableOpacity className="mr-3" onPress={handleGoBack}>
						<MaterialIcons name={"arrow-back"} size={25} color="#fff" />
					</TouchableOpacity>
					<Text className="text-white text-4xl font-bold">
						Esqueceu a senha?
					</Text>
				</View>
				<Text className="text-white opacity-2 pl-10 pt-2 text-base font-bold">
					Preencha seus dados
				</Text>
			</View>
			<View className="flex-1 flex flex-col justify-between items-center bg-white px-8 pt-[80px] pb-[125px] rounded-t-3xl">
				<Image source={Password} />
				<Text className="text-center text-xl">
					{"Digite seu e-mail para\nreceber um link de redefinição."}
				</Text>
				<View className="w-full">
					<Input inputType="email" value={email} onChangeText={setEmail} />
				</View>
				<Button text="Enviar" href="/login" />
			</View>
		</View>
	);
}
