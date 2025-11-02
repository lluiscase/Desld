import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import WomanAndDog from "../../assets/womanAndDog.png";
import { Button } from "../../src/components/Button";
import "../../src/styles/global.css";

export default function Initial() {
	return (
		<View className="flex-1 flex flex-col px-8 pb-8 bg-white pt-24 justify-between items-center">
			<Text className="text-blue-400 text-4xl font-bold">AuHelp</Text>
			<View className="w-full items-center">
				<Image source={WomanAndDog} />
			</View>
			<View className="flex flex-col w-full items-center justify-center gap-6">
				<Button text="Entrar" href="/login" />
				<Link className="w-18 text-center text-blue-400" href="/register">
					Registrar
				</Link>
				<View>
					<Text className="text-blue-400">Ao fazer login voce concorda com nossos</Text>
					<Text>Temos e Condiçoes e Politica de Privacidade</Text>
				</View>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}
