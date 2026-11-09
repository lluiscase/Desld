import type React from "react";
import { Image, Text, View } from "react-native";
import type { OnboardingSlide } from "../model/types";

export interface OnboardingSlideItemProps {
	item: OnboardingSlide;
	width: number;
}

export const OnboardingSlideItem: React.FC<OnboardingSlideItemProps> = ({
	item,
	width,
}) => {
	return (
		<View
			style={{ width, height: "100%" }}
			className="px-4 justify-between flex-1"
		>
			<Text className="font-ubuntu-bold text-[#42A5F5] text-3xl tracking-tight">
				{item.titleHighlight ? (
					<Text
						className={`font-ubuntu-bold text-3xl ${
							item.titleHighlight.colorClassName ?? "text-red-500"
						}`}
					>
						{item.titleHighlight.text}
					</Text>
				) : null}
				{item.title}
			</Text>

			<View className="w-full flex-1 items-center justify-center py-4">
				<Image
					source={item.image}
					resizeMode="contain"
					className="max-h-[340px] w-full"
				/>
			</View>
		</View>
	);
};

export default OnboardingSlideItem;
