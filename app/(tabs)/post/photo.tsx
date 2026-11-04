import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { RescueDetailsForm } from "@/features/create-rescue-report";
import { AiTriageAssistant } from "@/features/pet-triage-ai";
import { ArrowLeft } from "@/shared/icons";

export default function PostPhotoRoute() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="px-5 pt-3 pb-2 flex-row items-center border-b border-gray-100">
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Voltar"
					onPress={() => router.back()}
					className="p-1 mr-2"
				>
					<ArrowLeft size={24} color="#42A5F5" />
				</TouchableOpacity>
				<Text className="text-xl font-bold text-gray-900">
					Cadastrar Animal
				</Text>
			</View>

			<View className="flex-1 px-5 pt-4">
				<RescueDetailsForm
					renderAiAssistant={({ images, applySuggestion }) => (
						<AiTriageAssistant
							imageUri={images[0]}
							onApplySuggestion={applySuggestion}
						/>
					)}
					onSubmitSuccess={() => {
						router.push({
							pathname: "/(tabs)/post/preVisulation",
							params: { id: "pet_1" },
						});
					}}
					onCancel={() => router.back()}
				/>
			</View>
		</SafeAreaView>
	);
}
