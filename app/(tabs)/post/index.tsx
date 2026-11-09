import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppButton as Button } from "@/shared/ui";
import DogPost from "../../../assets/DogPost.png";

export default function Post() {
	const insets = useSafeAreaInsets();

	// Tab Bar Flutuante (64px) + Offset Inferior + Respiro de 24px
	const floatingBarOffset = insets.bottom > 0 ? insets.bottom + 8 : 20;
	const tabClearance = 64 + floatingBarOffset + 24;
	const topPadding = insets.top > 0 ? insets.top + 8 : 16;

	return (
		<View className="flex-1 bg-white">
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
					paddingTop: topPadding,
					paddingBottom: tabClearance,
					paddingHorizontal: 16,
				}}
				showsVerticalScrollIndicator={false}
			>
				<View className="items-end pb-2">
					<Link href="/(tabs)/post/history">
						<MaterialIcons name="history" size={32} color={"#4A4A4A"} />
					</Link>
				</View>

				<View className="items-center py-4">
					<Text className="font-ubuntu-bold text-2xl text-center text-gray-900 mb-6">
						Publicar um animalzinho?
					</Text>
					<Image
						source={DogPost}
						style={{ width: 280, height: 264 }}
						resizeMode="contain"
					/>
					<Text className="font-ubuntu-regular text-center text-base text-gray-600 mt-6 leading-6">
						{
							"Compartilhe a localização de um animal\nem situação de vulnerabilidade\ne ajude a encontrar um lar seguro."
						}
					</Text>
				</View>

				<Button text="Divulgar" href="/(tabs)/post/photo" />
			</ScrollView>
			<StatusBar style="dark" />
		</View>
	);
}
