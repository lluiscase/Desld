import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PetPostCard, useUserPostsStore } from "@/entities/pet";
import { AppButton as Button } from "@/shared/ui";
import DogPost from "../../../assets/DogPost.png";

export default function Post() {
	const insets = useSafeAreaInsets();
	const posts = useUserPostsStore((state) => state.posts);

	// Tab Bar Flutuante (64px) + Offset Inferior + Respiro de 24px
	const floatingBarOffset = insets.bottom > 0 ? insets.bottom + 8 : 20;
	const tabClearance = 64 + floatingBarOffset + 24;
	const topPadding = insets.top > 0 ? insets.top + 8 : 16;

	const hasPosts = posts.length > 0;

	return (
		<View className="flex-1 bg-white">
			{hasPosts ? (
				// Estado Com Publicações: Cabeçalho alinhado à régua de 16px / Safe Area + Lista + Botão de ação
				<View className="flex-1">
					<View
						style={{ paddingTop: topPadding }}
						className="px-4 pb-3 bg-white"
					>
						<Text className="font-ubuntu-bold text-2xl text-gray-900">
							Minhas Publicações
						</Text>
					</View>

					<ScrollView
						contentContainerStyle={{
							paddingHorizontal: 16,
							paddingTop: 8,
							paddingBottom: tabClearance,
						}}
						showsVerticalScrollIndicator={false}
					>
						<View className="gap-3">
							{posts.map((post) => (
								<PetPostCard
									key={post.id}
									name={post.name}
									type={post.type}
									situation={post.situation}
									time={post.time}
									image={post.image}
								/>
							))}
						</View>

						<View className="pt-6">
							<Button text="Divulgar" href="/(tabs)/post/photo" />
						</View>
					</ScrollView>
				</View>
			) : (
				// Estado Vazio: Ilustração acolhedora centralizada + Texto explicativo + Botão principal "Divulgar"
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
					<View className="items-center py-6 mt-4">
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
			)}
			<StatusBar style="dark" />
		</View>
	);
}
