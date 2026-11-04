import { forwardRef, useState } from "react";
import {
	Text,
	TextInput,
	type TextInputProps,
	TouchableOpacity,
	View,
} from "react-native";
import { Eye, EyeOff } from "../icons";

export interface AppInputProps extends TextInputProps {
	label?: string;
	error?: string;
	helperText?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	isPassword?: boolean;
	containerClassName?: string;
	inputClassName?: string;
}

export const AppInput = forwardRef<TextInput, AppInputProps>(
	(
		{
			label,
			error,
			helperText,
			leftIcon,
			rightIcon,
			isPassword = false,
			containerClassName = "",
			inputClassName = "",
			secureTextEntry,
			onFocus,
			onBlur,
			...rest
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = useState(false);
		const [showPassword, setShowPassword] = useState(false);

		const isSecured = isPassword ? !showPassword : secureTextEntry;

		return (
			<View className={`w-full ${containerClassName}`}>
				{label ? (
					<Text className="text-gray-700 font-medium text-sm mb-1.5">
						{label}
					</Text>
				) : null}

				<View
					className={`w-full h-14 flex-row items-center px-4 rounded-lg bg-gray-100 border ${
						error
							? "border-red-500"
							: isFocused
								? "border-blue-400"
								: "border-gray-200"
					}`}
				>
					{leftIcon ? <View className="mr-3">{leftIcon}</View> : null}

					<TextInput
						ref={ref}
						className={`flex-1 text-base text-gray-900 ${inputClassName}`}
						placeholderTextColor="#767676"
						secureTextEntry={isSecured}
						onFocus={(e) => {
							setIsFocused(true);
							onFocus?.(e);
						}}
						onBlur={(e) => {
							setIsFocused(false);
							onBlur?.(e);
						}}
						{...rest}
					/>

					{isPassword ? (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityLabel={
								showPassword ? "Ocultar senha" : "Exibir senha"
							}
							activeOpacity={0.7}
							onPress={() => setShowPassword((prev) => !prev)}
							className="p-1"
						>
							{showPassword ? (
								<EyeOff size={20} color="#767676" />
							) : (
								<Eye size={20} color="#767676" />
							)}
						</TouchableOpacity>
					) : rightIcon ? (
						<View className="ml-2">{rightIcon}</View>
					) : null}
				</View>

				{error ? (
					<Text className="text-red-500 text-xs mt-1 font-medium">{error}</Text>
				) : helperText ? (
					<Text className="text-gray-400 text-xs mt-1">{helperText}</Text>
				) : null}
			</View>
		);
	},
);

AppInput.displayName = "AppInput";
