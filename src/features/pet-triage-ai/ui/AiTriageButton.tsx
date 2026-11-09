import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Sparkles } from "@/shared/icons";

export interface AiTriageButtonProps {
	onPress: () => void;
	isAnalyzing?: boolean;
	disabled?: boolean;
	label?: string;
	helperText?: string;
	className?: string;
}

export function AiTriageButton({
	onPress,
	isAnalyzing = false,
	disabled = false,
	label = "Analisar Pet com IA",
	helperText = "Identifica espécie, urgência e cuidados a partir da foto",
	className = "",
}: AiTriageButtonProps) {
	const isButtonDisabled = disabled || isAnalyzing;

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityState={{ disabled: isButtonDisabled, busy: isAnalyzing }}
			activeOpacity={0.85}
			disabled={isButtonDisabled}
			onPress={onPress}
			className={`w-full p-4 rounded-xl border border-blue-300 bg-blue-50 flex-row items-center justify-between ${
				isButtonDisabled ? "opacity-60" : ""
			} ${className}`}
		>
			<View className="flex-row items-center flex-1 mr-3">
				<View className="w-10 h-10 rounded-lg bg-blue-400 items-center justify-center mr-3">
					{isAnalyzing ? (
						<ActivityIndicator size="small" color="#FFFFFF" />
					) : (
						<Sparkles size={20} color="#FFFFFF" />
					)}
				</View>

				<View className="flex-1">
					<Text className="text-blue-900 font-bold text-sm">
						{isAnalyzing ? "Analisando imagem com IA..." : label}
					</Text>
					<Text className="text-blue-700 text-xs mt-0.5">
						{isAnalyzing
							? "Aguarde enquanto identificamos características e sinais clínicos"
							: helperText}
					</Text>
				</View>
			</View>

			<View className="px-2.5 py-1 rounded-full bg-blue-400">
				<Text className="text-white text-xs font-bold">IA</Text>
			</View>
		</TouchableOpacity>
	);
}
