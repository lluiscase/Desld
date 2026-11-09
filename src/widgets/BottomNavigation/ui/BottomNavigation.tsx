import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export function BottomNavigation({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	const insets = useSafeAreaInsets();
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

	// Respeita a Home Indicator bar do iOS ou margem padrão inferior
	const bottomPosition = insets.bottom > 0 ? insets.bottom + 8 : 20;

	return (
		<View
			style={[styles.floatingContainer, { bottom: bottomPosition }]}
			pointerEvents="box-none"
		>
			<BlurView
				intensity={80}
				tint="light"
				style={styles.blurWrapper}
			>
				<View style={styles.tabBarContent}>
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel={
							descriptors[state.routes[0].name]?.options?.title || "Home"
						}
						activeOpacity={0.7}
						onPress={() => handlePress(state.routes[0].name, activeIndex === 0)}
						style={styles.tabButton}
					>
						<MaterialIcons
							name="home"
							size={28}
							color={activeIndex === 0 ? "#42A5F5" : "#8E8E93"}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel={
							descriptors[state.routes[1].name]?.options?.title || "Postar"
						}
						activeOpacity={0.7}
						onPress={() => handlePress(state.routes[1].name, activeIndex === 1)}
						style={styles.tabButton}
					>
						<MaterialIcons
							name="add"
							size={30}
							color={activeIndex === 1 ? "#42A5F5" : "#8E8E93"}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						accessibilityRole="button"
						accessibilityLabel={
							descriptors[state.routes[2].name]?.options?.title || "Pesquisar"
						}
						activeOpacity={0.7}
						onPress={() => handlePress(state.routes[2].name, activeIndex === 2)}
						style={styles.tabButton}
					>
						<MaterialIcons
							name="search"
							size={28}
							color={activeIndex === 2 ? "#42A5F5" : "#8E8E93"}
						/>
					</TouchableOpacity>
				</View>
			</BlurView>
		</View>
	);
}

const styles = StyleSheet.create({
	floatingContainer: {
		position: "absolute",
		left: 20,
		right: 20,
		alignItems: "center",
		zIndex: 100,
	},
	blurWrapper: {
		width: "100%",
		maxWidth: 380,
		height: 64,
		borderRadius: 32,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.4)",
		// No iOS o BlurView puro exibe a difusão nativa limpa
		// No Android aplicamos um fallback sutil com baixa opacidade
		...(Platform.OS === "android" && {
			backgroundColor: "rgba(255, 255, 255, 0.85)",
		}),
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
	},
	tabBarContent: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	tabButton: {
		width: 48,
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 24,
	},
});

export default BottomNavigation;
