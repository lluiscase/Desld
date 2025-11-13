import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CatsWelcome from "../../assets/catsWelcome.png";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import { useAuth } from "../../src/context/authContext";

export default function Login() {
	const { signIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		setErrors({});
		let hasError = false;

		if (!email) {
			setErrors((prev) => ({ ...prev, email: "Email é obrigatório" }));
			hasError = true;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setErrors((prev) => ({ ...prev, email: "Email inválido" }));
			hasError = true;
		}

		if (!password) {
			setErrors((prev) => ({ ...prev, password: "Senha é obrigatória" }));
			hasError = true;
		}

		if (hasError) {
			return;
		}

		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await signIn("some_auth_token_from_server");
		} catch (error) {
			setErrors({
				email: "Email ou senha inválidos",
				password: "Email ou senha inválidos",
			});
		} finally {
			setLoading(false);
		}
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
				<Input
					inputType="email"
					showLabel
					value={email}
					onChangeText={setEmail}
					error={errors.email}
				/>
				<Input
					inputType="password"
					showLabel
					value={password}
					onChangeText={setPassword}
					error={errors.password}
				/>
				<Link href={"/forgotPassword"} className="mt-2 text-blue-400 text-end">
					Esqueci a senha
				</Link>
			</View>
			<Button text="Entrar" onPress={handleLogin} disabled={loading} />
		</View>
	);
}
