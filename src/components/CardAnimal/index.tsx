import { useRouter } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

interface CardAnimalProps {
	date: number;
	image: any;
}

export default function CardAnimal({ date, image }: CardAnimalProps) {
	const router = useRouter();

	const handlePress = () => {
		router.push("");
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="bg-blue-400 p-4 w-full md:w-[376px] h-[56px] rounded items-center justify-center"
		>
			<Image />
		</TouchableOpacity>
	);
}
