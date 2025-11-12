import { useRef } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel, {
  type ICarouselInstance,
} from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";

// Importe suas imagens
import Adocao from "../../../assets/adocao.png";
import Indefeso from "../../../assets/indefeso.png";
import Perdido from "../../../assets/perdido.png";

type CarouselItemData = {
  id: number;
  image: any;
  title: string;
};

const { width: windowWidth } = Dimensions.get("window");

const ITEM_WIDTH = Math.round(windowWidth);
const ITEM_HEIGHT = 300;

const carouselItems = [
  { id: 1, image: Perdido, title: "Perdido" },
  { id: 2, image: Adocao, title: "Adoção" },
  { id: 3, image: Indefeso, title: "Indefeso" },
];

// Componente que renderiza cada item do carrossel
const renderItem = ({ item }: { item: CarouselItemData }) => {
  return (
    // IMPORTANTE: Deixe esta View limpa, sem style de largura
    <View className="flex-1 items-center justify-center p-2.5">
      <Image
        source={item.image}
        className="w-full h-[80%] rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold mt-2.5 text-black">{item.title}</Text>
    </View>
  );
};

export function CorouselPost() {
  const carouselRef = useRef<ICarouselInstance>(null);

  return (
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
          parallaxScrollingScale: 0.9, // Itens laterais ficam 90% do tamanho
          parallaxScrollingOffset: 150, // Quanto do item lateral aparece
        }}
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
  );
}
