import { useRouter, useSegments } from "expo-router";
import { type PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSessionStore } from "@/entities/user";

export function SessionGate({ children }: PropsWithChildren) {
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

	return <>{children}</>;
}

export default SessionGate;
