import { useRouter } from "expo-router";
import {
	Image,
	type ImageSourcePropType,
	TouchableOpacity,
} from "react-native";
import UserImage from "../../../../assets/User.png";

export interface UserAvatarButtonProps {
	size?: number;
	x?: number;
	image?: ImageSourcePropType;
	onPress?: () => void;
	className?: string;
}

export function UserAvatarButton({
	size,
	x = 47,
	image = UserImage,
	onPress,
	className = "",
}: UserAvatarButtonProps) {
	const router = useRouter();
	const dimension = size ?? x;

	const handlePress = () => {
		if (onPress) {
			onPress();
		} else {
			router.push("/(tabs)/user" as any);
		}
	};

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityLabel="Abrir perfil do usuário"
			activeOpacity={0.8}
			onPress={handlePress}
			className={`flex flex-col items-center justify-center ${className}`}
		>
			<Image
				source={image}
				style={{
					width: dimension,
					height: dimension,
					borderRadius: Math.round(dimension / 2),
				}}
				resizeMode="cover"
			/>
		</TouchableOpacity>
	);
}

export default UserAvatarButton;
