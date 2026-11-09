import type React from "react";
import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { AnimatedDotItem } from "./AnimatedDotItem";

export interface AnimatedPaginationProps {
	total: number;
	scrollX: SharedValue<number>;
	itemWidth: number;
	onDotPress: (index: number) => void;
	className?: string;
}

export const AnimatedPagination: React.FC<AnimatedPaginationProps> = ({
	total,
	scrollX,
	itemWidth,
	onDotPress,
	className = "",
}) => {
	const items = Array.from({ length: total }, (_, i) => i);

	return (
		<View
			className={`flex-row items-center justify-center gap-1 ${className}`}
			accessibilityRole="toolbar"
			accessibilityLabel="Indicador de páginas do tour"
		>
			{items.map((index) => (
				<AnimatedDotItem
					key={`dot-${index}`}
					index={index}
					scrollX={scrollX}
					itemWidth={itemWidth}
					onPress={() => onDotPress(index)}
				/>
			))}
		</View>
	);
};

export default AnimatedPagination;
