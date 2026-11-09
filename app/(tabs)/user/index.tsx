import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { UserAvatarButton as Perfil, useSessionStore } from "@/entities/user";

export default function User() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { user, clearSession } = useSessionStore();

	const handleGoBack = () => {
		router.back();
	};

	const handleSignOut = async () => {
		await clearSession();
		router.replace("/(auth)/login" as any);
	};

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 20 : 32;

	return (
		<View className="flex-1 bg-white">
			{/* Top Bar apenas com botão voltar (sem título conforme design) */}
			<View style={{ paddingTop: topPadding }} className="px-4 pb-2 bg-white">
				<TouchableOpacity
					className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-gray-100"
					onPress={handleGoBack}
					accessibilityRole="button"
					accessibilityLabel="Voltar"
				>
					<MaterialIcons name="arrow-back" size={26} color="#000000" />
				</TouchableOpacity>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
				{/* Avatar e Estatística Centralizados */}
				<View className="items-center pb-6">
					<Perfil size={110} />
					<Text className="font-ubuntu-bold text-2xl text-gray-900 mt-3 mb-2">
						{user?.name || "Anna"}
					</Text>

					{/* Badge Circular de Assistências */}
					<View className="items-center">
						<View className="w-14 h-14 rounded-full bg-[#42A5F5] items-center justify-center shadow-sm">
							<Text className="font-ubuntu-bold text-2xl text-white">15</Text>
						</View>
						<Text className="font-ubuntu-regular text-sm text-gray-800 mt-1">
							Assistências
						</Text>
					</View>
				</View>

				{/* Card Azul de Informações com bordas arredondadas superiores */}
				<View className="bg-[#42A5F5] rounded-t-[32px] pt-8 pb-14 px-6">
					<View className="gap-3">
						<Text className="font-ubuntu-bold text-base text-white">
							Nome:{" "}
							<Text className="font-ubuntu-regular text-white/95">
								{user?.name ? `${user.name} Faustino` : "Anna Faustino"}
							</Text>
						</Text>
						<Text className="font-ubuntu-bold text-base text-white">
							Email:{" "}
							<Text className="font-ubuntu-regular text-white/95">
								{user?.email || "Annabanana@gmail.com"}
							</Text>
						</Text>
						<Text className="font-ubuntu-bold text-base text-white">
							Número:{" "}
							<Text className="font-ubuntu-regular text-white/95">
								(11) 1234-5678
							</Text>
						</Text>
						<Text className="font-ubuntu-bold text-base text-white">
							CPF:{" "}
							<Text className="font-ubuntu-regular text-white/95">
								**** **** ***-02
							</Text>
						</Text>
					</View>
				</View>

				{/* Card Branco de Preferências sobreposto ao azul (-mt-8) */}
				<View
					className="bg-white rounded-t-[32px] -mt-8 pt-8 px-6 shadow-sm"
					style={{ paddingBottom: bottomPadding }}
				>
					<Text className="font-ubuntu-bold text-2xl text-gray-900 mb-6">
						Preferências
					</Text>

					<View className="gap-5">
						<View className="flex-row items-center justify-between">
							<Text className="font-ubuntu-bold text-base text-gray-900">
								Distancia de procura:
							</Text>
							<Text className="font-ubuntu-regular text-base text-gray-700">
								50 km
							</Text>
						</View>

						<View className="flex-row items-center justify-between">
							<Text className="font-ubuntu-bold text-base text-gray-900">
								Notificações sobre respostas:
							</Text>
							<Text className="font-ubuntu-regular text-base text-gray-700">
								Ligado
							</Text>
						</View>

						<View className="flex-row items-center justify-between">
							<Text className="font-ubuntu-bold text-base text-gray-900">
								Modo anônimo:
							</Text>
							<Text className="font-ubuntu-regular text-base text-gray-700">
								Desligado
							</Text>
						</View>
					</View>

					{/* Botão Log out em vermelho */}
					<TouchableOpacity
						onPress={handleSignOut}
						activeOpacity={0.7}
						className="mt-12 py-2 items-center justify-center"
					>
						<Text className="font-ubuntu-medium text-red-500 text-base text-center">
							Log out
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<StatusBar style="dark" />
		</View>
	);
}
