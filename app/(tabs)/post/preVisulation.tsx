import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, SafeAreaView, Text } from "react-native";
import { usePetDetailsQuery } from "@/entities/pet";
import { PetRescueReview } from "@/widgets/PetRescueReview";

export default function PreVisulationRoute() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id?: string }>();
	const { data: pet, isLoading } = usePetDetailsQuery(id);

	if (isLoading || !pet) {
		return (
			<SafeAreaView className="flex-1 bg-white items-center justify-center">
				<ActivityIndicator size="large" color="#42A5F5" />
				<Text className="mt-2 text-gray-500 text-sm">
					Carregando prévia do resgate...
				</Text>
			</SafeAreaView>
		);
	}

	const handleConfirmPublish = () => {
		Alert.alert(
			"Publicação Confirmada!",
			"O alerta do animalzinho foi publicado no feed com sucesso.",
			[{ text: "Concluir", onPress: () => router.replace("/(tabs)/home") }],
		);
	};

	return (
		<PetRescueReview
			pet={pet}
			actionButtonTitle="Confirmar e Publicar Alerta"
			onActionPress={handleConfirmPublish}
			onBackPress={() => router.back()}
			onSharePress={() =>
				Alert.alert("Prévia", "Esta é uma prévia antes da publicação.")
			}
		/>
	);
}
