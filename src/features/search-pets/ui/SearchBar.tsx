import { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Filter, Search, X } from "@/shared/icons";

export interface SearchBarProps {
	placeholder?: string;
	initialValue?: string;
	onSearch?: (query: string) => void;
	onChangeText?: (text: string) => void;
	onFilterPress?: () => void;
	showFilterButton?: boolean;
	debounceMs?: number;
	className?: string;
}

export function SearchBar({
	placeholder = "Buscar animais por nome ou raça...",
	initialValue = "",
	onSearch,
	onChangeText,
	onFilterPress,
	showFilterButton = true,
	debounceMs = 300,
	className = "",
}: SearchBarProps) {
	const [text, setText] = useState(initialValue);
	const inputRef = useRef<TextInput>(null);

	// Debounce de busca
	useEffect(() => {
		const timer = setTimeout(() => {
			onSearch?.(text);
		}, debounceMs);

		return () => clearTimeout(timer);
	}, [text, debounceMs, onSearch]);

	const handleChange = (newText: string) => {
		setText(newText);
		onChangeText?.(newText);
	};

	const handleClear = () => {
		setText("");
		onChangeText?.("");
		onSearch?.("");
		inputRef.current?.focus();
	};

	return (
		<View
			className={`flex-row items-center bg-white px-3.5 h-12 rounded-xl border border-gray-200 shadow-sm ${className}`}
		>
			<Search size={20} color="#767676" />

			<TextInput
				ref={inputRef}
				className="flex-1 px-3 text-base text-gray-900"
				placeholder={placeholder}
				placeholderTextColor="#767676"
				value={text}
				onChangeText={handleChange}
				returnKeyType="search"
				onSubmitEditing={() => onSearch?.(text)}
			/>

			{text.length > 0 ? (
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Limpar busca"
					onPress={handleClear}
					className="p-1 mr-1"
				>
					<X size={18} color="#767676" />
				</TouchableOpacity>
			) : null}

			{showFilterButton && onFilterPress ? (
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Filtrar resultados"
					onPress={onFilterPress}
					className="p-1 pl-2 border-l border-gray-200"
				>
					<Filter size={20} color="#42A5F5" />
				</TouchableOpacity>
			) : null}
		</View>
	);
}
