import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LoginForm } from "@/features/auth-by-email";
import { ArrowLeft } from "@/shared/icons";
import CatsWelcome from "../../assets/catsWelcome.png";

export default function LoginRoute() {
	const router = useRouter();

	return (
		<ScrollView
			className="flex-1 bg-white"
			contentContainerStyle={{
				flexGrow: 1,
				paddingHorizontal: 24,
				paddingTop: 48,
				paddingBottom: 32,
				justifyContent: "space-between",
			}}
			showsVerticalScrollIndicator={false}
		>
			<View className="gap-6">
				<View className="flex-row items-center">
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Voltar"
						onPress={() => router.back()}
						className="p-1 mr-2"
					>
						<ArrowLeft size={24} color="#42A5F5" />
					</TouchableOpacity>
					<Text className="text-blue-400 text-3xl font-bold">
						Bem-vindo de volta
					</Text>
				</View>

				<View className="items-center py-2">
					<Image source={CatsWelcome} resizeMode="contain" />
				</View>

				<LoginForm
					onSuccess={() => router.replace("/(tabs)/home")}
					onForgotPasswordPress={() => router.push("/(auth)/forgotPassword")}
					onRegisterPress={() => router.push("/(auth)/register")}
				/>
			</View>
		</ScrollView>
	);
}
