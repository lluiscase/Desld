import { Tabs } from "expo-router";
import { Navigation } from "../../src/components/Navigation";

export default function AppLayout() {
	return (
		<Tabs
			tabBar={(props) => <Navigation {...props} />}
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
					title: "pesquisar",
				}}
			/>
		</Tabs>
	);
}
