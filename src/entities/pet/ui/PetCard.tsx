import { Image, Text, TouchableOpacity, View } from "react-native";
import type { PetCardProps } from "../model/types";

export function PetCard({ pet, onPress, className = "" }: PetCardProps) {
	const handlePress = () => {
		onPress?.(pet.id);
	};

	const badgeText = pet.name
		? `Perdido há ${pet.daysCount} dias`
		: `Na rua há ${pet.daysCount} dias`;

	const isRemoteImage =
		typeof pet.imageUrl === "string" &&
		(pet.imageUrl.startsWith("http://") ||
			pet.imageUrl.startsWith("https://") ||
			pet.imageUrl.startsWith("file://") ||
			pet.imageUrl.startsWith("data:"));

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityLabel={`Informações de ${pet.name || "animal para resgate"}`}
			activeOpacity={0.85}
			onPress={handlePress}
			className={`rounded-xl overflow-hidden relative self-start w-[168px] h-[252px] mb-4 bg-gray-100 shadow-sm ${className}`}
		>
			<Image
				source={
					isRemoteImage
						? { uri: pet.imageUrl }
						: typeof pet.imageUrl === "number"
							? pet.imageUrl
							: { uri: pet.imageUrl }
				}
				className="w-full h-full rounded-xl"
				accessibilityLabel={`Foto de ${pet.name || "pet"}`}
				resizeMode="cover"
			/>

			{/* Badge superior de tempo */}
			<View className="absolute top-2 right-2 px-2.5 py-1 bg-white/80 rounded-full backdrop-blur-sm">
				<Text className="text-xs font-medium text-gray-700">{badgeText}</Text>
			</View>

			{/* Nome do animal no rodapé se houver */}
			{pet.name ? (
				<View className="absolute bottom-0 left-0 right-0 p-2.5 bg-white/70 rounded-b-xl flex-row justify-center items-center">
					<Text
						numberOfLines={1}
						className="text-base font-bold text-blue-900 text-center"
					>
						{pet.name}
					</Text>
				</View>
			) : null}
		</TouchableOpacity>
	);
}
