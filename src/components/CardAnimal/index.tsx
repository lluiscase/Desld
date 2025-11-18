import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import dogRua from '../../../assets/dogRua.png'

interface CardAnimalProps {
	id: string;
	name?: string;
	date: number;
}

export default function CardAnimal({ id, name, date}: CardAnimalProps) {
	const router = useRouter();

	const handlePress = () => {
		router.push({ pathname: "/search/animalSelect", params: { id } });
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="rounded-lg relative self-start max-w-[168px] max-h-[252px] mb-6"
		>
			<Image
				source={dogRua}
				className="max-w-[168px] max-h-[252px] rounded-lg"
				accessibilityLabel={`Foto de ${name}`}
        resizeMode="cover"
			/>
      {name && (
        <View className="absolute bottom-0 left-0 right-0 p-2 bg-white/50 rounded-b-lg flex flex-row justify-center items-center">
          <Text className="text-lg font-bold text-blue-900">{name}</Text>
        </View>
      )}

			<View className="absolute top-2 right-2 px-2 py-1 bg-white/70 rounded-full">
				<Text className="text-sm text-gray-600">
					{name ? `Perdido há ${date} dias`  : `Na rua há ${date} dias`}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
