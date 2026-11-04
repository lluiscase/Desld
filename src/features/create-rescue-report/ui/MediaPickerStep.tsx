import * as ImagePicker from "expo-image-picker";
import {
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Camera, ImageIcon, Plus, X } from "@/shared/icons";

export interface MediaPickerStepProps {
	images: string[];
	onImagesChange: (images: string[]) => void;
	maxImages?: number;
	error?: string;
}

export function MediaPickerStep({
	images = [],
	onImagesChange,
	maxImages = 4,
	error,
}: MediaPickerStepProps) {
	const handlePickFromGallery = async () => {
		if (images.length >= maxImages) {
			Alert.alert(
				"Limite atingido",
				`Você pode adicionar no máximo ${maxImages} fotos.`,
			);
			return;
		}

		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permission.granted) {
			Alert.alert(
				"Permissão necessária",
				"É necessário permitir o acesso à galeria para enviar fotos.",
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsMultipleSelection: true,
			selectionLimit: maxImages - images.length,
			quality: 0.8,
		});

		if (!result.canceled && result.assets && result.assets.length > 0) {
			const newUris = result.assets.map((asset) => asset.uri);
			onImagesChange([...images, ...newUris].slice(0, maxImages));
		}
	};

	const handleTakePhoto = async () => {
		if (images.length >= maxImages) {
			Alert.alert(
				"Limite atingido",
				`Você pode adicionar no máximo ${maxImages} fotos.`,
			);
			return;
		}

		const permission = await ImagePicker.requestCameraPermissionsAsync();
		if (!permission.granted) {
			Alert.alert(
				"Permissão necessária",
				"É necessário permitir o acesso à câmera para fotografar o pet.",
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			quality: 0.8,
		});

		if (!result.canceled && result.assets && result.assets.length > 0) {
			const uri = result.assets[0].uri;
			onImagesChange([...images, uri]);
		}
	};

	const handleRemoveImage = (indexToRemove: number) => {
		onImagesChange(images.filter((_, idx) => idx !== indexToRemove));
	};

	return (
		<View className="w-full gap-3">
			<Text className="text-gray-700 font-medium text-sm">
				Fotos do Animal ({images.length}/{maxImages})
			</Text>

			{/* Botões de Ação para Adicionar Fotos */}
			<View className="flex-row gap-3">
				<TouchableOpacity
					accessibilityRole="button"
					onPress={handlePickFromGallery}
					className="flex-1 flex-row items-center justify-center p-3.5 bg-gray-100 rounded-xl border border-gray-200"
				>
					<ImageIcon size={20} color="#42A5F5" />
					<Text className="ml-2 font-semibold text-sm text-gray-700">
						Galeria
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					accessibilityRole="button"
					onPress={handleTakePhoto}
					className="flex-1 flex-row items-center justify-center p-3.5 bg-gray-100 rounded-xl border border-gray-200"
				>
					<Camera size={20} color="#42A5F5" />
					<Text className="ml-2 font-semibold text-sm text-gray-700">
						Câmera
					</Text>
				</TouchableOpacity>
			</View>

			{/* Lista de Fotos Selecionadas */}
			{images.length > 0 ? (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ gap: 10, paddingVertical: 4 }}
				>
					{images.map((uri, index) => (
						<View
							key={uri}
							className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300"
						>
							<Image
								source={{ uri }}
								className="w-full h-full"
								resizeMode="cover"
							/>
							<TouchableOpacity
								accessibilityRole="button"
								accessibilityLabel="Remover foto"
								onPress={() => handleRemoveImage(index)}
								className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
							>
								<X size={14} color="#FFFFFF" />
							</TouchableOpacity>
						</View>
					))}

					{images.length < maxImages ? (
						<TouchableOpacity
							accessibilityRole="button"
							onPress={handlePickFromGallery}
							className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center bg-gray-50"
						>
							<Plus size={24} color="#767676" />
							<Text className="text-xs text-gray-500 mt-1">Mais</Text>
						</TouchableOpacity>
					) : null}
				</ScrollView>
			) : (
				<View className="p-6 border-2 border-dashed border-gray-300 rounded-xl items-center justify-center bg-gray-50">
					<ImageIcon size={32} color="#A0A0A0" />
					<Text className="text-gray-500 text-xs text-center mt-2">
						Nenhuma foto selecionada. Adicione fotos nítidas para ajudar na
						identificação.
					</Text>
				</View>
			)}

			{error ? (
				<Text className="text-red-500 text-xs font-medium">{error}</Text>
			) : null}
		</View>
	);
}
