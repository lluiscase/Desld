import { Modal, Text, TouchableOpacity, View } from "react-native";
import { X } from "@/shared/icons";
import { NativePrimitiveBoundary, triggerSelectionHaptic } from "@/shared/lib";
import { AdaptiveSheetFallback } from "./AdaptiveSheetFallback";
import type { AdaptiveSheetProps } from "./types";

/**
 * Implementação nativa iOS (Apple HIG):
 * Utiliza `presentationStyle="pageSheet"` do UIKit/SwiftUI para habilitar o cartão
 * modal empilhado nativo do iOS com física de mola, gesto swipe-to-dismiss nativo
 * e indicador de arraste (grabber) padrão do sistema.
 */
function IOSNativePageSheet({
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
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={handleClose}
		>
			<View className="flex-1 bg-white px-6 pt-3 pb-6">
				{showGrabber ? (
					<View className="w-9 h-1.5 bg-gray-300/90 rounded-full self-center mb-3" />
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
							onPress={handleClose}
							className="p-1.5 rounded-full bg-gray-100"
						>
							<X size={18} color="#4A4A4A" />
						</TouchableOpacity>
					</View>
				) : null}

				{children}
			</View>
		</Modal>
	);
}

export function AdaptiveSheet(props: AdaptiveSheetProps) {
	return (
		<NativePrimitiveBoundary fallback={<AdaptiveSheetFallback {...props} />}>
			<IOSNativePageSheet {...props} />
		</NativePrimitiveBoundary>
	);
}
