import { useCallback, useRef } from "react";
import {
	type KeyboardType,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type InputType = "email" | "password" | "name" | "passwordRerun";

interface InputProps {
	inputType: InputType;
	showLabel?: boolean;
	value: string;
	onChangeText: (text: string) => void;
	error?: string;
}

const INPUT_CONFIG: Record<
	InputType,
	{
		icon: string;
		placeholder: string;
		keyboardType: KeyboardType;
		label: string;
	}
> = {
	name: {
		icon: "person",
		placeholder: "Seu Nome Completo",
		keyboardType: "default",
		label: "Nome Completo",
	},
	email: {
		icon: "mail",
		placeholder: "Digite seu Email:",
		keyboardType: "email-address",
		label: "Email",
	},
	password: {
		icon: "lock",
		placeholder: "Crie sua senha:",
		keyboardType: "default",
		label: "Senha",
	},
	passwordRerun: {
		icon: "lock",
		placeholder: "Crie sua senha:",
		keyboardType: "default",
		label: "Confirmar senha",
	},
};

export default function Input({
	inputType,
	showLabel,
	value,
	onChangeText,
	error,
}: InputProps) {
	const inputRef = useRef<TextInput>(null);

	const handlePress = useCallback(() => {
		inputRef.current?.focus();
	}, []);

	const isPassword = inputType === "password";
	const config = INPUT_CONFIG[inputType];

	return (
		<View className="w-full mt-4">
			{showLabel && (
				<Text className="mb-2 text-xl font-bold text-blue-400">
					{config.label}
				</Text>
			)}

			<TouchableOpacity
				onPress={handlePress}
				activeOpacity={0.8}
				className={`flex-row items-center px-4 w-full h-[60px] rounded border ${
					error ? "border-red-500" : "border-gray-500"
				}`}
			>
				<MaterialIcons
					name={config.icon}
					size={34}
					color="#767676"
					className="mr-3"
				/>

				<TextInput
					ref={inputRef}
					className="flex-1 py-2 focus:border-none focus:outline-none"
					placeholder={config.placeholder}
					placeholderTextColor="#A0A0A0"
					value={value}
					onChangeText={onChangeText}
					underlineColorAndroid="transparent"
					secureTextEntry={isPassword}
					keyboardType={config.keyboardType}
					autoCapitalize={inputType === "name" ? "words" : "none"}
					multiline={false}
				/>
			</TouchableOpacity>
			{error && <Text className="mt-1 text-red-500">{error}</Text>}
		</View>
	);
}
