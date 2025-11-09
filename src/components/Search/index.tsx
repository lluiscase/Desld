import { useCallback, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface InputProps {
	placeholder: string;
	showLabel?: boolean;
}

export function InputSearch({ placeholder, showLabel }: InputProps) {
	const [text, setText] = useState("");

	const inputRef = useRef<TextInput>(null);

	const handlePress = useCallback(() => {
		inputRef.current?.focus();
	}, []);
	return (
		<View className="w-full mt-4">
			{showLabel && (
				<Text className="mb-2 text-xl font-bold text-blue-400">{text}</Text>
			)}

			<TouchableOpacity
				onPress={handlePress}
				activeOpacity={0.8}
				className="flex-row items-center px-4 w-full h-[47px] rounded-3xl border border-gray-500"
			>
				<TextInput
					ref={inputRef}
					className="flex-1 py-2 focus:border-none focus:outline-none"
					placeholder={placeholder}
					placeholderTextColor="#A0A0A0"
					value={text}
					onChangeText={setText}
					underlineColorAndroid="transparent"
					multiline={false}
				/>
				<MaterialIcons name="search" size={34} color="#767676" />
			</TouchableOpacity>
		</View>
	);
}
