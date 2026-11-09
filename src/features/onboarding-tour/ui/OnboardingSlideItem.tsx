import type React from "react";
import { Image, ScrollView, Text, View } from "react-native";
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
		<View style={{ width }} className="flex-1 px-6 justify-between">
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
					paddingVertical: 16,
				}}
				showsVerticalScrollIndicator={false}
				bounces={false}
			>
				{/* Slide Headline */}
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

				{/* Slide Image / Illustration */}
				<View className="flex-1 items-center justify-center py-6 min-h-[240px]">
					<Image
						source={item.image}
						accessibilityLabel={item.imageAlt}
						resizeMode="contain"
						className="max-h-[300px] w-full"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default OnboardingSlideItem;
