import { useRouter } from "expo-router";
import {
	Image,
	type ImageSourcePropType,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import defaultDogImage from "../../../assets/Dog.png";

export type PostSituation = "Perdido" | "Abandonado" | "Adocao";

export interface PetPostCardProps {
	name?: string;
	type: string;
	situation: PostSituation;
	time: number;
	image?: ImageSourcePropType;
	onPress?: () => void;
	className?: string;
}

export function PetPostCard({
	name = "Sem nome",
	type,
	situation,
	time,
	image = defaultDogImage,
	onPress,
	className = "",
}: PetPostCardProps) {
	const router = useRouter();

	let badgeBgColor = "bg-red";
	if (situation === "Abandonado") {
		badgeBgColor = "bg-yellow";
	} else if (situation === "Adocao") {
		badgeBgColor = "bg-green";
	}

	const handlePress = () => {
		if (onPress) {
			onPress();
		} else {
			router.push("/(tabs)/post/preVisulation" as any);
		}
	};

	const displayName = name.trim().length > 0 ? name : "Sem nome";

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityLabel={`Postagem de ${displayName}`}
			activeOpacity={0.85}
			onPress={handlePress}
			className={`flex flex-row p-2 rounded-lg bg-gray-300 w-full mb-3 ${className}`}
		>
			<Image
				source={image}
				style={{ width: 105, height: 91, borderRadius: 5 }}
				resizeMode="cover"
			/>
			<View className="flex-1 justify-between py-1">
				<View className="flex flex-row justify-between pl-2">
					<Text className="uppercase font-bold text-xl text-gray-900">
						{displayName}
					</Text>
					<Text
						className={`${badgeBgColor} flex justify-center text-sm font-semibold items-center px-2 py-0.5 rounded-3xl text-gray-900`}
					>
						{situation}
					</Text>
				</View>
				<Text className="bg-blue-200 text-gray-700 ml-2 px-2 py-0.5 text-center text-xs font-semibold rounded-3xl self-start">
					{type}
				</Text>
				<Text className="text-right text-xs text-gray-600 mt-1">
					Há {time} dias
				</Text>
			</View>
		</TouchableOpacity>
	);
}

export default PetPostCard;
