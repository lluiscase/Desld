import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WomanSunshade from "../../assets/womanSunshade.png";
import "@/shared/theme/global.css";
import { AppButton as Button, PaginationIndicator } from "@/shared/ui";

export default function Step4() {
	const insets = useSafeAreaInsets();
	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<View className="flex-1 bg-white">
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
					paddingTop: topPadding,
					paddingBottom: bottomPadding,
					paddingHorizontal: 16,
				}}
				showsVerticalScrollIndicator={false}
			>
				<Text className="font-ubuntu-bold text-[#42A5F5] text-3xl tracking-tight">
					{"Anuncie a doação e ajude um pet a achar um lar."}
				</Text>
				<View className="w-full items-center py-6">
					<Image source={WomanSunshade} resizeMode="contain" />
				</View>
				<View className="flex-col items-center justify-center gap-4">
					<Button text="Próximo" href="step5" />
					<PaginationIndicator position={3} />
					<Link
						className="font-ubuntu-medium text-center text-gray-500 py-2 active:opacity-70"
						href="/initial"
					>
						Pular tour
					</Link>
				</View>
			</ScrollView>
			<StatusBar style="dark" />
		</View>
	);
}
