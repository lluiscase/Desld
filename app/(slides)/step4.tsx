import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import WomanSunshade from "../../assets/womanSunshade.png";
import { Button } from "../../src/components/Button";
import PaginationIndicator from "../../src/components/PaginationIndicator";
import "../../src/styles/global.css";

export default function Step4() {
	return (
		<View className="flex-1 flex flex-col px-8 pb-8 bg-white pt-24 justify-between">
			<Text className="text-blue-400 text-4xl font-bold">
				{"Anuncie a doação\ne ajude um pet\na achar um lar."}
			</Text>
			<View className="w-full items-center">
				<Image source={WomanSunshade} />
			</View>
			<View className="flex flex-col items-center justify-center gap-6">
				<Button text="Próximo" href="step5" />
				<PaginationIndicator position={3} />
				<Link className="w-18 text-center" href="/initial">
					Pular tour
				</Link>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}
