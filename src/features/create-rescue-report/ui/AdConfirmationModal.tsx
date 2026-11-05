import type React from "react";
import {
	Modal,
	type ModalProps,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export interface AdConfirmationModalProps extends ModalProps {
	isVisible: boolean;
	onContinue: () => void;
	onClose: () => void;
}

export const AdConfirmationModal: React.FC<AdConfirmationModalProps> = ({
	isVisible,
	onContinue,
	onClose,
	...rest
}) => {
	return (
		<Modal
			visible={isVisible}
			animationType="fade"
			transparent={true}
			onRequestClose={onClose}
			{...rest}
		>
			<View className="flex-1 justify-center items-center bg-black/70 px-4">
				<View className="relative w-full max-w-sm bg-white rounded-xl p-8 items-center">
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Fechar modal"
						onPress={onClose}
						className="absolute top-2 right-2 p-2 z-10"
					>
						<Text className="text-xl font-bold text-gray-500">✕</Text>
					</TouchableOpacity>

					<View className="w-full h-48 bg-gray-200 justify-center items-center rounded-lg mb-6">
						<Text className="text-base font-bold text-gray-500">AuHelp</Text>
					</View>

					<Text className="text-xl font-bold text-black text-center mb-2">
						Anúncio divulgado com sucesso!
					</Text>

					<Text className="text-sm text-gray-600 text-center leading-5 px-2 mb-6">
						Sua atitude generosa e atenciosa pode fazer toda a diferença!
					</Text>

					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Continuar navegação"
						className="w-full bg-blue-500 py-3 rounded-lg items-center active:bg-blue-600"
						onPress={onContinue}
					>
						<Text className="text-base font-bold text-white">Continuar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default AdConfirmationModal;
