import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
	Text,
	TextInput,
	type TextInputInstance,
	TouchableOpacity,
	View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export interface SearchInputProps {
	placeholder: string;
	showLabel?: string;
	filter?: boolean;
	value?: string;
	onChangeText?: (text: string) => void;
	onSubmit?: (text: string) => void;
	className?: string;
}

export function SearchInput({
	placeholder,
	showLabel,
	filter,
	value: controlledValue,
	onChangeText,
	onSubmit,
	className = "",
}: SearchInputProps) {
	const [internalText, setInternalText] = useState("");
	const isControlled = controlledValue !== undefined;
	const text = isControlled ? controlledValue : internalText;

	const inputRef = useRef<TextInputInstance>(null);
	const router = useRouter();

	const handleChangeText = (val: string) => {
		if (!isControlled) {
			setInternalText(val);
		}
		onChangeText?.(val);
	};

	const handleSearchSubmit = () => {
		inputRef.current?.blur();
		if (onSubmit) {
			onSubmit(text);
			return;
		}

		if (filter) {
			router.push({
				pathname: "/(tabs)/search/resultSearch" as any,
				params: { query: text },
			});
		}
	};

	const handlePress = useCallback(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<View className={`${className}`}>
			{showLabel ? (
				<Text className="mb-2 text-xl font-ubuntu-bold text-gray-800">
					{showLabel}
				</Text>
			) : null}

			<TouchableOpacity
				onPress={handlePress}
				activeOpacity={0.8}
				className="flex-row items-center bg-white px-4 w-full h-12 rounded-2xl border border-gray-300"
			>
				<TextInput
					ref={inputRef}
					className="flex-1 py-2 font-ubuntu-regular text-base text-gray-900 focus:border-none focus:outline-none"
					placeholder={placeholder}
					placeholderTextColor="#A0A0A0"
					value={text}
					onChangeText={handleChangeText}
					underlineColorAndroid="transparent"
					multiline={false}
					onSubmitEditing={handleSearchSubmit}
					returnKeyType="search"
				/>
				<MaterialIcons name="search" size={26} color="#767676" />
				{filter ? (
					<View className="border-l ml-2 pl-2 border-gray-300">
						<MaterialIcons name="filter-list" size={26} color="#767676" />
					</View>
				) : null}
			</TouchableOpacity>
		</View>
	);
}

export default SearchInput;
