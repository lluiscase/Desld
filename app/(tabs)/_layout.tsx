import { Tabs, useSegments } from "expo-router";
import Navigation from "../../src/components/Navigation";

export default function AppLayout() {
	const segments = useSegments();
	const screensToHide = [
		"photo",
		"typeAnimal",
		"situation",
		"description",
		"preVisulation",
	];
	const lastSegment = segments[segments.length - 1];
	const isPostScreen = screensToHide.includes(lastSegment);

	return (
		<Tabs
			tabBar={(props) => (isPostScreen ? null : <Navigation {...props} />)}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
				}}
			/>
			<Tabs.Screen
				name="post"
				options={{
					title: "Postar",
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Pesquisar",
				}}
			/>
		</Tabs>
	);
}
