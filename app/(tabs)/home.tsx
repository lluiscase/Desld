import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "@/shared/theme/global.css";
import { PetAvatarItem as Pets, usePetListQuery } from "@/entities/pet";
import { UserAvatarButton as Perfil } from "@/entities/user";
import { TipCard as Dicas } from "@/shared/ui";
import Banner from "../../assets/Banner.png";

export default function Home() {
	const insets = useSafeAreaInsets();
	const { data: pets = [] } = usePetListQuery();

	const lostPets = pets.filter((p) => p.status === "lost");
	const riskPets = pets.filter(
		(p) => p.status === "street" || p.status === "rescued",
	);

	// Tab Bar (64px) + Offset Inferior Flutuante + Respiro de 24px (Múltiplos de 8)
	const floatingBarOffset = insets.bottom > 0 ? insets.bottom + 8 : 20;
	const scrollBottomPadding = 64 + floatingBarOffset + 24;

	return (
		<View className="flex-1 flex-col bg-white">
			{/* Header natural respeitando Safe Area (Dynamic Island / Notch) */}
			<View
				style={{ paddingTop: insets.top > 0 ? insets.top + 8 : 16 }}
				className="flex-row px-4 justify-between items-center pb-4 bg-white"
			>
				<Text
					style={{ color: "#42A5F5" }}
					className="font-ubuntu-bold text-3xl tracking-tight"
				>
					AuHelp
				</Text>
				<Perfil size={40} />
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: scrollBottomPadding }}
			>
				{/* Banner com margem lateral de 16px e cantos arredondados de 16px */}
				<View className="px-4 mb-6">
					<Image
						source={Banner}
						style={{
							width: "100%",
							height: undefined,
							aspectRatio: 376 / 177,
							borderRadius: 16,
							resizeMode: "cover",
						}}
					/>
				</View>

				{/* Divisor sutil e fluido */}
				<View className="h-px bg-gray-200 mx-4 mb-6" />

				{/* Seção 1: Perdidos recentemente */}
				<Text className="font-ubuntu-bold text-lg text-gray-900 mb-4 px-4">
					Perdidos recentemente
				</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
					className="flex-grow-0 mb-6"
				>
					{lostPets.length > 0 ? (
						lostPets.map((pet) => (
							<Pets key={pet.id} name={pet.name || "Rex"} />
						))
					) : (
						<>
							<Pets name="Rex" />
							<Pets name="Mago" />
							<Pets name="Bravesa" />
							<Pets name="Bravesa" />
							<Pets name="Bravesa" />
							<Pets name="Bravesa" />
						</>
					)}
				</ScrollView>

				{/* Seção 2: Aprenda */}
				<Text className="font-ubuntu-bold text-lg text-gray-900 mb-4 px-4">
					Aprenda
				</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
					className="flex-grow-0 mb-6"
				>
					<Dicas />
					<Dicas />
					<Dicas />
					<Dicas />
					<Dicas />
				</ScrollView>

				{/* Seção 3: Animaizinhos em risco */}
				<Text className="font-ubuntu-bold text-lg text-gray-900 mb-4 px-4">
					Animaizinhos em risco
				</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
					className="flex-grow-0"
				>
					{riskPets.length > 0 ? (
						riskPets.map((pet) => (
							<Pets key={pet.id} name={pet.name || "Rex"} />
						))
					) : (
						<>
							<Pets name="Rex" />
							<Pets name="Mago" />
							<Pets name="Bravesa" />
							<Pets name="Bravesa" />
							<Pets name="Bravesa" />
							<Pets name="Bravesa" />
						</>
					)}
				</ScrollView>

				<StatusBar style="dark" />
			</ScrollView>
		</View>
	);
}
