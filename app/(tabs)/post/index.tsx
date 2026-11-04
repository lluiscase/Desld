import { Link, useRouter } from "expo-router";
import {
	Image,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Clock } from "@/shared/icons";
import { AppButton } from "@/shared/ui";
import DogPost from "../../../assets/DogPost.png";

export default function PostRoute() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 px-6 py-4 justify-between">
				<View className="items-end">
					<Link href="/(tabs)/post/history" asChild>
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityLabel="Histórico de publicações"
							className="p-2"
						>
							<Clock size={28} color="#4A4A4A" />
						</TouchableOpacity>
					</Link>
				</View>

				<View className="items-center py-4">
					<Text className="font-bold text-3xl text-gray-900 text-center">
						Publicar um animalzinho?
					</Text>

					<Image
						source={DogPost}
						style={{ width: 260, height: 240 }}
						resizeMode="contain"
						className="my-6"
					/>

					<Text className="text-center text-base text-gray-600 leading-6 px-4">
						Compartilhe a localização de um animal em situação de
						vulnerabilidade e ajude a encontrar um lar seguro.
					</Text>
				</View>

				<View className="pb-4">
					<AppButton
						title="Divulgar Animal"
						onPress={() => router.push("/(tabs)/post/photo")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
