import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { X } from "@/shared/icons";
import type { AdaptiveSheetProps } from "./types";

export function AdaptiveSheetFallback({
	visible,
	onClose,
	title,
	headerIcon,
	showGrabber = true,
	closeAccessibilityLabel = "Fechar modal",
	children,
}: AdaptiveSheetProps) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<View className="flex-1 bg-black/50 justify-end">
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Fechar painel ao tocar fora"
					className="flex-1"
					onPress={onClose}
				/>
				<View className="bg-white rounded-t-3xl p-6 max-h-[88%] shadow-xl">
					{showGrabber ? (
						<View className="w-10 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
					) : null}

					{title ? (
						<View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
							<View className="flex-row items-center gap-2 flex-1 mr-2">
								{headerIcon}
								<Text className="text-lg font-bold text-gray-900">{title}</Text>
							</View>

							<TouchableOpacity
								accessibilityRole="button"
								accessibilityLabel={closeAccessibilityLabel}
								onPress={onClose}
								className="p-1.5 rounded-full bg-gray-100"
							>
								<X size={18} color="#4A4A4A" />
							</TouchableOpacity>
						</View>
					) : null}

					{children}
				</View>
			</View>
		</Modal>
	);
}
