import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "../../src/styles/global.css";

export default function Home() {
	return (
		<View className="flex-1 flex flex-col px-8 pb-8 bg-white pt-24 justify-between">
			<Text className="text-blue-400 text-4xl font-bold">page home</Text>
			<Link className="w-18 text-center" href="/initial">
				Pular tour
			</Link>
			<StatusBar style="auto" />
		</View>
	);
}
