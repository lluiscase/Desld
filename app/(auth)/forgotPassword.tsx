import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft, Mail } from "@/shared/icons";
import { AppButton, AppInput } from "@/shared/ui";
import Password from "../../assets/password.png";

export default function ForgotPasswordRoute() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = () => {
		if (email.trim().length > 0) {
			setIsSubmitted(true);
		}
	};

	return (
		<View className="flex-1 bg-blue-400">
			<View className="p-6 pt-12 pb-4">
				<View className="flex-row items-center">
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Voltar"
						onPress={() => router.back()}
						className="p-1 mr-2"
					>
						<ArrowLeft size={24} color="#FFFFFF" />
					</TouchableOpacity>
					<Text className="text-white text-3xl font-bold">
						Esqueceu a senha?
					</Text>
				</View>
				<Text className="text-white/80 pl-9 pt-1 text-sm font-semibold">
					Preencha seus dados para recuperação
				</Text>
			</View>

			<ScrollView
				className="flex-1 bg-white rounded-t-3xl px-6 pt-10"
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
					paddingBottom: 40,
				}}
				showsVerticalScrollIndicator={false}
			>
				<View className="items-center gap-6">
					<Image source={Password} resizeMode="contain" />

					<Text className="text-center text-lg text-gray-700 leading-6">
						{isSubmitted
							? `Enviamos as instruções de redefinição para:\n${email}`
							: "Digite seu e-mail cadastrado para receber as instruções de redefinição de senha."}
					</Text>

					{!isSubmitted ? (
						<AppInput
							label="E-mail"
							placeholder="Digite seu e-mail"
							keyboardType="email-address"
							autoCapitalize="none"
							value={email}
							onChangeText={setEmail}
							leftIcon={<Mail size={20} color="#767676" />}
						/>
					) : null}
				</View>

				<View className="pt-6">
					{!isSubmitted ? (
						<AppButton
							title="Enviar Link de Recuperação"
							onPress={handleSubmit}
						/>
					) : (
						<AppButton
							title="Voltar para o Login"
							variant="outline"
							onPress={() => router.replace("/(auth)/login")}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
