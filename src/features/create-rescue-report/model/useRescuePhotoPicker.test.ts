import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	executeCameraCapture,
	executeGalleryPick,
	notifyPermissionDenied,
} from "./useRescuePhotoPicker";

vi.mock("expo-image-picker", () => ({
	requestCameraPermissionsAsync: vi.fn(),
	requestMediaLibraryPermissionsAsync: vi.fn(),
	launchCameraAsync: vi.fn(),
	launchImageLibraryAsync: vi.fn(),
}));

vi.mock("react-native", () => ({
	Alert: {
		alert: vi.fn(),
	},
	Linking: {
		openSettings: vi.fn(async () => {}),
	},
	Platform: {
		OS: "android",
	},
}));

vi.mock("@/shared/lib", () => ({
	triggerSelectionHaptic: vi.fn(async () => {}),
}));

describe("Create Rescue Report - useRescuePhotoPicker Core Logic", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("notifyPermissionDenied", () => {
		it("deve alertar solicitando abertura das configurações quando canAskAgain for false", () => {
			const permission = {
				granted: false,
				canAskAgain: false,
				expires: "never",
				status: "denied",
			} as unknown as ImagePicker.PermissionResponse;

			notifyPermissionDenied(permission, "câmera");

			expect(Alert.alert).toHaveBeenCalledWith(
				"Permissão necessária",
				expect.stringContaining("configurações do seu celular"),
				expect.arrayContaining([
					expect.objectContaining({ text: "Agora não" }),
					expect.objectContaining({ text: "Abrir Configurações" }),
				]),
			);
		});

		it("deve exibir alerta comum quando canAskAgain for true", () => {
			const permission = {
				granted: false,
				canAskAgain: true,
				expires: "never",
				status: "denied",
			} as unknown as ImagePicker.PermissionResponse;

			notifyPermissionDenied(permission, "galeria");

			expect(Alert.alert).toHaveBeenCalledWith(
				"Permissão necessária",
				"É necessário permitir o acesso à galeria para anexar a foto do animal.",
			);
		});
	});

	describe("executeCameraCapture", () => {
		it("deve capturar imagem da câmera nativa quando a permissão for concedida", async () => {
			vi.mocked(
				ImagePicker.requestCameraPermissionsAsync,
			).mockResolvedValueOnce({
				granted: true,
				canAskAgain: true,
				expires: "never",
				status: "granted" as ImagePicker.PermissionStatus,
			});

			vi.mocked(ImagePicker.launchCameraAsync).mockResolvedValueOnce({
				canceled: false,
				assets: [
					{
						uri: "file:///camera_rescue_dog.jpg",
						width: 1920,
						height: 1080,
					} as unknown as ImagePicker.ImagePickerAsset,
				],
			});

			const uri = await executeCameraCapture(0.9);

			expect(uri).toBe("file:///camera_rescue_dog.jpg");
			expect(ImagePicker.launchCameraAsync).toHaveBeenCalledWith({
				mediaTypes: ["images"],
				allowsEditing: false,
				quality: 0.9,
			});
		});

		it("deve retornar null se a permissão de câmera for negada", async () => {
			vi.mocked(
				ImagePicker.requestCameraPermissionsAsync,
			).mockResolvedValueOnce({
				granted: false,
				canAskAgain: true,
				expires: "never",
				status: "denied" as ImagePicker.PermissionStatus,
			});

			const uri = await executeCameraCapture();

			expect(uri).toBeNull();
			expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
			expect(Alert.alert).toHaveBeenCalled();
		});

		it("deve retornar null se a captura da câmera for cancelada pelo usuário", async () => {
			vi.mocked(
				ImagePicker.requestCameraPermissionsAsync,
			).mockResolvedValueOnce({
				granted: true,
				canAskAgain: true,
				expires: "never",
				status: "granted" as ImagePicker.PermissionStatus,
			});

			vi.mocked(ImagePicker.launchCameraAsync).mockResolvedValueOnce({
				canceled: true,
				assets: null,
			});

			const uri = await executeCameraCapture();

			expect(uri).toBeNull();
		});
	});

	describe("executeGalleryPick", () => {
		it("deve selecionar imagem da galeria nativa quando a permissão for concedida", async () => {
			vi.mocked(
				ImagePicker.requestMediaLibraryPermissionsAsync,
			).mockResolvedValueOnce({
				granted: true,
				canAskAgain: true,
				expires: "never",
				status: "granted" as ImagePicker.PermissionStatus,
			});

			vi.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValueOnce({
				canceled: false,
				assets: [
					{
						uri: "file:///gallery_rescue_cat.jpg",
						width: 1200,
						height: 800,
					} as unknown as ImagePicker.ImagePickerAsset,
				],
			});

			const uri = await executeGalleryPick(0.85);

			expect(uri).toBe("file:///gallery_rescue_cat.jpg");
			expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
				mediaTypes: ["images"],
				allowsEditing: false,
				quality: 0.85,
			});
		});

		it("deve retornar null se a permissão da biblioteca for negada", async () => {
			vi.mocked(
				ImagePicker.requestMediaLibraryPermissionsAsync,
			).mockResolvedValueOnce({
				granted: false,
				canAskAgain: true,
				expires: "never",
				status: "denied" as ImagePicker.PermissionStatus,
			});

			const uri = await executeGalleryPick();

			expect(uri).toBeNull();
			expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
			expect(Alert.alert).toHaveBeenCalled();
		});

		it("deve retornar null se o usuário cancelar o seletor da galeria", async () => {
			vi.mocked(
				ImagePicker.requestMediaLibraryPermissionsAsync,
			).mockResolvedValueOnce({
				granted: true,
				canAskAgain: true,
				expires: "never",
				status: "granted" as ImagePicker.PermissionStatus,
			});

			vi.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValueOnce({
				canceled: true,
				assets: null,
			});

			const uri = await executeGalleryPick();

			expect(uri).toBeNull();
		});
	});
});
