import "@/shared/theme/global.css";
import { Stack } from "expo-router";
import { AppProviders, SessionGate } from "@/app";

export default function RootLayout() {
	return (
		<AppProviders>
			<SessionGate>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(slides)" options={{ headerShown: false }} />
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false, gestureEnabled: false }}
					/>
				</Stack>
			</SessionGate>
		</AppProviders>
	);
}
