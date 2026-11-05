import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import WomanCard from "../../assets/womanCard.png";
import "@/shared/theme/global.css";
import { AppButton as Button, PaginationIndicator } from "@/shared/ui";

export default function Step2() {
	return (
		<View className="flex-1 flex flex-col px-8 pb-8 bg-white pt-24 justify-between">
			<Text className="text-blue-400 text-4xl font-bold">
				<Text className="text-red text-4xl font-bold">Reporte</Text>
				{" animais \nem riscos com \napenas um clique."}
			</Text>
			<View className="w-full items-center">
				<Image source={WomanCard} />
			</View>
			<View className="flex flex-col items-center justify-center gap-6">
				<Button text="Próximo" href="step3" />
				<PaginationIndicator position={1} />
				<Link className="w-18 text-center" href="/initial">
					Pular tour
				</Link>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}
