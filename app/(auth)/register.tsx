import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RegisterForm } from "@/features/auth-by-email";
import { ArrowLeft } from "@/shared/icons";
import CatsWelcome from "../../assets/catsWelcome.png";

export default function RegisterRoute() {
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
						Crie sua conta
					</Text>
				</View>

				<View className="items-center py-1">
					<Image source={CatsWelcome} resizeMode="contain" />
				</View>

				<RegisterForm
					onSuccess={() => router.replace("/(tabs)/home")}
					onLoginPress={() => router.push("/(auth)/login")}
				/>
			</View>
		</ScrollView>
	);
}
