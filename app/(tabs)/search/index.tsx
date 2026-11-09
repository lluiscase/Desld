import { StatusBar } from "expo-status-bar";
import { ImageBackground, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserAvatarButton as Perfil } from "@/entities/user";
import { SearchInput as InputSearch } from "@/features/search-pets";
import map from "../../../assets/map.png";

export default function Search() {
	const insets = useSafeAreaInsets();

	return (
		<ImageBackground source={map} className="flex-1" resizeMode="cover">
			<View
				style={{ paddingTop: insets.top > 0 ? insets.top + 8 : 16 }}
				className="px-4 flex-row items-center gap-3"
			>
				<InputSearch
					filter
					placeholder="Procurar animal, ong ou localização"
					className="flex-1"
				/>
				<Perfil size={40} />
			</View>
			<StatusBar style="dark" />
		</ImageBackground>
	);
}
