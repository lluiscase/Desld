import type { BottomTabBarProps } from "expo-router/tabs";
import type { BottomTabBarProps as RNBottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { triggerSelectionHaptic } from "@/shared/lib";

export type BottomNavigationProps = BottomTabBarProps & {
	navigation?: RNBottomTabBarProps["navigation"];
};

interface TabItemConfig {
	routeIndex: number;
	fallbackLabel: string;
	iconName: "home" | "add" | "search";
	iconSize: number;
}

const TAB_ITEMS: TabItemConfig[] = [
	{ routeIndex: 0, fallbackLabel: "Home", iconName: "home", iconSize: 28 },
	{ routeIndex: 1, fallbackLabel: "Postar", iconName: "add", iconSize: 30 },
	{
		routeIndex: 2,
		fallbackLabel: "Pesquisar",
		iconName: "search",
		iconSize: 28,
	},
];

export function BottomNavigation({
	state,
	descriptors,
	navigation,
	emitter,
	navigateToTab,
}: BottomNavigationProps) {
	const insets = useSafeAreaInsets();
	const activeIndex = state.index;

	const handlePress = (
		routeKey: string,
		routeName: string,
		isFocused: boolean,
	) => {
		if (emitter && navigateToTab) {
			const event = emitter.emit({
				type: "tabPress",
				target: routeKey,
				canPreventDefault: true,
			});

			if (!isFocused && !event.defaultPrevented) {
				triggerSelectionHaptic();
				navigateToTab(routeKey);
			}
			return;
		}

		if (navigation) {
			const event = navigation.emit({
				type: "tabPress",
				target: routeName,
				canPreventDefault: true,
			});

			if (!isFocused && !event.defaultPrevented) {
				triggerSelectionHaptic();
				navigation.navigate(routeName, { merge: true });
			}
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
				tint={Platform.OS === "ios" ? "systemChromeMaterialLight" : "light"}
				style={styles.blurWrapper}
			>
				<View style={styles.tabBarContent}>
					{TAB_ITEMS.map((item) => {
						const route = state.routes[item.routeIndex];
						if (!route) {
							return null;
						}
						const isFocused = activeIndex === item.routeIndex;
						const label =
							descriptors[route.name]?.options?.title || item.fallbackLabel;

						return (
							<Pressable
								key={route.key}
								accessibilityRole="tab"
								accessibilityState={{ selected: isFocused }}
								accessibilityLabel={label}
								android_ripple={{
									color: "rgba(66, 165, 245, 0.2)",
									borderless: false,
									radius: 28,
								}}
								onPress={() => handlePress(route.key, route.name, isFocused)}
								style={({ pressed }) => [
									styles.tabButton,
									isFocused &&
										Platform.OS === "android" &&
										styles.androidActiveIndicator,
									pressed && Platform.OS !== "android" && styles.iosPressed,
								]}
							>
								<MaterialIcons
									name={item.iconName}
									size={item.iconSize}
									color={isFocused ? "#42A5F5" : "#8E8E93"}
								/>
							</Pressable>
						);
					})}
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
		// No iOS o BlurView com systemChromeMaterialLight exibe a difusão nativa HIG
		// No Android aplicamos superfície elevada translúcida alinhada ao Material Design 3
		...(Platform.OS === "android" && {
			backgroundColor: "rgba(255, 255, 255, 0.9)",
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
		width: 56,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 22,
		overflow: "hidden",
	},
	androidActiveIndicator: {
		backgroundColor: "rgba(66, 165, 245, 0.14)",
	},
	iosPressed: {
		opacity: 0.7,
	},
});

export default BottomNavigation;
