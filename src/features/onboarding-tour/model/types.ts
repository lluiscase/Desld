import type { ImageSourcePropType } from "react-native";

export interface OnboardingSlide {
	id: string;
	title: string;
	titleHighlight?: {
		text: string;
		colorClassName?: string;
	};
	image: ImageSourcePropType;
	imageAlt: string;
}
