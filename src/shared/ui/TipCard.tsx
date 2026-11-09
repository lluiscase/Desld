import { Image, type ImageSourcePropType, Text, View } from "react-native";
import Lampad from "../../../assets/Lampad.png";

export interface TipCardProps {
	title?: string;
	image?: ImageSourcePropType;
	className?: string;
}

export function TipCard({
	title = "Cuidados e higiene",
	image = Lampad,
	className = "",
}: TipCardProps) {
	return (
		<View className={`flex flex-col items-center ${className}`}>
			<Image
				source={image}
				style={{ width: 106, height: 216, borderRadius: 10 }}
				resizeMode="cover"
			/>
			<Text className="text-xs pt-2 text-gray-800">{title}</Text>
		</View>
	);
}

export default TipCard;
