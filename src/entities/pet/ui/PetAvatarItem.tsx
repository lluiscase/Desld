import { useRouter } from "expo-router";
import {
	Image,
	type ImageSourcePropType,
	Text,
	TouchableOpacity,
} from "react-native";
import defaultDogImage from "../../../../assets/Dog.png";

export interface PetAvatarItemProps {
	name: string;
	image?: ImageSourcePropType;
	onPress?: () => void;
	className?: string;
}

export function PetAvatarItem({
	name,
	image = defaultDogImage,
	onPress,
	className = "",
}: PetAvatarItemProps) {
	const router = useRouter();

	const handlePress = () => {
		if (onPress) {
			onPress();
		} else {
			router.push({
				pathname: "/(tabs)/search/animalSelect" as any,
				params: { query: "home" },
			});
		}
	};

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityLabel={`Ver detalhes de ${name}`}
			activeOpacity={0.8}
			onPress={handlePress}
			className={`flex flex-col items-center ${className}`}
		>
			<Image
				source={image}
				style={{ width: 80, height: 80, borderRadius: 40 }}
				resizeMode="cover"
			/>
			<Text className="mt-2 text-sm font-medium text-gray-800">{name}</Text>
		</TouchableOpacity>
	);
}

export default PetAvatarItem;
