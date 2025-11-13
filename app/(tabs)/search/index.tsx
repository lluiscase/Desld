import { ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import map from "../../../assets/map.png";
import Perfil from "../../../src/components/Perfil";
import InputSearch from "../../../src/components/Search";

export default function Search() {
	return (
		<ImageBackground source={map} className="flex-1" resizeMode="cover">
			<SafeAreaView>
				<View className="px-12 pt-24 flex-row items-center justify-center gap-1">
					<InputSearch
						filter
						placeholder="Procurar animal, ong ou localização"
					/>
					<Perfil />
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
}
