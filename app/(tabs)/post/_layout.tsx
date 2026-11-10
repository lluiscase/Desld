import { Stack } from "expo-router";

export default function PostFlowLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "default",
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="photo" />
			<Stack.Screen name="situation" />
			<Stack.Screen name="description" />
			<Stack.Screen name="preVisulation" />
			<Stack.Screen name="history" />
		</Stack>
	);
}
