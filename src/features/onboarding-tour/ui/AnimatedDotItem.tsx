import type React from "react";
import { Pressable } from "react-native";
import Animated, {
	interpolate,
	interpolateColor,
	type SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";

export interface AnimatedDotItemProps {
	index: number;
	scrollX: SharedValue<number>;
	itemWidth: number;
	onPress: () => void;
}

export const AnimatedDotItem: React.FC<AnimatedDotItemProps> = ({
	index,
	scrollX,
	itemWidth,
	onPress,
}) => {
	const animatedDotStyle = useAnimatedStyle(() => {
		const inputRange = [
			(index - 1) * itemWidth,
			index * itemWidth,
			(index + 1) * itemWidth,
		];

		const width = interpolate(scrollX.value, inputRange, [8, 24, 8], "clamp");

		const backgroundColor = interpolateColor(scrollX.value, inputRange, [
			"#D9D9D9",
			"#42A5F5",
			"#D9D9D9",
		]);

		return {
			width,
			backgroundColor,
		};
	});

	return (
		<Pressable
			onPress={onPress}
			accessibilityRole="button"
			accessibilityLabel={`Ir para slide ${index + 1}`}
			hitSlop={{ top: 16, bottom: 16, left: 8, right: 8 }}
			className="h-10 justify-center items-center px-1"
		>
			<Animated.View style={animatedDotStyle} className="h-2 rounded-full" />
		</Pressable>
	);
};

export default AnimatedDotItem;
