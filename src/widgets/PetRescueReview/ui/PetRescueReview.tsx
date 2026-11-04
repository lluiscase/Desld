import { useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import type { Pet } from "@/entities/pet";
import { ArrowLeft, Calendar, MapPin, Share2 } from "@/shared/icons";
import { AppButton } from "@/shared/ui";

const { width } = Dimensions.get("window");

export interface PetRescueReviewProps {
	pet: Pet;
	actionButtonTitle?: string;
	onActionPress?: () => void;
	onBackPress?: () => void;
	onSharePress?: () => void;
	isEditable?: boolean;
	className?: string;
}

const STATUS_LABELS: Record<
	string,
	{ label: string; bg: string; text: string }
> = {
	lost: { label: "Perdido", bg: "bg-red-500", text: "text-white" },
	street: { label: "Na Rua", bg: "bg-orange-500", text: "text-white" },
	rescued: { label: "Resgatado", bg: "bg-green-500", text: "text-white" },
	adopted: { label: "Adotado", bg: "bg-blue-500", text: "text-white" },
};

export function PetRescueReview({
	pet,
	actionButtonTitle = "Ajudar ou Adotar",
	onActionPress,
	onBackPress,
	onSharePress,
	className = "",
}: PetRescueReviewProps) {
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	const images =
		pet.imageUrls && pet.imageUrls.length > 0 ? pet.imageUrls : [pet.imageUrl];

	const statusInfo = STATUS_LABELS[pet.status] || {
		label: pet.status,
		bg: "bg-gray-500",
		text: "text-white",
	};

	return (
		<View className={`flex-1 bg-white ${className}`}>
			{/* Header Flutuante de Navegação */}
			<View className="absolute top-10 left-0 right-0 z-10 px-4 flex-row justify-between items-center">
				{onBackPress ? (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Voltar"
						onPress={onBackPress}
						className="w-10 h-10 rounded-full bg-white/80 items-center justify-center shadow-md backdrop-blur-sm"
					>
						<ArrowLeft size={22} color="#000000" />
					</TouchableOpacity>
				) : (
					<View />
				)}

				{onSharePress ? (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Compartilhar pet"
						onPress={onSharePress}
						className="w-10 h-10 rounded-full bg-white/80 items-center justify-center shadow-md backdrop-blur-sm"
					>
						<Share2 size={20} color="#000000" />
					</TouchableOpacity>
				) : null}
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				{/* Carrossel de Imagens */}
				<View className="relative w-full h-[320px] bg-gray-100">
					<FlatList
						data={images}
						keyExtractor={(item, index) => `${item}-${index}`}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onMomentumScrollEnd={(e) => {
							const offset = e.nativeEvent.contentOffset.x;
							const index = Math.round(offset / width);
							setActiveImageIndex(index);
						}}
						renderItem={({ item }) => (
							<Image
								source={{ uri: item }}
								style={{ width, height: 320 }}
								resizeMode="cover"
							/>
						)}
					/>

					{/* Indicador de Bolinhas */}
					{images.length > 1 ? (
						<View className="absolute bottom-3 left-0 right-0 flex-row justify-center items-center gap-1.5">
							{images.map((imgUri, i) => (
								<View
									key={imgUri}
									className={`h-2 rounded-full transition-all ${
										activeImageIndex === i
											? "w-6 bg-blue-400"
											: "w-2 bg-white/70"
									}`}
								/>
							))}
						</View>
					) : null}
				</View>

				{/* Conteúdo Principal */}
				<View className="p-6 gap-4">
					{/* Título e Badge de Status */}
					<View className="flex-row items-center justify-between">
						<Text className="text-2xl font-bold uppercase text-gray-900 flex-1 mr-3">
							{pet.name || "Sem Nome Registrado"}
						</Text>
						<View className={`px-3 py-1.5 rounded-xl ${statusInfo.bg}`}>
							<Text
								className={`text-xs font-bold uppercase ${statusInfo.text}`}
							>
								{statusInfo.label}
							</Text>
						</View>
					</View>

					{/* Informações de Tempo e Local */}
					<View className="flex-row flex-wrap gap-4 py-2 border-y border-gray-100">
						<View className="flex-row items-center gap-1.5">
							<Calendar size={18} color="#767676" />
							<Text className="text-sm text-gray-600">
								{pet.name
									? `Perdido há ${pet.daysCount} dias`
									: `Na rua há ${pet.daysCount} dias`}
							</Text>
						</View>

						{pet.location ? (
							<View className="flex-row items-center gap-1.5">
								<MapPin size={18} color="#767676" />
								<Text
									className="text-sm text-gray-600 flex-1"
									numberOfLines={1}
								>
									{pet.location}
								</Text>
							</View>
						) : null}
					</View>

					{/* Tags de Características */}
					{pet.tags && pet.tags.length > 0 ? (
						<View className="flex-row flex-wrap gap-2">
							{pet.tags.map((tag) => (
								<View key={tag} className="px-3 py-1 bg-blue-100 rounded-full">
									<Text className="text-xs font-semibold text-blue-700 capitalize">
										{tag}
									</Text>
								</View>
							))}
						</View>
					) : null}

					{/* Bloco de Descrição */}
					<View className="gap-2 pt-2">
						<Text className="text-base font-bold text-gray-800">
							Descrição do Animal
						</Text>
						<View className="p-4 bg-gray-50 rounded-xl border border-gray-200">
							<Text className="text-base text-gray-700 leading-6">
								{pet.description || "Nenhuma descrição detalhada informada."}
							</Text>
						</View>
					</View>

					{/* Botão de Ação */}
					{onActionPress ? (
						<View className="pt-4">
							<AppButton title={actionButtonTitle} onPress={onActionPress} />
						</View>
					) : null}
				</View>
			</ScrollView>
		</View>
	);
}
