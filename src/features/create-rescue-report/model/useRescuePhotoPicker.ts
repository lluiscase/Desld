import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert, Linking } from "react-native";
import { triggerSelectionHaptic } from "@/shared/lib";

export interface UseRescuePhotoPickerOptions {
	initialPhotoUri?: string | null;
	onPhotoSelected?: (uri: string) => void;
	quality?: number;
}

export interface UseRescuePhotoPickerReturn {
	photoUri: string | null;
	isLoading: boolean;
	error: string | null;
	takePhoto: () => Promise<string | null>;
	pickFromGallery: () => Promise<string | null>;
	clearPhoto: () => void;
	setPhotoUri: (uri: string | null) => void;
}

/**
 * Notifica o usuário caso a permissão do sistema tenha sido recusada.
 */
export function notifyPermissionDenied(
	permission: ImagePicker.PermissionResponse,
	type: "câmera" | "galeria",
): void {
	if (!permission.canAskAgain) {
		Alert.alert(
			"Permissão necessária",
			`O acesso à ${type} está desativado nas configurações do seu celular. Deseja abrir as configurações para habilitar?`,
			[
				{ text: "Agora não", style: "cancel" },
				{
					text: "Abrir Configurações",
					onPress: () => {
						Linking.openSettings().catch(() => {});
					},
				},
			],
		);
	} else {
		Alert.alert(
			"Permissão necessária",
			`É necessário permitir o acesso à ${type} para anexar a foto do animal.`,
		);
	}
}

/**
 * Dispara o fluxo nativo de câmera com checagem de permissão e sem stream de vídeo contínuo.
 */
export async function executeCameraCapture(
	quality = 0.9,
): Promise<string | null> {
	const permission = await ImagePicker.requestCameraPermissionsAsync();
	if (!permission.granted) {
		notifyPermissionDenied(permission, "câmera");
		return null;
	}

	const result = await ImagePicker.launchCameraAsync({
		mediaTypes: ["images"],
		allowsEditing: false,
		quality,
	});

	if (!result.canceled && result.assets && result.assets.length > 0) {
		return result.assets[0].uri;
	}

	return null;
}

/**
 * Dispara o seletor nativo de fotos da galeria com checagem de permissão.
 */
export async function executeGalleryPick(
	quality = 0.9,
): Promise<string | null> {
	const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
	if (!permission.granted) {
		notifyPermissionDenied(permission, "galeria");
		return null;
	}

	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ["images"],
		allowsEditing: false,
		quality,
	});

	if (!result.canceled && result.assets && result.assets.length > 0) {
		return result.assets[0].uri;
	}

	return null;
}

/**
 * Hook de domínio para captura e seleção de fotos de resgate de pets.
 * Utiliza expo-image-picker disparando a câmera nativa do SO (com HDR/pós-processamento)
 * ou a galeria do sistema operacional, sem manter stream de vídeo contínuo em memória.
 */
export function useRescuePhotoPicker(
	options: UseRescuePhotoPickerOptions = {},
): UseRescuePhotoPickerReturn {
	const { initialPhotoUri = null, onPhotoSelected, quality = 0.9 } = options;

	const [photoUri, setPhotoUri] = useState<string | null>(initialPhotoUri);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const takePhoto = useCallback(async (): Promise<string | null> => {
		try {
			setIsLoading(true);
			setError(null);

			const selectedUri = await executeCameraCapture(quality);
			if (selectedUri) {
				setPhotoUri(selectedUri);
				onPhotoSelected?.(selectedUri);
				await triggerSelectionHaptic();
				return selectedUri;
			}

			return null;
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Não foi possível abrir a câmera nativa.";
			setError(errorMessage);
			Alert.alert(
				"Erro na captura",
				"Ocorreu uma falha ao abrir a câmera do celular. Tente novamente.",
			);
			return null;
		} finally {
			setIsLoading(false);
		}
	}, [quality, onPhotoSelected]);

	const pickFromGallery = useCallback(async (): Promise<string | null> => {
		try {
			setIsLoading(true);
			setError(null);

			const selectedUri = await executeGalleryPick(quality);
			if (selectedUri) {
				setPhotoUri(selectedUri);
				onPhotoSelected?.(selectedUri);
				await triggerSelectionHaptic();
				return selectedUri;
			}

			return null;
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Não foi possível acessar as fotos da galeria.";
			setError(errorMessage);
			Alert.alert(
				"Erro na galeria",
				"Ocorreu uma falha ao carregar as fotos da galeria. Tente novamente.",
			);
			return null;
		} finally {
			setIsLoading(false);
		}
	}, [quality, onPhotoSelected]);

	const clearPhoto = useCallback(() => {
		setPhotoUri(null);
		setError(null);
	}, []);

	return {
		photoUri,
		isLoading,
		error,
		takePhoto,
		pickFromGallery,
		clearPhoto,
		setPhotoUri,
	};
}
