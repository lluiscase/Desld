import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Carousel from "../../../src/components/Carousel";
import TextArea from "../../../src/components/TextArea";

const handleGoBack = () => {
	router.back();
};

export default function PreVisulation() {
	return (
		<View>
			<View className="p-8">
				<TouchableOpacity className="mr-3" onPress={handleGoBack}>
					<MaterialIcons name={"arrow-back"} size={25} color="#000" />
				</TouchableOpacity>
			</View>
			<Carousel />
			<View className="p-8">
				<View className="flex-row justify-between">
					<View className="flex-row items-center justify-center gap-1">
						<Text className="uppercase text-xl font-bold">rex</Text>
            <MaterialIcons name={"edit"} size={25} color="#000" />
					</View>
					<Text className="bg-red p-2 rounded-xl border text-white border-gray-500">Perdido</Text>
				</View>
				<View>
					<Text>Cachorro</Text>
				</View>
				<View>
					<TextArea />
				</View>
				<View className="flex-row">
					<MaterialIcons name={"location-on"} size={25} color="#000" />
					<Text>Rua das Flores, Centro</Text>
					<MaterialIcons name={"edit"} size={25} color="#000" />
				</View>
				<View className="flex-row">
					<MaterialIcons name={"event"} size={25} color="#000" />
					<Text>Perdido(a) há 5 dias! </Text>
					<MaterialIcons name={"notifications"} size={25} color="#000" />
					<MaterialIcons name={"edit"} size={25} color="#000" />
				</View>
				<View className="flex-row">
					<MaterialIcons name={"person"} size={25} color="#000" />
					<Text>Reportado por Maria Silva</Text>
					<MaterialIcons name={"edit"} size={25} color="#000" />
				</View>
				<View className="flex-row">
					<MaterialIcons name={"call"} size={25} color="#000" />
					<Text>11 90000-0000</Text>
					<MaterialIcons name={"edit"} size={25} color="#000" />
				</View>
			</View>
		</View>
	);
}
