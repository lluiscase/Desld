import type React from "react";
import { Image, Text, View } from "react-native";
import type { OnboardingSlide } from "../model/types";

export interface OnboardingSlideItemProps {
	item: OnboardingSlide;
	width: number;
	height?: number;
}

export const OnboardingSlideItem: React.FC<OnboardingSlideItemProps> = ({
	item,
	width,
	height,
}) => {
	const imageHeight = height ? Math.min(height - 150, 300) : 280;
	const imageWidth = Math.min(width - 48, 340);

	return (
		<View
			style={{ width, height: height ?? "100%" }}
			className="px-4 justify-between flex-1 pb-2"
		>
			{/* Título com destaque semântico */}
			<View className="pt-2">
				<Text className="font-ubuntu-bold text-[#42A5F5] text-3xl tracking-tight leading-9">
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
			</View>

			{/* Div que cobre a ilustração - aumentada e perfeitamente centralizada */}
			<View className="w-full flex-1 items-center justify-center py-2">
				<Image
					source={item.image}
					resizeMode="contain"
					style={{
						width: imageWidth,
						height: imageHeight,
					}}
				/>
			</View>
		</View>
	);
};

export default OnboardingSlideItem;
