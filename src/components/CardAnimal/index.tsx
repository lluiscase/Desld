import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CardAnimalProps {
	id: string;
	name: string;
	date: number;
	image: any;
}

export default function CardAnimal({ id, name, date, image }: CardAnimalProps) {
	const router = useRouter();

	const handlePress = () => {
		router.push({ pathname: "/post", params: { id } });
	};

	const formattedDate = new Date(date).toLocaleDateString("pt-BR");

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="bg-white rounded-lg p-4 shadow-md"
		>
			<Image
				source={image}
				className="w-full h-40 rounded-lg"
				accessibilityLabel={`Foto de ${name}`}
			/>
			<View className="mt-4">
				<Text className="text-lg font-bold text-blue-900">{name}</Text>
				<Text className="text-sm text-gray-600">
					Perdido em {formattedDate}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
