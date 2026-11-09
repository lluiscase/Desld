import { useRouter } from "expo-router";
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
	title?: string;
	text?: string;
	href?: string;
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
		container: "bg-[#42A5F5] active:opacity-90 shadow-sm",
		text: "text-white font-ubuntu-bold text-lg",
		spinner: "#FFFFFF",
	},
	secondary: {
		container: "bg-gray-100 active:bg-gray-200 border border-gray-200",
		text: "text-gray-800 font-ubuntu-medium text-lg",
		spinner: "#4A4A4A",
	},
	outline: {
		container: "bg-transparent active:bg-blue-50 border border-[#42A5F5]",
		text: "text-[#42A5F5] font-ubuntu-bold text-lg",
		spinner: "#42A5F5",
	},
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
	sm: {
		container: "h-10 px-4 rounded-xl",
		text: "text-sm",
	},
	md: {
		container: "w-full h-14 rounded-2xl items-center justify-center",
		text: "text-lg",
	},
	lg: {
		container: "w-full h-14 rounded-2xl items-center justify-center",
		text: "text-lg",
	},
};

export function AppButton({
	title,
	text,
	href,
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
	const router = useRouter();
	const buttonLabel = title ?? text ?? "";
	const currentVariant = variantStyles[variant];
	const currentSize = sizeStyles[size];
	const isDisabled = disabled || loading;

	const handlePress = (e: any) => {
		if (isDisabled) return;
		if (onPress) {
			onPress(e);
		} else if (href) {
			router.push(href as any);
		}
	};

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			activeOpacity={0.8}
			disabled={isDisabled}
			onPress={handlePress}
			className={`flex-row items-center justify-center ${currentSize.container} ${
				isDisabled ? "bg-gray-400" : currentVariant.container
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
						{buttonLabel}
					</Text>
					{rightIcon}
				</>
			)}
		</TouchableOpacity>
	);
}
