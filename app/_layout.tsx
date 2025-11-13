import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AuthProvider, { useAuth } from "../src/context/authContext";

function RootLayoutNav() {
	const { user, isLoading } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (isLoading) return;

		const inPublicGroup =
			segments[0] === "(auth)" || segments[0] === "(slides)";

		if (user) {
			if (inPublicGroup) {
				router.replace("/home");
			}
		} else {
			if (!inPublicGroup) {
				router.replace("/step1");
			}
		}
	}, [user, isLoading, segments, router]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text style={{ fontSize: 24, fontWeight: "bold" }}>
					Carregando App...
				</Text>
			</View>
		);
	}

	return (
		<Stack>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(slides)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<AuthProvider>
			<RootLayoutNav />
		</AuthProvider>
	);
}
