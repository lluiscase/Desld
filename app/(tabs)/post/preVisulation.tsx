import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { usePetDetailsQuery } from "@/entities/pet";
import Button from "../../../src/components/Button";
import Carousel from "../../../src/components/Carousel";
import AdConfirmationModalTailwind from "../../../src/components/Modals/AdModal";
import TextArea from "../../../src/components/TextArea";

export default function PreVisulation() {
	const router = useRouter();
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

	const petName = pet?.name || "rex";
	const petStatus =
		pet?.status === "street"
			? "Na rua"
			: pet?.status === "rescued"
				? "Resgatado"
				: "Perdido";
	const petSpecies = pet?.tags.includes("cat") ? "Gato" : "Cachorro";
	const petLocation = pet?.location || "Rua das Flores, Centro";
	const petDays = pet?.daysCount ? `${pet.daysCount} dias!` : "5 dias!";

	return (
		<View className="flex-1">
			<View className="p-8">
				<TouchableOpacity className="mr-3" onPress={handleGoBack}>
					<MaterialIcons name={"arrow-back"} size={25} color="#000" />
				</TouchableOpacity>
			</View>
			<Carousel />
			<View className="p-8">
				<View className="flex-row justify-between">
					<View className="flex-row items-center justify-center gap-1">
						<Text className="uppercase text-xl font-bold">{petName}</Text>
						<MaterialIcons name={"edit"} size={25} color="#767676" />
					</View>
					<Text className="bg-red p-2 rounded-xl border text-white border-gray-500">
						{petStatus}
					</Text>
				</View>
				<View>
					<Text className="bg-blue-200 text-gray-500 flex justify-center items-center rounded-3xl w-20">
						{petSpecies}
					</Text>
				</View>
				<View className="my-2">
					<View className="flex-row items-center gap-1">
						<Text className="text-base font-semibold">Descrição:</Text>
						<MaterialIcons name={"edit"} size={25} color="#767676" />
					</View>
					<TextArea />
				</View>
				<View className="gap-2 pb-8">
					<View className="flex-row items-center gap-1">
						<MaterialIcons name={"location-on"} size={25} color="#000" />
						<Text className="text-base">{petLocation}</Text>
						<MaterialIcons name={"edit"} size={25} color="#767676" />
					</View>
					<View className="flex-row items-center gap-1">
						<MaterialIcons name={"event"} size={25} color="#000" />
						<Text className="text-base">Perdido(a) há </Text>
						<Text className="text-red text-base">{petDays}</Text>
						<MaterialIcons name={"notifications"} size={25} color="#EF5350" />
						<MaterialIcons name={"edit"} size={25} color="#767676" />
					</View>
					<View className="flex-row items-center gap-1">
						<MaterialIcons name={"person"} size={25} color="#000" />
						<Text className="text-base">Reportado por Maria Silva</Text>
						<MaterialIcons name={"edit"} size={25} color="#767676" />
					</View>
					<View className="flex-row items-center gap-1">
						<MaterialIcons name={"call"} size={25} color="#000" />
						<Text className="text-base">11 90000-0000</Text>
						<MaterialIcons name={"edit"} size={25} color="#767676" />
					</View>
				</View>
				<View>
					<Button text="Próximo" onPress={handleNextPress} />
					<Link
						className="text-center pt-4 text-red text-base"
						href="/(tabs)/post"
					>
						Cancelar
					</Link>
				</View>
			</View>
			<AdConfirmationModalTailwind
				isVisible={isModalVisible}
				onContinue={handleModalContinue}
				onClose={handleModalClose}
			/>
		</View>
	);
}
