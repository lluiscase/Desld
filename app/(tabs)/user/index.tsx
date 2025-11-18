import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Perfil from "../../../src/components/Perfil";
import { useAuth } from "../../../src/context/authContext";

export default function User() {
	const { signOut } = useAuth();
	const handleGoBack = () => {
		router.back();
	};

	const handleSignOut = () => {
		signOut();
		router.replace("/login");
	};

	return (
		<View className="flex-1 pt-24 bg-white">
			<View className="px-12">
				<TouchableOpacity className="mr-3" onPress={handleGoBack}>
					<MaterialIcons name={"arrow-back"} size={25} color="#000" />
				</TouchableOpacity>
			</View>
			<ScrollView>
				<View className="flex items-center gap-2 pb-4">
					<Perfil x={150} />
					<Text className="text-2xl pb-4">Pit bull</Text>
					<Text className="bg-blue-400 text-4xl p-3 rounded-full text-white font-bold">
						15
					</Text>
					<Text className="text-xl">Assistências</Text>
				</View>
				<View className="bg-blue-400 px-12 rounded-t-3xl pt-6 pb-12 gap-4">
					<Text className="text-xl text-white">Nome: Anna Faustino</Text>
					<Text className="text-xl text-white">
						Email: Annabanana@gmail.com
					</Text>
					<Text className="text-xl text-white">Número: (11) 1234-5678</Text>
					<Text className="text-xl text-white">CPF: **** **** ***-02</Text>
				</View>
				<View className="bg-white px-12 rounded-t-3xl py-4 gap-4 -mt-8 ">
					<Text className="text-3xl">Preferências</Text>
					<Text className="text-xl ">
						Distancia de procura: 50 km
					</Text>
					<Text className="text-xl ">
						Notificações sobre respostas: Ligado
					</Text>
					<Text className="text-xl">Modo anônimo: Desligado</Text>
				</View>
				<View className="flex items-center pt-4">
          <TouchableOpacity onPress={handleSignOut}>
            <Text className="text-red text-center text-lg">
              Sair da conta
            </Text>
				  </TouchableOpacity>
        </View>
			</ScrollView>
		</View>
	);
}
