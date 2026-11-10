import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
	RescuePhotoCaptureCard,
	useRescuePhotoPicker,
} from "@/features/create-rescue-report";

export default function PhotoScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const params = useLocalSearchParams<{ initialPhotoUri?: string }>();

	const { photoUri, isLoading, takePhoto, pickFromGallery, clearPhoto } =
		useRescuePhotoPicker({
			initialPhotoUri: params.initialPhotoUri,
		});

	const handleGoBack = () => {
		router.back();
	};

	const handleContinue = () => {
		if (photoUri) {
			router.push({
				pathname: "/(tabs)/post/situation",
				params: { photoUri },
			});
		} else {
			router.push("/(tabs)/post/situation");
		}
	};

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<View className="flex-1 bg-white">
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
					paddingTop: topPadding,
					paddingBottom: bottomPadding,
					paddingHorizontal: 16,
				}}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				{/* Topo e Header Simétrico */}
				<View>
					<View className="flex-row items-center justify-between pb-6">
						<TouchableOpacity
							className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-gray-100"
							onPress={handleGoBack}
							accessibilityRole="button"
							accessibilityLabel="Voltar"
						>
							<MaterialIcons name="arrow-back" size={26} color="#1F2937" />
						</TouchableOpacity>

						<Text className="font-ubuntu-bold text-2xl text-gray-900 text-center flex-1">
							Foto do animal
						</Text>

						<View className="w-10" />
					</View>

					{/* Card Central de Captura e Seleção de Foto */}
					<RescuePhotoCaptureCard
						photoUri={photoUri}
						isLoading={isLoading}
						onTakePhoto={takePhoto}
						onPickFromGallery={pickFromGallery}
						onClearPhoto={clearPhoto}
						onContinue={handleContinue}
					/>
				</View>

				{/* Ação de Cancelar no Rodapé */}
				<View className="pt-6">
					<Link href="/(tabs)/post" asChild>
						<TouchableOpacity
							activeOpacity={0.7}
							className="w-full items-center justify-center pt-3 pb-2"
							accessibilityRole="button"
							accessibilityLabel="Cancelar anúncio"
						>
							<Text
								style={{ color: "#EF5350" }}
								className="font-ubuntu-medium text-base text-center"
							>
								Cancelar
							</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</ScrollView>

			<StatusBar style="dark" />
		</View>
	);
}
