import "@/shared/theme/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSessionStore } from "@/entities/user";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
			staleTime: 1000 * 60 * 5, // 5 minutos de cache
		},
	},
});

function RootNavigation() {
	const { isAuthenticated, isLoading, initializeSession } = useSessionStore();
	const segments = useSegments();
	const router = useRouter();
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		initializeSession().finally(() => setHasMounted(true));
	}, [initializeSession]);

	useEffect(() => {
		if (isLoading || !hasMounted) return;

		const inPublicGroup =
			segments[0] === "(auth)" || segments[0] === "(slides)";

		if (isAuthenticated) {
			if (inPublicGroup) {
				router.replace("/(tabs)/home");
			}
		} else {
			if (!inPublicGroup) {
				router.replace("/step1");
			}
		}
	}, [isAuthenticated, isLoading, segments, router, hasMounted]);

	if (isLoading || !hasMounted) {
		return (
			<View className="flex-1 items-center justify-center bg-white">
				<ActivityIndicator size="large" color="#42A5F5" />
				<Text className="mt-3 text-base font-semibold text-gray-700">
					Carregando AuHelp...
				</Text>
			</View>
		);
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(slides)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<RootNavigation />
		</QueryClientProvider>
	);
}
