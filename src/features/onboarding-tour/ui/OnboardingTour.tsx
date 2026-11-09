import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Easing, useSharedValue } from "react-native-reanimated";
import Carousel, {
	type ICarouselInstance,
} from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { triggerImpactHaptic, triggerNotificationHaptic } from "@/shared/lib";
import { AppButton as Button } from "@/shared/ui";
import { ONBOARDING_SLIDES } from "../model/slidesData";
import type { OnboardingSlide } from "../model/types";
import { AnimatedPagination } from "./AnimatedPagination";
import { OnboardingSlideItem } from "./OnboardingSlideItem";

export function OnboardingTour() {
	const { width: windowWidth, height: windowHeight } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const carouselRef = useRef<ICarouselInstance>(null);

	const progress = useSharedValue(0);
	const [currentIndex, setCurrentIndex] = useState(0);

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	// Espaço vertical reservado ao carrossel
	const carouselHeight = Math.max(
		windowHeight - topPadding - bottomPadding - 160,
		360,
	);

	const handleSnapToItem = useCallback((index: number) => {
		setCurrentIndex(index);
		triggerImpactHaptic("light");
	}, []);

	const handleNext = useCallback(() => {
		if (currentIndex < ONBOARDING_SLIDES.length - 1) {
			triggerImpactHaptic("light");
			carouselRef.current?.next({ animated: true });
		} else {
			triggerNotificationHaptic("success");
			router.push("/initial");
		}
	}, [currentIndex, router]);

	const handleDotPress = useCallback((index: number) => {
		triggerImpactHaptic("light");
		carouselRef.current?.scrollTo({ index, animated: true });
	}, []);

	const isLastSlide = currentIndex === ONBOARDING_SLIDES.length - 1;

	return (
		<View className="flex-1 bg-white">
			{/* Carrossel Horizontal Contínuo com Gestos Reanimated (UI Thread) */}
			<View
				style={{ paddingTop: topPadding }}
				className="flex-1 items-center justify-center"
			>
				<Carousel
					ref={carouselRef}
					loop={false}
					width={windowWidth}
					height={carouselHeight}
					autoPlay={false}
					data={ONBOARDING_SLIDES as unknown as OnboardingSlide[]}
					scrollAnimationDuration={1800}
					withAnimation={{
						type: "timing",
						config: {
							duration: 1800,
							easing: Easing.out(Easing.cubic),
						},
					}}
					onProgressChange={progress}
					onSnapToItem={handleSnapToItem}
					renderItem={({ item }: { item: OnboardingSlide }) => (
						<OnboardingSlideItem
							item={item}
							width={windowWidth}
							height={carouselHeight}
						/>
					)}
					style={{
						width: windowWidth,
						height: carouselHeight,
					}}
				/>
			</View>

			{/* Rodapé com Botão, Indicadores e Pular Tour */}
			<View
				style={{ paddingBottom: bottomPadding }}
				className="flex-col items-center justify-center gap-3 px-4 pt-2"
			>
				<Button
					text={isLastSlide ? "Começar" : "Próximo"}
					onPress={handleNext}
				/>
				<AnimatedPagination
					total={ONBOARDING_SLIDES.length}
					progress={progress}
					onDotPress={handleDotPress}
				/>
				<Link
					className="font-ubuntu-medium text-center text-gray-500 py-1.5 active:opacity-70"
					href="/initial"
				>
					Pular tour
				</Link>
			</View>

			<StatusBar style="dark" />
		</View>
	);
}

export default OnboardingTour;
