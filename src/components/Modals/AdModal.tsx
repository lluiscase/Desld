import type React from "react";
import {
	Dimensions, // Necessário para h-48 para manter a proporção
	Modal,
	type ModalProps,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const { width } = Dimensions.get("window");

// Função auxiliar (simulando twrnc/NativeWind)
// Mantenha ou substitua esta linha pela sua importação real (ex: 'import tw from "twrnc";')
const tw = (classes: string) => classes;

// 1. Definição das Props do Componente
interface AdConfirmationModalProps extends ModalProps {
	isVisible: boolean;
	onContinue: () => void; // Função chamada ao pressionar "Continuar"
	onClose: () => void; // Função para fechar o modal
}

// 2. Componente Funcional
const AdConfirmationModalTailwind: React.FC<AdConfirmationModalProps> = ({
	isVisible,
	onContinue,
	onClose,
	...rest
}) => {
	// Ajuste a altura (h-48) para ser aproximadamente a metade da largura, como na imagem.
	// No NativeWind/twrnc, h-48 é 192px ou 12rem. Você pode usar uma View com style={{ height: width * 0.4 }}
	// para garantir a proporção ou confiar nas classes utilitárias.

	return (
		<Modal
			visible={isVisible}
			animationType="fade"
			transparent={true}
			onRequestClose={onClose}
			{...rest}
		>
			{/* Container Centralizado e Overlay Escuro */}
			<View className={tw("flex-1 justify-center items-center bg-black/70")}>
				{/* Container Principal do Modal */}
				<View
					className={tw(
						"w-11/12 max-w-sm bg-white rounded-xl p-5 items-center",
					)}
				>
					{/* Título do Header */}
					<Text className={tw("text-xs text-gray-700 self-start mb-2")}>
						moda-confirmation
					</Text>

					{/* 🚨 ÁREA REVISADA: Placeholder Cinza Simples (Sem AD complexo) */}
					<View
						// W-full: Ocupa a largura total do modal
						// bg-gray-300: Cor cinza claro (simulando o #D9D9D9 da imagem)
						// justify-center items-center: Centraliza o texto "AD"
						// rounded-lg: Bordas arredondadas
						// mb-7: Margem inferior
						className={tw(
							"w-full h-48 bg-gray-300 justify-center items-center rounded-lg mb-7",
						)}
					>
						{/* Texto "AD" */}
						<Text className={tw("text-base font-bold text-gray-600")}>AD</Text>
					</View>

					{/* Título da Confirmação */}
					<Text className={tw("text-lg font-bold text-black text-center mb-2")}>
						Anuncio divulgado com sucesso!
					</Text>

					{/* Subtexto */}
					<Text
						className={tw(
							"text-sm text-gray-600 text-center leading-5 px-2 mb-8",
						)}
					>
						sua atitude generosa e atenciosa pode fazer toda a diferença!
					</Text>

					{/* Botão de Ação */}
					<TouchableOpacity
						// bg-blue-500: Azul vibrante (simulando a cor da imagem)
						className={tw("w-full bg-blue-500 py-3 rounded-lg items-center")}
						onPress={onContinue}
					>
						<Text className={tw("text-base font-bold text-white")}>
							Continuar
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default AdConfirmationModalTailwind;
