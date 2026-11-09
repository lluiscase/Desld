import { StatusBar } from "expo-status-bar";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { usePetDetailsQuery } from "@/entities/pet";
import { AdConfirmationModal as AdConfirmationModalTailwind } from "@/features/create-rescue-report";
import {
	AppButton as Button,
	ImageCarousel as Carousel,
	TextArea,
} from "@/shared/ui";

export default function PreVisulation() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { id } = useLocalSearchParams<{ id?: string }>();
	const { data: pet } = usePetDetailsQuery(id);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const NEXT_PAGE = "/(tabs)/post";

	const handleGoBack = () => {
		router.back();
	};

	const handleNextPress = () => {
		setIsModalVisible(true);
	};

	const handleModalContinue = () => {
		setIsModalVisible(false);
		router.push(NEXT_PAGE as any);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
	};

	const petName = pet?.name || "Rex";
	const petStatus =
		pet?.status === "street"
			? "Na rua"
			: pet?.status === "rescued"
				? "Resgatado"
				: "Perdido";
	const petSpecies = pet?.tags.includes("cat") ? "Gato" : "Cachorro";
	const petLocation = pet?.location || "Rua das Flores, Centro";
	const petDays = pet?.daysCount ? `${pet.daysCount} dias!` : "5 dias!";

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<View className="flex-1 bg-white">
			<ScrollView
				contentContainerStyle={{
					paddingTop: topPadding,
					paddingBottom: bottomPadding,
				}}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				{/* Header Simétrico */}
				<View className="px-4 pb-4 flex-row items-center justify-between">
					<TouchableOpacity
						className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-gray-100"
						onPress={handleGoBack}
						accessibilityRole="button"
						accessibilityLabel="Voltar"
					>
						<MaterialIcons name="arrow-back" size={26} color="#1F2937" />
					</TouchableOpacity>
					<Text className="font-ubuntu-bold text-2xl text-gray-900 text-center flex-1">
						Pré-visualização
					</Text>
					<View className="w-10" />
				</View>

				{/* Carrossel de Fotos */}
				<Carousel />

				{/* Informações do Anúncio (Grid de 8 Pontos - px-4) */}
				<View className="px-4 pt-6">
					{/* Nome e Badge de Status */}
					<View className="flex-row items-center justify-between">
						<View className="flex-row items-center gap-2">
							<Text className="font-ubuntu-bold text-2xl text-gray-900 uppercase tracking-tight">
								{petName}
							</Text>
							<MaterialIcons name="edit" size={20} color="#767676" />
						</View>
						<View className="bg-red-50 border border-red-200 px-3 py-1 rounded-full">
							<Text className="font-ubuntu-bold text-xs text-red-600 uppercase">
								{petStatus}
							</Text>
						</View>
					</View>

					{/* Espécie */}
					<View className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full self-start mt-2">
						<Text className="font-ubuntu-medium text-xs text-[#0D47A1]">
							{petSpecies}
						</Text>
					</View>

					{/* Bloco de Descrição */}
					<View className="my-6">
						<View className="flex-row items-center gap-1 mb-2">
							<Text className="font-ubuntu-bold text-base text-gray-800">
								Descrição:
							</Text>
							<MaterialIcons name="edit" size={18} color="#767676" />
						</View>
						<TextArea />
					</View>

					{/* Informações de Local e Contato */}
					<View className="gap-3 pb-8">
						<View className="flex-row items-center gap-2">
							<MaterialIcons name="location-on" size={22} color="#42A5F5" />
							<Text className="font-ubuntu-regular text-sm text-gray-700 flex-1">
								{petLocation}
							</Text>
							<MaterialIcons name="edit" size={18} color="#767676" />
						</View>
						<View className="flex-row items-center gap-2">
							<MaterialIcons name="event" size={22} color="#42A5F5" />
							<Text className="font-ubuntu-regular text-sm text-gray-700">
								Perdido(a) há{" "}
							</Text>
							<Text className="font-ubuntu-bold text-sm text-red-500">
								{petDays}
							</Text>
							<MaterialIcons name="notifications" size={18} color="#EF5350" />
							<MaterialIcons name="edit" size={18} color="#767676" />
						</View>
						<View className="flex-row items-center gap-2">
							<MaterialIcons name="person" size={22} color="#42A5F5" />
							<Text className="font-ubuntu-regular text-sm text-gray-700 flex-1">
								Reportado por Maria Silva
							</Text>
							<MaterialIcons name="edit" size={18} color="#767676" />
						</View>
						<View className="flex-row items-center gap-2">
							<MaterialIcons name="call" size={22} color="#42A5F5" />
							<Text className="font-ubuntu-regular text-sm text-gray-700 flex-1">
								11 90000-0000
							</Text>
							<MaterialIcons name="edit" size={18} color="#767676" />
						</View>
					</View>

					{/* Ações com Respiro de 32px */}
					<View className="pt-2">
						<Button text="Próximo" onPress={handleNextPress} />
						<Link href="/(tabs)/post" asChild>
							<TouchableOpacity
								activeOpacity={0.7}
								className="w-full items-center justify-center pt-4 pb-2"
								accessibilityRole="button"
								accessibilityLabel="Cancelar anúncio"
							>
								<Text
									style={{ color: "#EF5350" }}
									className="font-ubuntu-medium text-base text-center"
								>
									Cancelar
								</Text>
							</TouchableOpacity>
						</Link>
					</View>
				</View>
			</ScrollView>

			<AdConfirmationModalTailwind
				isVisible={isModalVisible}
				onContinue={handleModalContinue}
				onClose={handleModalClose}
			/>
			<StatusBar style="dark" />
		</View>
	);
}
