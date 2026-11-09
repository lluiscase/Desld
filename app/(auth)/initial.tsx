import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton as Button } from "@/shared/ui";
import WomanAndDog from "../../assets/womanAndDog.png";
import "@/shared/theme/global.css";

export default function Initial() {
	const insets = useSafeAreaInsets();

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<View className="flex-1 bg-white">
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
					alignItems: "center",
					paddingTop: topPadding,
					paddingBottom: bottomPadding,
					paddingHorizontal: 16,
				}}
				showsVerticalScrollIndicator={false}
			>
				<Text
					style={{ color: "#42A5F5" }}
					className="font-ubuntu-bold text-4xl tracking-tight"
				>
					AuHelp
				</Text>

				<View className="w-full items-center py-6">
					<Image source={WomanAndDog} resizeMode="contain" />
				</View>

				<View className="flex-col w-full items-center justify-center gap-4">
					<Button text="Entrar" href="/(auth)/login" />
					<Link
						className="font-ubuntu-bold text-center text-[#42A5F5] text-base py-2 active:opacity-70"
						href="/(auth)/register"
					>
						Registrar
					</Link>
					<View className="items-center pt-2">
						<Text className="font-ubuntu-regular text-xs text-gray-500 text-center">
							Ao fazer login você concorda com nossos
						</Text>
						<Text className="font-ubuntu-medium text-xs text-[#42A5F5] text-center">
							Termos e Condições e Política de Privacidade
						</Text>
					</View>
				</View>
			</ScrollView>
			<StatusBar style="dark" />
		</View>
	);
}
