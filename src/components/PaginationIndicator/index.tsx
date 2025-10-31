import { View } from "react-native";

interface PaginationIndicatorProps {
	position: number;
}

const totalSlides = 5;
let activeIndex = 0;

export default function PaginationIndicator ({position}:PaginationIndicatorProps) {
	const data = Array.from({ length: totalSlides }, (_, index) => index);
  activeIndex = position;
	return (
		<View className="flex-row justify-center mt-6">
			{data.map((_, index) => (
				<View
					// biome-ignore lint/suspicious/noArrayIndexKey: <nao sei arruamar esse erro>
					key={index}
					className={`
            w-3 h-3 rounded-full mx-1
            ${index === activeIndex ? "bg-black" : "bg-gray-300"}
          `}
				/>
			))}
		</View>
	);
};
