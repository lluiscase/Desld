import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useRef, useState } from "react";
import {
	type FlatList,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	useWindowDimensions,
	View,
} from "react-native";
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	triggerImpactHaptic,
	triggerNotificationHaptic,
	triggerSelectionHaptic,
} from "@/shared/lib";
import { AppButton as Button } from "@/shared/ui";
import { ONBOARDING_SLIDES } from "../model/slidesData";
import type { OnboardingSlide } from "../model/types";
import { AnimatedPagination } from "./AnimatedPagination";
import { OnboardingSlideItem } from "./OnboardingSlideItem";

export function OnboardingTour() {
	const { width: windowWidth } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const flatListRef = useRef<FlatList<OnboardingSlide>>(null);

	const scrollX = useSharedValue(0);
	const [currentIndex, setCurrentIndex] = useState(0);

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollX.value = event.contentOffset.x;
		},
	});

	const handleMomentumScrollEnd = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const newIndex = Math.round(
				event.nativeEvent.contentOffset.x / windowWidth,
			);
			if (
				newIndex >= 0 &&
				newIndex < ONBOARDING_SLIDES.length &&
				newIndex !== currentIndex
			) {
				setCurrentIndex(newIndex);
				triggerSelectionHaptic();
			}
		},
		[windowWidth, currentIndex],
	);

	const scrollToIndex = useCallback((index: number) => {
		if (index < 0 || index >= ONBOARDING_SLIDES.length) return;
		setCurrentIndex(index);
		flatListRef.current?.scrollToIndex({
			index,
			animated: true,
		});
	}, []);

	const handleNext = useCallback(() => {
		if (currentIndex < ONBOARDING_SLIDES.length - 1) {
			triggerImpactHaptic("light");
			scrollToIndex(currentIndex + 1);
		} else {
			triggerNotificationHaptic("success");
			router.push("/initial");
		}
	}, [currentIndex, scrollToIndex, router]);

	const handleDotPress = useCallback(
		(index: number) => {
			triggerImpactHaptic("light");
			scrollToIndex(index);
		},
		[scrollToIndex],
	);

	const isLastSlide = currentIndex === ONBOARDING_SLIDES.length - 1;

	return (
		<View className="flex-1 bg-white">
			{/* Carrossel Horizontal Contínuo com Gestos */}
			<View style={{ paddingTop: topPadding }} className="flex-1">
				<Animated.FlatList
					ref={flatListRef}
					data={ONBOARDING_SLIDES}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<OnboardingSlideItem item={item} width={windowWidth} />
					)}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					bounces={false}
					onScroll={scrollHandler}
					scrollEventThrottle={16}
					onMomentumScrollEnd={handleMomentumScrollEnd}
					contentContainerStyle={{ flexGrow: 1, height: "100%" }}
					style={{ flex: 1 }}
					getItemLayout={(_, index) => ({
						length: windowWidth,
						offset: windowWidth * index,
						index,
					})}
					onScrollToIndexFailed={(info) => {
						flatListRef.current?.scrollToOffset({
							offset: info.index * windowWidth,
							animated: true,
						});
					}}
					initialNumToRender={2}
					maxToRenderPerBatch={2}
					windowSize={3}
				/>
			</View>

			{/* Estrutura de Rodapé IDÊNTICA ao layout original */}
			<View
				style={{ paddingBottom: bottomPadding }}
				className="flex-col items-center justify-center gap-4 px-4"
			>
				<Button
					text={isLastSlide ? "Começar" : "Próximo"}
					onPress={handleNext}
				/>
				<AnimatedPagination
					total={ONBOARDING_SLIDES.length}
					scrollX={scrollX}
					itemWidth={windowWidth}
					onDotPress={handleDotPress}
				/>
				<Link
					className="font-ubuntu-medium text-center text-gray-500 py-2 active:opacity-70"
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
