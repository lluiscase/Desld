import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useRef, useState } from "react";
import {
	type FlatList,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	Pressable,
	Text,
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
import { AppButton } from "@/shared/ui";
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

	const handleSkip = useCallback(() => {
		triggerImpactHaptic("light");
		router.push("/initial");
	}, [router]);

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
			{/* Top Bar com Botão Pular alinhado à direita e Safe Area */}
			<View
				style={{ paddingTop: topPadding }}
				className="px-6 flex-row justify-end items-center h-14"
			>
				{!isLastSlide ? (
					<Pressable
						onPress={handleSkip}
						accessibilityRole="button"
						accessibilityLabel="Pular tour de introdução"
						hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
						className="py-2 px-3 rounded-full active:opacity-60"
					>
						<Text className="font-ubuntu-medium text-gray-500 text-base">
							Pular tour
						</Text>
					</Pressable>
				) : (
					<View className="h-9" />
				)}
			</View>

			{/* Carrossel Horizontal Contínuo com Gestos */}
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
				className="flex-1"
			/>

			{/* Rodapé Fixo com Dots Interativos e Botão Dinâmico */}
			<View
				style={{ paddingBottom: bottomPadding }}
				className="px-6 pt-4 flex-col items-center gap-6"
			>
				<AnimatedPagination
					total={ONBOARDING_SLIDES.length}
					scrollX={scrollX}
					itemWidth={windowWidth}
					onDotPress={handleDotPress}
				/>

				<AppButton
					text={isLastSlide ? "Começar" : "Próximo"}
					onPress={handleNext}
					className="w-full"
				/>
			</View>

			<StatusBar style="dark" />
		</View>
	);
}

export default OnboardingTour;
