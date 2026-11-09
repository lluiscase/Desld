import { Modal, Pressable, Text, View } from "react-native";
import { X } from "@/shared/icons";
import { NativePrimitiveBoundary, triggerSelectionHaptic } from "@/shared/lib";
import { AdaptiveSheetFallback } from "./AdaptiveSheetFallback";
import type { AdaptiveSheetProps } from "./types";

/**
 * Implementação Android (Material Design 3 Modal Bottom Sheet):
 * - Drag handle de 32x4dp (#79747E / outlineVariant)
 * - Shape Corner Extra Large Top (28dp) e elevação de superfície MD3
 * - Scrim translúcido sob a barra de status e ripple nativo no botão de fechar
 */
function AndroidMaterialSheet({
	visible,
	onClose,
	title,
	headerIcon,
	showGrabber = true,
	closeAccessibilityLabel = "Fechar modal",
	children,
}: AdaptiveSheetProps) {
	const handleClose = () => {
		triggerSelectionHaptic();
		onClose();
	};

	return (
		<Modal
			visible={visible}
			transparent
			statusBarTranslucent
			animationType="slide"
			onRequestClose={handleClose}
		>
			<View className="flex-1 bg-black/55 justify-end">
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Fechar painel ao tocar fora"
					className="flex-1"
					onPress={handleClose}
				/>
				<View
					style={{
						borderTopLeftRadius: 28,
						borderTopRightRadius: 28,
						elevation: 16,
					}}
					className="bg-white px-6 pt-3 pb-6 max-h-[88%]"
				>
					{showGrabber ? (
						<View
							style={{ width: 32, height: 4, borderRadius: 2 }}
							className="bg-gray-400 self-center my-2"
						/>
					) : null}

					{title ? (
						<View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
							<View className="flex-row items-center gap-2 flex-1 mr-2">
								{headerIcon}
								<Text className="text-lg font-bold text-gray-900">{title}</Text>
							</View>

							<Pressable
								accessibilityRole="button"
								accessibilityLabel={closeAccessibilityLabel}
								android_ripple={{
									color: "#E5E7EB",
									borderless: true,
									radius: 20,
								}}
								onPress={handleClose}
								className="p-2 rounded-full"
							>
								<X size={20} color="#4A4A4A" />
							</Pressable>
						</View>
					) : null}

					{children}
				</View>
			</View>
		</Modal>
	);
}

export function AdaptiveSheet(props: AdaptiveSheetProps) {
	return (
		<NativePrimitiveBoundary fallback={<AdaptiveSheetFallback {...props} />}>
			<AndroidMaterialSheet {...props} />
		</NativePrimitiveBoundary>
	);
}
