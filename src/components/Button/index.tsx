import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
	text: string;
	href?: string;
}

export function Button({ text, href }: ButtonProps) {
	const router = useRouter();

	const handlePress = () => {
    if (href)
		  router.push(href);
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
