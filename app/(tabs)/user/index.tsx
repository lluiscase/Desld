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
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 20 : 28;

	return (
		<View className="flex-1 bg-white">
			{/* Header Fixo no Topo com Safe Area */}
			<View
				style={{ paddingTop: topPadding }}
				className="px-4 pb-4 flex-row items-center justify-between bg-white border-b border-gray-100 shadow-sm z-10"
			>
				<TouchableOpacity
					className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-gray-100"
					onPress={handleGoBack}
					accessibilityRole="button"
					accessibilityLabel="Voltar"
				>
					<MaterialIcons name="arrow-back" size={26} color="#1F2937" />
				</TouchableOpacity>
				<Text className="font-ubuntu-bold text-2xl text-gray-900 text-center flex-1">
					Meu Perfil
				</Text>
				<View className="w-10" />
			</View>

			{/* Conteúdo Rolável sob o Header Fixo */}
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingTop: 16,
					paddingBottom: bottomPadding,
				}}
				showsVerticalScrollIndicator={false}
			>
				{/* Avatar e Estatística */}
				<View className="items-center pb-6">
					<Perfil size={120} />
					<Text className="font-ubuntu-bold text-2xl text-gray-900 mt-3">
						{user?.name || "Anna Faustino"}
					</Text>
					<View className="flex-row items-center gap-2 mt-2 bg-[#42A5F5]/10 px-4 py-1.5 rounded-full">
						<Text className="font-ubuntu-bold text-base text-[#42A5F5]">
							15
						</Text>
						<Text className="font-ubuntu-medium text-sm text-[#0D47A1]">
							Assistências
						</Text>
					</View>
				</View>

				{/* Card de Dados Pessoais */}
				<View className="bg-[#42A5F5] p-5 rounded-2xl mb-4 shadow-sm">
					<Text className="font-ubuntu-bold text-lg text-white mb-3">
						Informações Pessoais
					</Text>
					<View className="gap-2">
						<Text className="font-ubuntu-regular text-sm text-white/90">
							Nome: {user?.name || "Anna Faustino"}
						</Text>
						<Text className="font-ubuntu-regular text-sm text-white/90">
							Email: {user?.email || "annabanana@gmail.com"}
						</Text>
						<Text className="font-ubuntu-regular text-sm text-white/90">
							Telefone: (11) 1234-5678
						</Text>
						<Text className="font-ubuntu-regular text-sm text-white/90">
							CPF: **** **** ***-02
						</Text>
					</View>
				</View>

				{/* Card de Preferências */}
				<View className="bg-gray-50 border border-gray-200 p-5 rounded-2xl mb-6">
					<Text className="font-ubuntu-bold text-lg text-gray-900 mb-3">
						Preferências
					</Text>
					<View className="gap-2">
						<Text className="font-ubuntu-regular text-sm text-gray-700">
							Distância de procura: 50 km
						</Text>
						<Text className="font-ubuntu-regular text-sm text-gray-700">
							Notificações sobre respostas: Ligado
						</Text>
						<Text className="font-ubuntu-regular text-sm text-gray-700">
							Modo anônimo: Desligado
						</Text>
					</View>
				</View>

				{/* Botão Sair da Conta */}
				<TouchableOpacity
					onPress={handleSignOut}
					activeOpacity={0.7}
					className="py-3 items-center justify-center rounded-xl border border-red-200 bg-red-50"
				>
					<Text className="font-ubuntu-bold text-red-600 text-base">
						Sair da conta
					</Text>
				</TouchableOpacity>
			</ScrollView>

			<StatusBar style="dark" />
		</View>
	);
}
