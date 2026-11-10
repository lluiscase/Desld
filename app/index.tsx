import { Redirect } from "expo-router";
import { useSessionStore } from "@/entities/user";

export default function Index() {
	const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
	const isLoading = useSessionStore((state) => state.isLoading);

	if (isLoading) {
		return null;
	}

	return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(slides)"} />;
}
