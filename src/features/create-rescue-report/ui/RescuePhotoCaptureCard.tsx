import {
	ActivityIndicator,
	Alert,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	Camera,
	Check,
	ImageIcon,
	RotateCw,
	Sparkles,
	X,
} from "@/shared/icons";
import { triggerImpactHaptic, triggerSelectionHaptic } from "@/shared/lib";

export interface RescuePhotoCaptureCardProps {
	photoUri: string | null;
	isLoading?: boolean;
	onTakePhoto: () => Promise<unknown> | unknown;
	onPickFromGallery: () => Promise<unknown> | unknown;
	onClearPhoto: () => void;
	onContinue?: () => void;
	className?: string;
}

export function RescuePhotoCaptureCard({
	photoUri,
	isLoading = false,
	onTakePhoto,
	onPickFromGallery,
	onClearPhoto,
	onContinue,
	className = "",
}: RescuePhotoCaptureCardProps) {
	const handleTakePhotoPress = async () => {
		await triggerImpactHaptic("light");
		await onTakePhoto();
	};

	const handlePickGalleryPress = async () => {
		await triggerImpactHaptic("light");
		await onPickFromGallery();
	};

	const handleClearPress = async () => {
		await triggerImpactHaptic("medium");
		onClearPhoto();
	};

	const handleContinuePress = async () => {
		await triggerSelectionHaptic();
		onContinue?.();
	};

	const handleChangePhotoOptions = () => {
		Alert.alert(
			"Trocar foto",
			"Como você deseja escolher a nova foto do animal?",
			[
				{
					text: "Tirar nova foto com a câmera",
					onPress: handleTakePhotoPress,
				},
				{
					text: "Escolher da galeria",
					onPress: handlePickGalleryPress,
				},
				{
					text: "Cancelar",
					style: "cancel",
				},
			],
		);
	};

	// ESTADO COM FOTO: PREVIEW EM ALTA QUALIDADE
	if (photoUri) {
		return (
			<View
				key="rescue-photo-preview"
				className={`w-full flex-col gap-4 ${className}`}
			>
				{/* Contêiner da Imagem Selecionada */}
				<View className="relative w-full h-[360px] rounded-3xl overflow-hidden border border-gray-200 bg-gray-900 shadow-md">
					<Image
						source={{ uri: photoUri }}
						className="w-full h-full"
						resizeMode="cover"
					/>

					{/* Badge de Confirmação */}
					<View className="absolute top-4 left-4 flex-row items-center bg-black/60 px-3.5 py-1.5 rounded-full">
						<View className="w-5 h-5 rounded-full bg-green-500 items-center justify-center mr-1.5">
							<Check size={12} color="#FFFFFF" strokeWidth={3} />
						</View>
						<Text className="text-white font-ubuntu-medium text-xs">
							Foto selecionada
						</Text>
					</View>

					{/* Botão de Excluir / Descartar */}
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Remover foto"
						activeOpacity={0.7}
						onPress={handleClearPress}
						className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 items-center justify-center active:scale-95"
					>
						<X size={18} color="#FFFFFF" />
					</TouchableOpacity>

					{/* Botão flutuante para trocar foto */}
					<View className="absolute bottom-4 right-4">
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityLabel="Trocar foto"
							activeOpacity={0.85}
							onPress={handleChangePhotoOptions}
							className="flex-row items-center bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100 active:scale-95"
						>
							<RotateCw size={16} color="#42A5F5" />
							<Text className="ml-2 font-ubuntu-bold text-sm text-[#42A5F5]">
								Trocar foto
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Ações Rápidas Abaixo do Preview */}
				<View className="flex-row gap-3">
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Tirar outra foto"
						activeOpacity={0.75}
						onPress={handleTakePhotoPress}
						disabled={isLoading}
						className="flex-1 h-12 bg-gray-100 rounded-2xl flex-row items-center justify-center border border-gray-200 active:bg-gray-200"
					>
						<Camera size={18} color="#42A5F5" />
						<Text className="ml-2 font-ubuntu-medium text-sm text-gray-800">
							Tirar outra
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Escolher outra da galeria"
						activeOpacity={0.75}
						onPress={handlePickGalleryPress}
						disabled={isLoading}
						className="flex-1 h-12 bg-gray-100 rounded-2xl flex-row items-center justify-center border border-gray-200 active:bg-gray-200"
					>
						<ImageIcon size={18} color="#42A5F5" />
						<Text className="ml-2 font-ubuntu-medium text-sm text-gray-800">
							Da galeria
						</Text>
					</TouchableOpacity>
				</View>

				{/* Botão Principal de Avanço */}
				<View className="pt-2">
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel="Continuar com esta foto"
						activeOpacity={0.85}
						onPress={handleContinuePress}
						disabled={isLoading}
						className="w-full h-14 bg-[#42A5F5] rounded-2xl flex-row items-center justify-center shadow-sm active:opacity-90"
					>
						{isLoading ? (
							<ActivityIndicator color="#FFFFFF" />
						) : (
							<Text className="font-ubuntu-bold text-lg text-white">
								Continuar
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	// ESTADO INICIAL / EMPTY STATE: DUAS AÇÕES CENTRAIS E DICAS DE UX
	return (
		<View
			key="rescue-photo-empty"
			className={`w-full flex-col gap-5 ${className}`}
		>
			{/* Moldura Central Ilustrada */}
			<View className="w-full bg-[#F8FAFC] border-2 border-dashed border-blue-200 rounded-3xl p-6 items-center">
				{/* Círculo do Ícone */}
				<View className="w-20 h-20 rounded-full bg-blue-100/70 items-center justify-center mb-4">
					<Camera size={38} color="#42A5F5" />
				</View>

				<Text className="font-ubuntu-bold text-xl text-gray-900 text-center">
					Adicione a foto do animal
				</Text>
				<Text className="font-ubuntu-regular text-sm text-gray-500 text-center leading-5 mt-2 px-2">
					Uma boa imagem ajuda a identificar a raça, porte e estado de saúde
					para acelerar o resgate.
				</Text>

				{/* Card de Dica Rápida */}
				<View className="w-full flex-row items-center bg-blue-50/80 border border-blue-100 rounded-2xl p-3.5 mt-5">
					<Sparkles size={20} color="#42A5F5" />
					<Text className="flex-1 font-ubuntu-medium text-xs text-blue-900 ml-2.5 leading-4">
						A foto será tirada com a câmera nativa do seu celular, garantindo
						foco e qualidade máxima.
					</Text>
				</View>
			</View>

			{/* Botões de Ação Central */}
			<View className="w-full gap-3 pt-1">
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Tirar foto agora"
					activeOpacity={0.85}
					onPress={handleTakePhotoPress}
					disabled={isLoading}
					className="w-full h-14 bg-[#42A5F5] rounded-2xl flex-row items-center justify-center shadow-sm active:opacity-90"
				>
					{isLoading ? (
						<ActivityIndicator color="#FFFFFF" />
					) : (
						<>
							<Camera size={22} color="#FFFFFF" />
							<Text className="ml-2.5 font-ubuntu-bold text-base text-white">
								Tirar foto agora
							</Text>
						</>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Escolher da galeria"
					activeOpacity={0.7}
					onPress={handlePickGalleryPress}
					disabled={isLoading}
					className="w-full h-14 bg-gray-100 rounded-2xl flex-row items-center justify-center border border-gray-200 active:bg-gray-200"
				>
					<ImageIcon size={22} color="#42A5F5" />
					<Text className="ml-2.5 font-ubuntu-bold text-base text-gray-800">
						Escolher da galeria
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
