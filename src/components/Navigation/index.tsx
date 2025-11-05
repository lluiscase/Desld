import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export function Navigation({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	const activeIndex = state.index;

	const handlePress = (routeName: string, isFocused: boolean) => {
		const event = navigation.emit({
			type: "tabPress",
			target: routeName,
			canPreventDefault: true,
		});

		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(routeName, { merge: true });
		}
	};

	return (
		<View className="bg-white pb-8 px-8 md:px-auto">
			<View className="flex flex-row bg-white border rounded-3xl border-gray-500 md:w-[376px] h-[70px] justify-evenly items-center">
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel={
						descriptors[state.routes[0].name]?.options?.title || "Home" // Pega o título ou usa "Home"
					}
					onPress={() => handlePress(state.routes[0].name, activeIndex === 0)}
				>
					<MaterialIcons
						name="home"
						size={34}
						color={activeIndex === 0 ? "#42A5F5" : "#000000"}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel={
						descriptors[state.routes[0].name]?.options?.title || "Postar"
					}
					onPress={() => handlePress(state.routes[1].name, activeIndex === 1)}
				>
					<MaterialIcons
						name="add"
						size={34}
						color={activeIndex === 1 ? "#42A5F5" : "#000000"}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel={
						descriptors[state.routes[0].name]?.options?.title || "Pesquisar"
					}
					onPress={() => handlePress(state.routes[2].name, activeIndex === 2)}
				>
					<MaterialIcons
						name="search"
						size={34}
						color={activeIndex === 2 ? "#42A5F5" : "#000000"}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}
