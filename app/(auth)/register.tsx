import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
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
import { RegisterForm } from "@/features/auth-by-email";
import CatsWelcome from "../../assets/catsWelcome.png";

export default function Register() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

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
					<Text className="font-ubuntu-bold text-3xl text-white">Criar conta</Text>
				</View>
			</View>

			{/* Conteúdo Branco com ScrollView */}
			<View className="flex-1 bg-white rounded-t-3xl overflow-hidden">
				<ScrollView
					contentContainerStyle={{
						paddingHorizontal: 16,
						paddingTop: 20,
						paddingBottom: bottomPadding,
					}}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<View className="w-full items-center mb-4">
						<Image source={CatsWelcome} resizeMode="contain" />
					</View>

					<View className="w-full max-w-[420px] self-center pb-6">
						<RegisterForm onSuccess={() => router.replace("/(tabs)/home")} />
					</View>
				</ScrollView>
			</View>

			<StatusBar style="light" />
		</KeyboardAvoidingView>
	);
}
