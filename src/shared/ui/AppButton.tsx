import type React from "react";
import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface AppButtonProps extends TouchableOpacityProps {
	title: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	className?: string;
	textClassName?: string;
}

const variantStyles: Record<
	ButtonVariant,
	{ container: string; text: string; spinner: string }
> = {
	primary: {
		container: "bg-blue-400 active:bg-blue-500 border border-transparent",
		text: "text-white font-bold",
		spinner: "#FFFFFF",
	},
	secondary: {
		container: "bg-gray-100 active:bg-gray-200 border border-gray-200",
		text: "text-gray-800 font-semibold",
		spinner: "#4A4A4A",
	},
	outline: {
		container: "bg-transparent active:bg-blue-50 border border-blue-400",
		text: "text-blue-400 font-bold",
		spinner: "#42A5F5",
	},
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
	sm: {
		container: "h-10 px-3 rounded-md",
		text: "text-sm",
	},
	md: {
		container: "h-14 px-4 rounded-lg",
		text: "text-base",
	},
	lg: {
		container: "h-16 px-6 rounded-xl",
		text: "text-lg",
	},
};

export function AppButton({
	title,
	variant = "primary",
	size = "md",
	loading = false,
	disabled = false,
	leftIcon,
	rightIcon,
	className = "",
	textClassName = "",
	onPress,
	...rest
}: AppButtonProps) {
	const currentVariant = variantStyles[variant];
	const currentSize = sizeStyles[size];
	const isDisabled = disabled || loading;

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			activeOpacity={0.8}
			disabled={isDisabled}
			onPress={onPress}
			className={`w-full flex-row items-center justify-center ${currentSize.container} ${currentVariant.container} ${
				isDisabled ? "opacity-50" : ""
			} ${className}`}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator size="small" color={currentVariant.spinner} />
			) : (
				<>
					{leftIcon}
					<Text
						className={`text-center ${currentSize.text} ${currentVariant.text} ${
							leftIcon ? "ml-2" : ""
						} ${rightIcon ? "mr-2" : ""} ${textClassName}`}
					>
						{title}
					</Text>
					{rightIcon}
				</>
			)}
		</TouchableOpacity>
	);
}
