import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface InputProps {
	placeholder: string;
	showLabel?: string;
  filter?:boolean;
}

export default function InputSearch({ placeholder, showLabel, filter }: InputProps) {
	const [text, setText] = useState("");
	const inputRef = useRef<TextInput>(null);
  const router = useRouter()

  const handleSearchSubmit = () => {
    if (filter) {
      inputRef.current?.blur();
      router.push({
        pathname: "/search/resultSearch", // O caminho da rota (sem o '(tabs)')
        params: { query: text },
    })
  }}

	const handlePress = useCallback(() => {
		inputRef.current?.focus();
	}, []);
	return (
		<View className="w-full">
			{showLabel && (
				<Text className="mb-2 text-xl font-semibold">{showLabel}</Text>
			)}

			<TouchableOpacity
				onPress={handlePress}
				activeOpacity={0.8}
				className="flex-row items-center bg-white px-4 w-full h-[47px] rounded-2xl border border-gray-500"
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

          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
				/>
				<MaterialIcons name="search" size={34} color="#767676" />
        <View className="border-l ml-1 pl-1 border-gray-400">
          {filter &&(
				  <MaterialIcons name="filter-list" size={34} color="#767676" />
        )}
        </View>
			</TouchableOpacity>
		</View>
	);
}
