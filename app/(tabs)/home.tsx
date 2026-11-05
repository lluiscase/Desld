import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import "@/shared/theme/global.css";
import { PetAvatarItem as Pets, usePetListQuery } from "@/entities/pet";
import { UserAvatarButton as Perfil } from "@/entities/user";
import { TipCard as Dicas } from "@/shared/ui";
import Banner from "../../assets/Banner.png";

export default function Home() {
	const { data: pets = [] } = usePetListQuery();

	const lostPets = pets.filter((p) => p.status === "lost");
	const riskPets = pets.filter(
		(p) => p.status === "street" || p.status === "rescued",
	);

	return (
		<View className="flex-1 flex-col bg-white pt-24">
			<View className="flex-row px-8 justify-between itmems-center mb-6">
				<Text className="text-blue-400 text-4xl font-bold">AuHelp</Text>
				<Perfil x={47} />
			</View>
			<ScrollView showsHorizontalScrollIndicator={false}>
				<Image
					source={Banner}
					style={{
						width: "100%",
						height: undefined,
						aspectRatio: 376 / 177,
						borderRadius: 5,
						resizeMode: "contain",
					}}
				/>
				<View className="w-[370px] h-px bg-blue-400 my-6 mx-8" />
				<Text className="text-base font-semibold mb-6 px-8">
					Perdidos recentimente
				</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerClassName="flex-row gap-6 px-8"
					className="flex-grow-0"
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
				<Text className="text-base font-semibold my-6 px-8">Aprenda</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerClassName="flex-row gap-4 px-8"
					className="flex-grow-0"
				>
					<Dicas />
					<Dicas />
					<Dicas />
					<Dicas />
					<Dicas />
				</ScrollView>
				<Text className="text-base font-semibold my-6 px-8">
					Animaizinhos em riscos
				</Text>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerClassName="flex-row gap-6 px-8"
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
				<StatusBar style="auto" />
			</ScrollView>
		</View>
	);
}
