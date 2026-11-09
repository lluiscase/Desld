import { useState } from "react";
import { TextInput, type TextInputProps } from "react-native";

export interface TextAreaProps extends TextInputProps {
	value?: string;
	onChangeText?: (text: string) => void;
	placeholder?: string;
	className?: string;
}

export function TextArea({
	value: controlledValue,
	onChangeText,
	placeholder = "Escreva seu texto aqui...",
	className = "",
	...rest
}: TextAreaProps) {
	const [internalValue, setInternalValue] = useState("");
	const isControlled = controlledValue !== undefined;
	const text = isControlled ? controlledValue : internalValue;

	const handleChange = (newText: string) => {
		if (!isControlled) {
			setInternalValue(newText);
		}
		onChangeText?.(newText);
	};

	return (
		<TextInput
			className={`w-full h-32 p-4 border border-gray-300 rounded-md bg-gray-300 text-base text-black ${className}`}
			onChangeText={handleChange}
			value={text}
			placeholder={placeholder}
			multiline={true}
			numberOfLines={5}
			textAlignVertical="top"
			{...rest}
		/>
	);
}

export default TextArea;
