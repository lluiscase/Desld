import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "../../../src/components/Button";
import InputSearch from "../../../src/components/Search";
import TagSelector from "../../../src/components/TagSelector";
import TextArea from "../../../src/components/TextArea";

const handleGoBack = () => {
	router.back();
};

export default function Description() {
	return (
		<View className="flex-1 px-8 bg-white pt-24 pb-16 ">
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
				showsHorizontalScrollIndicator={false}
			>
				<View className="flex flex-row ">
					<TouchableOpacity className="mr-3 pt-2" onPress={handleGoBack}>
						<MaterialIcons name={"arrow-back"} size={25} color="#000" />
					</TouchableOpacity>
					<Text className="text-3xl font-bold text-center pl-20">
						{"Descrição"}
					</Text>
				</View>
				<InputSearch
					placeholder="ex: cachorro"
					showLabel="Selecione qual animal:"
				/>
				<View className="pt-4">
					<TagSelector />
				</View>
				<View>
					<Text className="mb-2 text-xl font-semibold">
						Descrição adicional:
					</Text>
					<TextArea />
				</View>
				<View>
					<Button text="Próximo" href="/(tabs)/post/descripition" />
					<Link
						className="text-center pt-4 text-red text-base"
						href="/(tabs)/post"
					>
						Cancelar
					</Link>
				</View>
			</ScrollView>
		</View>
	);
}
