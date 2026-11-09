import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppButton as Button, AppInput as Input } from "@/shared/ui";
import Password from "../../assets/password.png";

export default function ForgotPassword() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const [email, setEmail] = useState("");

	const handleGoBack = () => {
		router.back();
	};

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			className="flex-1 bg-[#42A5F5]"
		>
			{/* Topo Azul com Safe Area */}
			<View
				style={{ paddingTop: topPadding }}
				className="px-4 pb-6"
			>
				<View className="flex-row items-center gap-2">
					<TouchableOpacity
						className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-white/10"
						onPress={handleGoBack}
						accessibilityRole="button"
						accessibilityLabel="Voltar"
					>
						<MaterialIcons name="arrow-back" size={26} color="#FFFFFF" />
					</TouchableOpacity>
					<Text className="font-ubuntu-bold text-3xl text-white">
						Esqueceu a senha?
					</Text>
				</View>
				<Text className="font-ubuntu-medium text-white/90 pl-10 pt-1 text-sm">
					Preencha seus dados para recuperar o acesso
				</Text>
			</View>

			{/* Conteúdo Branco com ScrollView */}
			<View className="flex-1 bg-white rounded-t-3xl overflow-hidden">
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "space-between",
						paddingHorizontal: 16,
						paddingTop: 32,
						paddingBottom: bottomPadding,
					}}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<View className="w-full items-center">
						<Image source={Password} resizeMode="contain" />
						<Text className="font-ubuntu-regular text-center text-lg text-gray-700 mt-6 leading-7">
							{"Digite seu e-mail para\nreceber um link de redefinição."}
						</Text>
					</View>

					<View className="w-full py-6">
						<Input
							inputType="email"
							placeholder="Digite seu e-mail"
							value={email}
							onChangeText={setEmail}
						/>
					</View>

					<Button text="Enviar" href="/(auth)/login" />
				</ScrollView>
			</View>

			<StatusBar style="light" />
		</KeyboardAvoidingView>
	);
}
