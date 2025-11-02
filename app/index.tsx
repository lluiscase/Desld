import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import DogAndGirl from "../assets/dogandgirl.png";
import { Button } from "../src/components/Button";
import PaginationIndicator from "../src/components/PaginationIndicator";
import "../src/styles/global.css";

export default function Home() {
	return (
		<View className="flex-1 flex flex-col px-8 pb-8 bg-white pt-24 justify-between">
			<Text className="text-blue-400 text-4xl font-bold">
				AuHelp te ajuda a resgatar animais no conforto de sua casa.
			</Text>
			<View className="w-full items-center">
				<Image source={DogAndGirl} />
			</View>
			<View className="flex flex-col items-center justify-center gap-6">
				<Button text="Próximo" href="step2" />
				<PaginationIndicator position={0} />
				<Link className="w-18 text-center" href="/initial">Pular tour</Link>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}
