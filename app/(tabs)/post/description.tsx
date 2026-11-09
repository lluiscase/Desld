import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RescueTagSelector as TagSelector } from "@/features/create-rescue-report";
import { SearchInput as InputSearch } from "@/features/search-pets";
import { AppButton as Button, TextArea } from "@/shared/ui";

export default function Description() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const handleGoBack = () => {
		router.back();
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
				{/* Topo e Formulário */}
				<View>
					{/* Header Simétrico e Fluido */}
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
							Descrição
						</Text>
						<View className="w-10" />
					</View>

					{/* Bloco 1: Selecione o animal */}
					<View className="mb-6">
						<InputSearch
							placeholder="ex: cachorro"
							showLabel="Selecione qual animal:"
						/>
					</View>

					{/* Bloco 2: Seletor de Tags */}
					<View className="mb-6">
						<TagSelector />
					</View>

					{/* Bloco 3: Descrição adicional */}
					<View className="mb-2">
						<Text className="font-ubuntu-bold text-xl text-gray-800 mb-2">
							Descrição adicional:
						</Text>
						<TextArea />
					</View>
				</View>

				{/* Ações Inferiores com Respiro de 32px */}
				<View className="pt-8">
					<Button text="Próximo" href="/(tabs)/post/preVisulation" />
					<Link href="/(tabs)/post" asChild>
						<TouchableOpacity
							activeOpacity={0.7}
							className="w-full items-center justify-center pt-4 pb-2"
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
