import { useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel, {
	type ICarouselInstance,
} from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";

import Adocao from "../../../assets/adocao.png";
import Indefeso from "../../../assets/indefeso.png";
import Perdido from "../../../assets/perdido.png";

type CarouselItemData = {
	id: number;
	image: any;
	title: string;
	descripition: string;
};

const { width: windowWidth } = Dimensions.get("window");

const ITEM_WIDTH = Math.round(windowWidth);
const ITEM_HEIGHT = 300;

const carouselItems = [
	{
		id: 1,
		image: Perdido,
		title: "Perdido",
		descripition:
			"Animal perdido é o pet que se afastou acidentalmente de casa e está desorientado,\nsem conseguir retornar ao lar.",
	},
	{
		id: 2,
		image: Adocao,
		title: "Adoção",
		descripition:
			"Animal em adoção é o pet que espera por uma nova chance de carinho, sonhando em encontrar o lar e a família que o amarão incondicionalmente.",
	},
	{
		id: 3,
		image: Indefeso,
		title: "Indefeso",
		descripition:
			"Animal indefeso é o pet que vive à margem, lutando pela sobrevivência nas ruas e desesperadamente precisando de resgate, alimento e proteção humana.",
	},
];

const renderItem = ({ item }: { item: CarouselItemData }) => {
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

export default function CorouselPost() {
	const carouselRef = useRef<ICarouselInstance>(null);
	const [activeIndex, setActiveIndex] = useState(1);

	return (
		<View className="items-center">
			<View className="relative items-center justify-center mt-5 ">
				<Carousel
					ref={carouselRef}
					loop
					width={ITEM_WIDTH}
					height={ITEM_HEIGHT}
					autoPlay={false}
					data={carouselItems}
					renderItem={renderItem}
					windowSize={3}
					defaultIndex={1}
					style={{
						width: windowWidth,
						height: ITEM_HEIGHT,
					}}
					mode="parallax"
					modeConfig={{
						parallaxScrollingScale: 0.9,
						parallaxScrollingOffset: 150, // Quanto do item lateral aparece
					}}
					onSnapToItem={(index) => setActiveIndex(index)}
				/>

				<TouchableOpacity
					onPress={() => carouselRef.current?.prev()}
					className="absolute top-1/2 -translate-y-1/2 left-6 p-2 rounded-full bg-white/70 z-10"
				>
					<Icon name="arrow-back-ios-new" size={24} color="#333" />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => carouselRef.current?.next()}
					className="absolute top-1/2 -translate-y-1/2 right-6 p-2 rounded-full bg-white/70 z-10"
				>
					<Icon name="arrow-forward-ios" size={24} color="#333" />
				</TouchableOpacity>
			</View>
      <View>
        <Text className="text-base text-center px-8 pt-8 text-black">{carouselItems[activeIndex].descripition}</Text>
      </View>
		</View>
	);
}
