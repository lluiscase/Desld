import { useRef } from "react";
import {
	Dimensions,
	Image,
	type ImageSourcePropType,
	TouchableOpacity,
	View,
} from "react-native";
import Carousel, {
	type ICarouselInstance,
} from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";

import dogCarousel from "../../../assets/dogCarousel.png";
import ongCarousel from "../../../assets/ongCarousel.png";

export interface CarouselItemData {
	id: number;
	image: ImageSourcePropType;
}

const { width: windowWidth } = Dimensions.get("window");

const ITEM_WIDTH = Math.round(windowWidth);
const ITEM_HEIGHT = 300;

const defaultCarouselItems: CarouselItemData[] = [
	{
		id: 1,
		image: dogCarousel,
	},
	{
		id: 2,
		image: ongCarousel,
	},
];

const renderItem = ({ item }: { item: CarouselItemData }) => {
	return (
		<View className="flex-1 items-center justify-center">
			<Image
				source={item.image}
				className="w-full h-[80%]"
				resizeMode="contain"
			/>
		</View>
	);
};

export interface ImageCarouselProps {
	items?: CarouselItemData[];
}

export function ImageCarousel({
	items = defaultCarouselItems,
}: ImageCarouselProps) {
	const carouselRef = useRef<ICarouselInstance>(null);

	return (
		<View className="items-center">
			<View className="relative items-center justify-center">
				<Carousel
					ref={carouselRef}
					loop
					width={ITEM_WIDTH}
					height={ITEM_HEIGHT}
					autoPlay={true}
					autoPlayInterval={5000}
					data={items}
					renderItem={renderItem}
					windowSize={1}
					defaultIndex={1}
					style={{
						width: windowWidth,
						height: ITEM_HEIGHT,
					}}
					mode="parallax"
				/>

				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Slide anterior"
					onPress={() => carouselRef.current?.prev()}
					className="absolute top-1/2 -translate-y-1/2 left-6 p-2 rounded-full bg-white/70 z-10"
				>
					<Icon name="arrow-back-ios-new" size={24} color="#333" />
				</TouchableOpacity>

				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Próximo slide"
					onPress={() => carouselRef.current?.next()}
					className="absolute top-1/2 -translate-y-1/2 right-6 p-2 rounded-full bg-white/70 z-10"
				>
					<Icon name="arrow-forward-ios" size={24} color="#333" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default ImageCarousel;
