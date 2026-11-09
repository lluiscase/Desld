import type React from "react";
import {
	Image,
	Modal,
	type ModalProps,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import DogSad from "../../../../assets/dogSad.png";

export interface LogoutModalProps extends ModalProps {
	isVisible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export function LogoutModal({
	isVisible,
	onConfirm,
	onCancel,
	...rest
}: LogoutModalProps) {
	return (
		<Modal
			visible={isVisible}
			animationType="fade"
			transparent={true}
			onRequestClose={onCancel}
			{...rest}
		>
			<View className="flex-1 justify-center items-center bg-black/60 px-6">
				<View className="w-full max-w-[320px] bg-white rounded-[32px] p-6 items-center shadow-lg">
					<Text className="font-ubuntu-bold text-2xl text-gray-900 text-center mb-6">
						Você tem certeza?
					</Text>

					<Image
						source={DogSad}
						style={{ width: 140, height: 140 }}
						resizeMode="contain"
						className="mb-6"
					/>

					<Text className="font-ubuntu-regular text-base text-gray-800 text-center leading-6 mb-8">
						{"Auuuu sair menos doguinhos\nserão ajudados!"}
					</Text>

					<View className="flex-row items-center justify-between w-full px-4">
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityLabel="Confirmar saída"
							onPress={onConfirm}
							activeOpacity={0.7}
							className="px-4 py-2.5"
						>
							<Text className="font-ubuntu-medium text-lg text-gray-900">
								Sim
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							accessibilityRole="button"
							accessibilityLabel="Cancelar e permanecer"
							onPress={onCancel}
							activeOpacity={0.8}
							className="bg-[#42A5F5] rounded-xl px-8 py-3 items-center justify-center active:bg-blue-500 shadow-sm"
						>
							<Text className="font-ubuntu-bold text-lg text-white">Não</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

export default LogoutModal;
