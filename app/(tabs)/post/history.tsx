import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { PetPostCard as Post, useUserPostsStore } from "@/entities/pet";

export default function History() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const posts = useUserPostsStore((state) => state.posts);

	const handleGoBack = () => {
		router.back();
	};

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<View className="flex-1 bg-white">
			{/* Header Fixo no Topo com Safe Area */}
			<View
				style={{ paddingTop: topPadding }}
				className="px-4 pb-4 flex-row items-center justify-between bg-white z-10"
			>
				<TouchableOpacity
					className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-gray-100"
					onPress={handleGoBack}
					accessibilityRole="button"
					accessibilityLabel="Voltar"
				>
					<MaterialIcons name="arrow-back" size={26} color="#1F2937" />
				</TouchableOpacity>
				<Text className="font-ubuntu-bold text-2xl text-gray-900 text-center flex-1">
					Últimos Anúncios
				</Text>
				<View className="w-10" />
			</View>

			{/* Lista Rolável sob o Header Fixo */}
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingTop: 16,
					paddingBottom: bottomPadding,
				}}
				showsVerticalScrollIndicator={false}
			>
				<View className="gap-4">
					{posts.map((post) => (
						<Post
							key={post.id}
							situation={post.situation}
							name={post.name}
							type={post.type}
							time={post.time}
							image={post.image}
						/>
					))}
				</View>
			</ScrollView>

			<StatusBar style="dark" />
		</View>
	);
}
