import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CatsWelcome from "../../assets/catsWelcome.png";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import { useAuth } from "../../src/context/authContext";

export default function Register() {
	const router = useRouter();
	const { signUp } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRerun, setPasswordRerun] = useState("");
	const [errors, setErrors] = useState<{
		name?: string;
		email?: string;
		password?: string;
		passwordRerun?: string;
	}>({});
	const [loading, setLoading] = useState(false);

	const handleRegister = async () => {
		setErrors({});
		let hasError = false;

		if (!name) {
			setErrors((prev) => ({ ...prev, name: "Nome é obrigatório" }));
			hasError = true;
		}

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

		if (password !== passwordRerun) {
			setErrors((prev) => ({
				...prev,
				passwordRerun: "As senhas não coincidem",
			}));
			hasError = true;
		}

		if (hasError) {
			return;
		}

		setLoading(true);
		try {
			await signUp(name, email, password);
		} catch (error) {
			setErrors({
				email: "Ocorreu um erro ao criar a conta.",
			});
		} finally {
			setLoading(false);
		}
	};

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
				<View className="w-full">
					<Input
						inputType="name"
						showLabel
						value={name}
						onChangeText={setName}
						error={errors.name}
					/>
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
					<Input
						inputType="passwordRerun"
						showLabel
						value={passwordRerun}
						onChangeText={setPasswordRerun}
						error={errors.passwordRerun}
					/>
				</View>
				<Button
					text="Criar conta"
					onPress={handleRegister}
					disabled={loading}
				/>
			</View>
		</View>
	);
}
