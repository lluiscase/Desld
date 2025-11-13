import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
	text: string;
	href?: string;
	onPress?: () => void;
	disabled?: boolean;
}

export default function Button({ text, href, onPress, disabled }: ButtonProps) {
	const router = useRouter();

	const handlePress = () => {
		if (disabled) {
			return;
		}
		if (onPress) {
			onPress();
		} else if (href) {
			router.push(href);
		}
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			disabled={disabled}
			className={`p-4 w-full md:w-[376px] h-[56px] rounded items-center justify-center ${
				disabled ? "bg-gray-400" : "bg-blue-400"
			}`}
		>
			<Text className="text-white font-bold text-lg">{text}</Text>
		</TouchableOpacity>
	);
}
