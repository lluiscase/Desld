import { useRouter } from "expo-router";
import {
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSessionStore } from "@/entities/user";
import { ArrowLeft, LogOut } from "@/shared/icons";
import Perfil from "../../../src/components/Perfil";

export default function UserRoute() {
	const router = useRouter();
	const { user, clearSession } = useSessionStore();

	const handleSignOut = async () => {
		await clearSession();
		router.replace("/(auth)/login");
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="px-6 pt-3 pb-2 flex-row items-center">
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Voltar"
					onPress={() => router.back()}
					className="p-1 mr-2"
				>
					<ArrowLeft size={24} color="#000" />
				</TouchableOpacity>
				<Text className="text-xl font-bold text-gray-900">Meu Perfil</Text>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				<View className="items-center py-4 gap-2">
					<Perfil x={120} />
					<Text className="text-2xl font-bold text-gray-800">
						{user?.name || "Usuário AuHelp"}
					</Text>
					<View className="flex-row items-center gap-2 mt-2">
						<View className="bg-blue-400 px-4 py-1.5 rounded-full">
							<Text className="text-white font-bold text-base">15</Text>
						</View>
						<Text className="text-base text-gray-600 font-medium">
							Assistências Concluídas
						</Text>
					</View>
				</View>

				<View className="bg-blue-400 mx-4 rounded-2xl p-5 gap-3 shadow-sm">
					<Text className="text-white font-semibold text-base">
						Nome: {user?.name || "Anna Faustino"}
					</Text>
					<Text className="text-white font-semibold text-base">
						Email: {user?.email || "annabanana@gmail.com"}
					</Text>
					<Text className="text-white font-semibold text-base">
						Telefone: (11) 98765-4321
					</Text>
				</View>

				<View className="px-6 py-6 gap-3">
					<Text className="text-xl font-bold text-gray-800">Preferências</Text>
					<Text className="text-base text-gray-600">Raio de busca: 50 km</Text>
					<Text className="text-base text-gray-600">
						Notificações: Ativadas
					</Text>
					<Text className="text-base text-gray-600">
						Modo anônimo: Desativado
					</Text>
				</View>

				<View className="items-center pt-2">
					<TouchableOpacity
						accessibilityRole="button"
						onPress={handleSignOut}
						className="flex-row items-center gap-2 py-3 px-6 rounded-xl bg-red-50 border border-red-200"
					>
						<LogOut size={20} color="#EF5350" />
						<Text className="text-red-500 font-bold text-base">
							Sair da Conta
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
