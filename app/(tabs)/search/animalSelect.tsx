import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, SafeAreaView, Text } from "react-native";
import { usePetDetailsQuery } from "@/entities/pet";
import { PetRescueReview } from "@/widgets/PetRescueReview";

export default function AnimalSelectRoute() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id?: string }>();
	const { data: pet, isLoading } = usePetDetailsQuery(id);

	if (isLoading || !pet) {
		return (
			<SafeAreaView className="flex-1 bg-white items-center justify-center">
				<ActivityIndicator size="large" color="#42A5F5" />
				<Text className="mt-2 text-gray-500 text-sm">
					Carregando detalhes do pet...
				</Text>
			</SafeAreaView>
		);
	}

	const handleAction = () => {
		Alert.alert(
			"Apoiar Resgate",
			`Você demonstrou interesse em ajudar ${pet.name || "este animalzinho"}. Entraremos em contato com o protetor responsável!`,
			[{ text: "OK", onPress: () => router.back() }],
		);
	};

	return (
		<PetRescueReview
			pet={pet}
			actionButtonTitle="Quero Ajudar / Adotar"
			onActionPress={handleAction}
			onBackPress={() => router.back()}
			onSharePress={() =>
				Alert.alert(
					"Compartilhar",
					`Link para ajudar ${pet.name || "este pet"} copiado!`,
				)
			}
		/>
	);
}
