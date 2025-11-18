import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import Banner from "../../assets/Banner.png";
import Dicas from "../../src/components/Dicas";
import Perfil from "../../src/components/Perfil";
import Pets from "../../src/components/Pets";
import "../../src/styles/global.css";

export default function Home() {
	return (
		<View className="flex-1 flex-col px-8 bg-white pt-24">
			<View className="flex-row justify-between itmems-center mb-6">
				<Text className="text-blue-400 text-4xl font-bold">AuHelp</Text>
				<Perfil x={47}/>
			</View>
			<ScrollView showsHorizontalScrollIndicator={false}>
				<Image
					source={Banner}
					style={{ width: "100%", height: undefined, aspectRatio: 376 / 177, borderRadius: 5, resizeMode: 'contain' }}
				/>
				<View className="w-full h-px bg-blue-400 my-6" />
				<Text className="text-base font-semibold mb-6">
					Perdidos recentimente
				</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerClassName="flex-row gap-6"
					className="flex-grow-0"
				>
					<Pets name="Rex" />
					<Pets name="Mago" />
					<Pets name="Bravesa" />
					<Pets name="Bravesa" />
					<Pets name="Bravesa" />
					<Pets name="Bravesa" />
				</ScrollView>
				<Text className="text-base font-semibold my-6">Aprenda</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerClassName="flex-row gap-4"
					className="flex-grow-0"
				>
					<Dicas />
					<Dicas />
					<Dicas />
					<Dicas />
					<Dicas />
				</ScrollView>
				<Text className="text-base font-semibold my-6">
					Animaizinhos em riscos
				</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerClassName="flex-row gap-6"
					className="flex-grow-0"
				>
					<Pets name="Rex" />
					<Pets name="Mago" />
					<Pets name="Bravesa" />
					<Pets name="Bravesa" />
					<Pets name="Bravesa" />
					<Pets name="Bravesa" />
				</ScrollView>
				<StatusBar style="auto" />
			</ScrollView>
		</View>
	);
}
