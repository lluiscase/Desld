import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoginForm } from "@/features/auth-by-email";
import CatsWelcome from "../../assets/catsWelcome.png";

export default function Login() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const topPadding = insets.top > 0 ? insets.top + 16 : 24;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			className="flex-1 bg-white"
		>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					paddingHorizontal: 24,
					paddingTop: topPadding,
					paddingBottom: bottomPadding,
				}}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<View className="w-full max-w-[420px] self-center items-center">
					<View className="w-full items-center mb-8">
						<Image source={CatsWelcome} resizeMode="contain" />
					</View>

					<View className="w-full">
						<LoginForm
							onSuccess={() => router.replace("/(tabs)/home")}
							onForgotPasswordPress={() =>
								router.push("/(auth)/forgotPassword")
							}
							onRegisterPress={() => router.push("/(auth)/register")}
						/>
					</View>
				</View>
			</ScrollView>

			<StatusBar style="dark" />
		</KeyboardAvoidingView>
	);
}
