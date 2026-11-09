import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function PostFlowLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: Platform.select({
					ios: "default",
					android: "fade_from_bottom",
					default: "fade",
				}),
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="photo" />
			<Stack.Screen name="situation" />
			<Stack.Screen name="description" />
			<Stack.Screen
				name="preVisulation"
				options={Platform.select({
					ios: {
						presentation: "modal",
						gestureEnabled: true,
					},
					android: {
						presentation: "modal",
						animation: "slide_from_bottom",
					},
					default: {
						presentation: "modal",
					},
				})}
			/>
			<Stack.Screen
				name="history"
				options={Platform.select({
					ios: {
						presentation: "formSheet",
						sheetAllowedDetents: [0.65, 1.0],
						sheetInitialDetentIndex: 0,
						sheetGrabberVisible: true,
						sheetCornerRadius: 24,
						sheetExpandsWhenScrolledToEdge: true,
					},
					android: {
						presentation: "formSheet",
						sheetAllowedDetents: [0.7, 1.0],
						sheetInitialDetentIndex: 0,
						sheetGrabberVisible: true,
						sheetCornerRadius: 28,
					},
					default: {
						presentation: "modal",
					},
				})}
			/>
		</Stack>
	);
}
