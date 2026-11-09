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

		const width = interpolate(scrollX.value, inputRange, [10, 28, 10], "clamp");

		const backgroundColor = interpolateColor(scrollX.value, inputRange, [
			"#D1D5DB",
			"#42A5F5",
			"#D1D5DB",
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
			style={{
				paddingHorizontal: 4,
				paddingVertical: 8,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Animated.View
				style={[
					{
						height: 10,
						borderRadius: 5,
					},
					animatedDotStyle,
				]}
			/>
		</Pressable>
	);
};

export default AnimatedDotItem;
