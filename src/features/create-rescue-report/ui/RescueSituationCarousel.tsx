import { useRef, useState } from "react";
import {
	Dimensions,
	Image,
	type ImageSourcePropType,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Carousel, {
	type ICarouselInstance,
} from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";

import Adocao from "../../../../assets/adocao.png";
import Indefeso from "../../../../assets/indefeso.png";
import Perdido from "../../../../assets/perdido.png";

export type SituationType = "Perdido" | "Adocao" | "Indefeso";

export interface RescueSituationItemData {
	id: number;
	type: SituationType;
	image: ImageSourcePropType;
	title: string;
	description: string;
}

const { width: windowWidth } = Dimensions.get("window");

const ITEM_WIDTH = Math.round(windowWidth);
const ITEM_HEIGHT = 300;

export const RESCUE_SITUATIONS: RescueSituationItemData[] = [
	{
		id: 1,
		type: "Perdido",
		image: Perdido,
		title: "Perdido",
		description:
			"Animal perdido é o pet que se afastou acidentalmente de casa e está desorientado,\nsem conseguir retornar ao lar.",
	},
	{
		id: 2,
		type: "Adocao",
		image: Adocao,
		title: "Adoção",
		description:
			"Animal em adoção é o pet que espera por uma nova chance de carinho, sonhando em encontrar o lar e a família que o amarão incondicionalmente.",
	},
	{
		id: 3,
		type: "Indefeso",
		image: Indefeso,
		title: "Indefeso",
		description:
			"Animal indefeso é o pet que vive à margem, lutando pela sobrevivência nas ruas e desesperadamente precisando de resgate, alimento e proteção humana.",
	},
];

const renderItem = ({ item }: { item: RescueSituationItemData }) => {
	return (
		<View className="flex-1 items-center justify-center p-2.5">
			<Image
				source={item.image}
				className="w-full h-[80%] rounded-lg"
				resizeMode="contain"
			/>
			<Text className="text-xl font-bold pt-2.5 text-black">{item.title}</Text>
		</View>
	);
};

export interface RescueSituationCarouselProps {
	onSelectSituation?: (situation: SituationType) => void;
	initialIndex?: number;
}

export function RescueSituationCarousel({
	onSelectSituation,
	initialIndex = 1,
}: RescueSituationCarouselProps) {
	const carouselRef = useRef<ICarouselInstance>(null);
	const [activeIndex, setActiveIndex] = useState(initialIndex);

	const handleSnap = (index: number) => {
		setActiveIndex(index);
		const selected = RESCUE_SITUATIONS[index];
		if (selected) {
			onSelectSituation?.(selected.type);
		}
	};

	return (
		<View className="items-center">
			<View className="relative items-center justify-center mt-5">
				<Carousel
					ref={carouselRef}
					loop
					width={ITEM_WIDTH}
					height={ITEM_HEIGHT}
					autoPlay={false}
					data={RESCUE_SITUATIONS}
					renderItem={renderItem}
					windowSize={3}
					defaultIndex={initialIndex}
					style={{
						width: windowWidth,
						height: ITEM_HEIGHT,
					}}
					mode="parallax"
					modeConfig={{
						parallaxScrollingScale: 0.9,
						parallaxScrollingOffset: 150,
					}}
					onSnapToItem={handleSnap}
				/>

				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Situação anterior"
					onPress={() => carouselRef.current?.prev()}
					className="absolute top-1/2 -translate-y-1/2 left-6 p-2 rounded-full bg-white/70 z-10"
				>
					<Icon name="arrow-back-ios-new" size={24} color="#333" />
				</TouchableOpacity>

				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Próxima situação"
					onPress={() => carouselRef.current?.next()}
					className="absolute top-1/2 -translate-y-1/2 right-6 p-2 rounded-full bg-white/70 z-10"
				>
					<Icon name="arrow-forward-ios" size={24} color="#333" />
				</TouchableOpacity>
			</View>
			<View>
				<Text className="text-base text-center px-8 pt-8 text-black">
					{RESCUE_SITUATIONS[activeIndex]?.description}
				</Text>
			</View>
		</View>
	);
}

export default RescueSituationCarousel;
