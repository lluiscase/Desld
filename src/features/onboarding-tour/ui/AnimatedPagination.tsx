import type React from "react";
import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { AnimatedDotItem } from "./AnimatedDotItem";

export interface AnimatedPaginationProps {
	total: number;
	progress: SharedValue<number>;
	onDotPress: (index: number) => void;
	className?: string;
}

export const AnimatedPagination: React.FC<AnimatedPaginationProps> = ({
	total,
	progress,
	onDotPress,
	className = "",
}) => {
	const items = Array.from({ length: total }, (_, i) => i);

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				minHeight: 24,
			}}
			className={className}
			accessibilityRole="toolbar"
			accessibilityLabel="Indicador de passos do tour"
		>
			{items.map((index) => (
				<AnimatedDotItem
					key={`onboarding-dot-${index}`}
					index={index}
					progress={progress}
					onPress={() => onDotPress(index)}
				/>
			))}
		</View>
	);
};

export default AnimatedPagination;
