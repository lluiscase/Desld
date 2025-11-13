import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
	text: string;
	href?: string;
  onPress?: () => void;
}

export default function Button({ text, href, onPress }: ButtonProps) {
	const router = useRouter();

	const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
		  router.push(href);
    }
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="bg-blue-400 p-4 w-full md:w-[376px] h-[56px] rounded items-center justify-center"
		>
			<Text className="text-white font-bold text-lg">{text}</Text>
		</TouchableOpacity>
	);
}
