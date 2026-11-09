import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RescueSituationCarousel as CorouselPost } from "@/features/create-rescue-report";
import { AppButton as Button } from "@/shared/ui";

export default function Situation() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const handleGoBack = () => {
		router.back();
	};

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	return (
		<View
			style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}
			className="flex-1 flex-col bg-white justify-between"
		>
			{/* Header Simétrico e Fluido */}
			<View className="px-4">
				<View className="flex-row items-center justify-between pb-2">
					<TouchableOpacity
						className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-gray-100"
						onPress={handleGoBack}
						accessibilityRole="button"
						accessibilityLabel="Voltar"
					>
						<MaterialIcons name="arrow-back" size={26} color="#1F2937" />
					</TouchableOpacity>
					<Text className="font-ubuntu-bold text-2xl text-gray-900 text-center flex-1">
						Tipo de anúncio
					</Text>
					<View className="w-10" />
				</View>
			</View>

			{/* Carrossel de Situação */}
			<View className="my-auto py-2">
				<CorouselPost />
			</View>

			{/* Ações Inferiores com 16px lateral */}
			<View className="px-4 pt-4">
				<Button text="Próximo" href="/(tabs)/post/description" />
				<Link
					className="font-ubuntu-medium text-center pt-4 text-red text-base active:opacity-70"
					href="/(tabs)/post"
				>
					Cancelar
				</Link>
			</View>

			<StatusBar style="dark" />
		</View>
	);
}
