import { forwardRef, useState } from "react";
import {
	type KeyboardType,
	Text,
	TextInput,
	type TextInputProps,
	TouchableOpacity,
	View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Eye, EyeOff } from "../icons";

export type AppInputType = "email" | "password" | "name" | "passwordRerun";

const INPUT_CONFIG: Record<
	AppInputType,
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

export interface AppInputProps extends TextInputProps {
	inputType?: AppInputType;
	showLabel?: boolean;
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
			inputType,
			showLabel = true,
			label,
			placeholder,
			keyboardType,
			error,
			helperText,
			leftIcon,
			rightIcon,
			isPassword,
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

		const config = inputType ? INPUT_CONFIG[inputType] : undefined;
		const resolvedLabel =
			label ?? (showLabel && config ? config.label : undefined);
		const resolvedPlaceholder =
			placeholder ?? (config ? config.placeholder : undefined);
		const resolvedKeyboardType =
			keyboardType ?? (config ? config.keyboardType : "default");
		const isPasswordField =
			isPassword !== undefined
				? isPassword
				: inputType === "password" || inputType === "passwordRerun";

		const isSecured = isPasswordField ? !showPassword : secureTextEntry;

		const resolvedLeftIcon =
			leftIcon !== undefined ? (
				leftIcon
			) : config ? (
				<MaterialIcons name={config.icon} size={34} color="#767676" />
			) : null;

		return (
			<View className={`w-full mt-4 ${containerClassName}`}>
				{resolvedLabel ? (
					<Text className="mb-2 text-xl font-bold text-blue-400">
						{resolvedLabel}
					</Text>
				) : null}

				<View
					className={`flex-row items-center px-4 w-full h-[60px] rounded border ${
						error
							? "border-red-500"
							: isFocused
								? "border-blue-400"
								: "border-gray-500"
					}`}
				>
					{resolvedLeftIcon ? (
						<View className="mr-3">{resolvedLeftIcon}</View>
					) : null}

					<TextInput
						ref={ref}
						className={`flex-1 text-base text-gray-900 focus:border-none focus:outline-none ${inputClassName}`}
						placeholder={resolvedPlaceholder}
						placeholderTextColor="#A0A0A0"
						secureTextEntry={isSecured}
						keyboardType={resolvedKeyboardType}
						underlineColorAndroid="transparent"
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

					{isPasswordField ? (
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
								<EyeOff size={24} color="#767676" />
							) : (
								<Eye size={24} color="#767676" />
							)}
						</TouchableOpacity>
					) : rightIcon ? (
						<View className="ml-2">{rightIcon}</View>
					) : null}
				</View>

				{error ? (
					<Text className="mt-1 text-red-500">{error}</Text>
				) : helperText ? (
					<Text className="text-gray-400 text-xs mt-1">{helperText}</Text>
				) : null}
			</View>
		);
	},
);

AppInput.displayName = "AppInput";
