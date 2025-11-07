import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button } from "../../../src/components/Button";

export default function Photo() {
	const [cameraPermission, requestCameraPermission] = useCameraPermissions();
	const [mediaLibraryPermission, requestMediaLibraryPermission] =
		ImagePicker.useMediaLibraryPermissions();

	const [facing, setFacing] = useState<"front" | "back">("back");
	const [photoUri, setPhotoUri] = useState<string | null>(null);
	const cameraRef = useRef<CameraView>(null);
	const router = useRouter();
	const isFocused = useIsFocused();

	useEffect(() => {
		requestCameraPermission();
		requestMediaLibraryPermission();
	}, [requestCameraPermission, requestMediaLibraryPermission]);

	function toggleFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	const takePhoto = async () => {
		// if (cameraRef.current) {
		// 	const options = { quality: 0.7, base64: true, exif: false };
		// 	const photo = await cameraRef.current.takePictureAsync(options);
		// 	if (photo) {
		// 		setPhotoUri(photo.uri);
		// 		console.log("Foto tirada:", photo.uri);

		// 		if (mediaLibraryPermission?.granted) {
		// 			await MediaLibrary.saveToLibraryAsync(photo.uri);
		// 			Alert.alert("Sucesso", "Foto salva na galeria!");
		// 		}
		// 	}
		// }
		router.push("/(tabs)/post/typeAnimal");
	};

	const openMediaLibrary = async () => {
		if (mediaLibraryPermission?.granted) {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				quality: 1,
			});

			if (!result.canceled && result.assets && result.assets.length > 0) {
				setPhotoUri(result.assets[0].uri);
				console.log("Foto selecionada da galeria:", result.assets[0].uri);
			}
		} else {
			Alert.alert(
				"Permissão Negada",
				"Não temos permissão para acessar sua galeria.",
			);
		}
	};

	if (!cameraPermission || !mediaLibraryPermission) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<Text>Carregando permissões...</Text>
			</View>
		);
	}

	if (!cameraPermission.granted) {
		return (
			<View className="flex-1 justify-center items-center px-8 bg-white pt-24 pb-10">
				<Text>Acesso à câmera negado.</Text>
        <Button text="Next" href="/(tabs)/post/typeAnimal"/>
			</View>
		);
	}

	if (photoUri) {
		return (
			<View className="flex-1 flex-col bg-white">
				<Image
					source={{ uri: photoUri }}
					className="flex-1 w-full h-full"
					resizeMode="cover"
				/>
				<View className="absolute bottom-0 w-full flex-row justify-around items-center p-4 bg-black/50">
					<TouchableOpacity
						onPress={() => setPhotoUri(null)}
						className="p-3 rounded-full bg-gray-500"
					>
						<MaterialIcons name="close" size={30} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							Alert.alert("Confirmar Foto", "Prosseguir com esta foto?");
							router.push("/(tabs)/post/typeAnimal");
						}}
						className="p-3 rounded-full bg-blue-500"
					>
						<MaterialIcons name="check" size={30} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-black">
			{isFocused && (
				<CameraView
					ref={cameraRef}
					className="flex-1"
					facing={facing}
					style={{ width: "100%", height: "100%" }}
				>
					<View className="absolute top-0 w-full flex-row justify-between items-start px-4 pt-12">
						<TouchableOpacity
							onPress={() => router.back()}
							className="p-2 rounded-full bg-white/50"
						>
							<MaterialIcons name="arrow-back" size={28} color="black" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={toggleFacing}
							className="p-2 rounded-full bg-white/50 ml-auto"
						>
							<MaterialIcons
								name="flip-camera-android"
								size={28}
								color="black"
							/>
						</TouchableOpacity>
					</View>

					<View className="absolute bottom-0 w-full flex-row justify-around items-center p-6">
						<TouchableOpacity
							onPress={openMediaLibrary}
							className="p-4 rounded-full bg-gray-600"
						>
							<MaterialIcons name="photo-library" size={30} color="white" />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={takePhoto}
							className="w-20 h-20 rounded-full border-4 border-white bg-white/30 justify-center items-center"
						>
							<View className="w-16 h-16 rounded-full bg-white" />
						</TouchableOpacity>

						<View className="w-16 h-16" />
					</View>
				</CameraView>
			)}
		</View>
	);
}
